export interface User {
  id: string;
  espId: string;
  name: string;
  email: string;
  eggSensors: number[];
  larvaSensors: number[];
  pupaSensors: number[];
  adultSensors: number[];
}

export interface Reading {
  id?: number;
  timestamp: Date;
  temperature: number;
  humidity: number;
  moisture: number;
  ammonia: number;
}

export interface EggReading {
  id: number;
  eggId: number;
  date: Date;
  readings: Reading[];
}

export interface LarvaReading {
  id: number;
  larvaId: number;
  date: Date;
  readings: Reading[];
}

export interface PupaReading {
  id: number;
  pupaId: number;
  date: Date;
  readings: Reading[];
}

export interface AdultReading {
  id: number;
  adultId: number;
  date: Date;
  readings: Reading[];
}
