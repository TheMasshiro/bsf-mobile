export const ModelsUpgradeStatements = [
  {
    toVersion: 1,
    statements: [
      // Users table
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        espId TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL
      );`,

      // EggReading table
      `CREATE TABLE IF NOT EXISTS egg_readings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        eggId INTEGER NOT NULL,
        date TEXT NOT NULL
      );`,

      // Egg reading values
      `CREATE TABLE IF NOT EXISTS egg_reading_values (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        eggReadingId INTEGER NOT NULL,
        timestamp TEXT NOT NULL,
        temperature REAL,
        humidity REAL,
        moisture REAL,
        ammonia REAL,
        FOREIGN KEY(eggReadingId) REFERENCES egg_readings(id)
      );`,

      // LarvaReading table
      `CREATE TABLE IF NOT EXISTS larva_readings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        larvaId INTEGER NOT NULL,
        date TEXT NOT NULL
      );`,

      // Larva reading values
      `CREATE TABLE IF NOT EXISTS larva_reading_values (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        larvaReadingId INTEGER NOT NULL,
        timestamp TEXT NOT NULL,
        temperature REAL,
        humidity REAL,
        moisture REAL,
        ammonia REAL,
        FOREIGN KEY(larvaReadingId) REFERENCES larva_readings(id)
      );`,

      // User-sensor linking tables
      `CREATE TABLE IF NOT EXISTS user_egg_sensor (
        userId TEXT NOT NULL,
        eggId INTEGER NOT NULL,
        PRIMARY KEY(userId, eggId),
        FOREIGN KEY(userId) REFERENCES users(id)
      );`,

      `CREATE TABLE IF NOT EXISTS user_larva_sensor (
        userId TEXT NOT NULL,
        larvaId INTEGER NOT NULL,
        PRIMARY KEY(userId, larvaId),
        FOREIGN KEY(userId) REFERENCES users(id)
      );`,

      `CREATE TABLE IF NOT EXISTS user_pupa_sensor (
        userId TEXT NOT NULL,
        pupaId INTEGER NOT NULL,
        PRIMARY KEY(userId, pupaId),
        FOREIGN KEY(userId) REFERENCES users(id)
      );`,

      `CREATE TABLE IF NOT EXISTS user_adult_sensor (
        userId TEXT NOT NULL,
        adultId INTEGER NOT NULL,
        PRIMARY KEY(userId, adultId),
        FOREIGN KEY(userId) REFERENCES users(id)
      );`,
    ],
  },
  /* add new statements below for next database version when required*/
  /*
    {
    toVersion: 2,
    statements: [
        `ALTER TABLE users ADD COLUMN email TEXT;`,
    ]
    },
    */
];
