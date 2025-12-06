import {
  User,
  EggReading,
  LarvaReading,
  PupaReading,
  AdultReading,
  ActuatorControl,
} from "../models/Models";
import { ModelsUpgradeStatements } from "../upgrades/models.upgrade.statement";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { BehaviorSubject } from "rxjs";
import { ISQLiteService } from "../services/sqliteService";
import { IDbVersionService } from "../services/dbVersionService";
import { platform } from "../App";

export interface IStorageService {
  initializeDatabase(): Promise<void>;
  getUser(): Promise<User[]>;
  getEgg(id: number): Promise<EggReading[]>;
  getLarva(id: number): Promise<LarvaReading[]>;
  getPupa(id: number): Promise<PupaReading[]>;
  getAdult(id: number): Promise<AdultReading[]>;
  getActuator(lifeCycleStage: string): Promise<ActuatorControl[]>;
  updateUserById(id: string, active: number): Promise<void>;
  // updateEggById(id: string): Promise<void>;
  // updateLarvaById(id: string): Promise<void>;
  // updatePupaById(id: string): Promise<void>;
  // updateAdultById(id: string): Promise<void>;
  updateActuatorControl(
    lifeCycleStage: string,
    fanState: number,
    mistingState: number,
    heaterState: number,
    timeState: number
  ): Promise<void>;
  getDatabaseName(): string;
  getDatabaseVersion(): number;
}

class StorageService implements IStorageService {
  versionUpgrades = ModelsUpgradeStatements;
  loadToVersion =
    ModelsUpgradeStatements[ModelsUpgradeStatements.length - 1].toVersion;
  db!: SQLiteDBConnection;
  database: string = "blackdb";
  sqliteServ!: ISQLiteService;
  dbVerServ!: IDbVersionService;
  isInitCompleted = new BehaviorSubject(false);

  constructor(
    SqliteService: ISQLiteService,
    DbVersionService: IDbVersionService
  ) {
    this.sqliteServ = SqliteService;
    this.dbVerServ = DbVersionService;
  }

  getDatabaseName(): string {
    return this.database;
  }

  getDatabaseVersion(): number {
    return this.loadToVersion;
  }
  async initializeDatabase(): Promise<void> {
    try {
      await this.sqliteServ.addUpgradeStatement({
        database: this.database,
        upgrade: this.versionUpgrades,
      });
      this.db = await this.sqliteServ.openDatabase(
        this.database,
        this.loadToVersion,
        false
      );
      const isData = await this.db.query("select * from sqlite_sequence");
      if (isData.values!.length === 0) {
        // create database initial users if any
      }

      this.dbVerServ.setDbVersion(this.database, this.loadToVersion);
      if (platform === "web") {
        await this.sqliteServ.saveToStore(this.database);
      }
      this.isInitCompleted.next(true);
    } catch (error: any) {
      const msg = error.message ? error.message : error;
      throw new Error(`storageService.initializeDatabase: ${msg}`);
    }
  }

  // Queries
  // Getter
  async getUser(): Promise<User[]> {
    return (await this.db.query("SELECT * FROM users;")).values as User[];
  }

  async getActuator(lifeCycleStage: string): Promise<ActuatorControl[]> {
    return (
      await this.db.query(
        `SELECT * FROM actuator_control WHERE lifeCycleStage = ?;`,
        [lifeCycleStage]
      )
    ).values as ActuatorControl[];
  }

  async getEgg(userId: number): Promise<EggReading[]> {
    return (
      await this.db.query(
        `
        SELECT eggReadingValues.*
        FROM egg_reading_values AS eggReadingValues
        JOIN egg_readings AS eggReadings
          ON eggReadingValues.eggReadingId = eggReadings.id
        JOIN user_egg_sensor AS userEggSensors
          ON eggReadings.eggId = userEggSensors.eggId
        WHERE userEggSensors.userId = ${userId}
        ORDER BY eggReadingValues.timestamp DESC
        LIMIT 1;
        `
      )
    ).values as EggReading[];
  }

  async getLarva(userId: number): Promise<LarvaReading[]> {
    return (
      await this.db.query(
        `
        SELECT larvaReadingValues.*
        FROM larva_reading_values AS larvaReadingValues
        JOIN larva_readings AS larvaReadings
          ON larvaReadingValues.larvaReadingId = larvaReadings.id
        JOIN user_larva_sensor AS userLarvaSensors
          ON larvaReadings.larvaId = userLarvaSensors.larvaId
        WHERE userLarvaSensors.userId = ${userId}
        ORDER BY larvaReadingValues.timestamp DESC
        LIMIT 1;
        `
      )
    ).values as LarvaReading[];
  }

  async getPupa(userId: number): Promise<PupaReading[]> {
    return (
      await this.db.query(
        `
        SELECT pupaReadingValues.*
        FROM pupa_reading_values AS pupaReadingValues
        JOIN pupa_readings AS pupaReadings
          ON pupaReadingValues.pupaReadingId = pupaReadings.id
        JOIN user_pupa_sensor AS userPupaSensors
          ON pupaReadings.pupaId = userPupaSensors.pupaId
        WHERE userPupaSensors.userId = ${userId}
        ORDER BY pupaReadingValues.timestamp DESC
        LIMIT 1;
        `
      )
    ).values as PupaReading[];
  }

  async getAdult(userId: number): Promise<AdultReading[]> {
    return (
      await this.db.query(
        `
        SELECT adultReadingValues.*
        FROM adult_reading_values AS adultReadingValues
        JOIN adult_readings AS adultReadings
          ON adultReadingValues.adultReadingId = adultReadings.id
        JOIN user_adult_sensor AS userAdultSensors
          ON adultReadings.adultId = userAdultSensors.adultId
        WHERE userAdultSensors.userId = ${userId}
        ORDER BY adultReadingValues.timestamp DESC
        LIMIT 1;
        `
      )
    ).values as AdultReading[];
  }

  // Adder
  async addUser(user: User): Promise<number> {
    const sql = `INSERT INTO users (name) VALUES (?);`;
    const res = await this.db.run(sql, [user.name]);
    if (
      res.changes !== undefined &&
      res.changes.lastId !== undefined &&
      res.changes.lastId > 0
    ) {
      return res.changes.lastId;
    } else {
      throw new Error(`storageService.addUser: lastId not returned`);
    }
  }

  // Updater
  async updateUserById(id: string, active: number): Promise<void> {
    const sql = `UPDATE users SET active=${active} WHERE id=${id}`;
    await this.db.run(sql);
  }

  async updateActuatorControl(
    lifeCycleStage: string,
    fanState: number,
    mistingState: number,
    heaterState: number,
    timeState: number
  ): Promise<void> {
    const sql = `UPDATE actuator_control
      SET fanState=${fanState}, mistingState=${mistingState}, heaterState=${heaterState}, timeState=${timeState}
      WHERE lifeCycleStage='${lifeCycleStage}'`;
    await this.db.run(sql);
  }
}

export default StorageService;
