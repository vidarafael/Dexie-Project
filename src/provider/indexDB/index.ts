import Dexie, { Table } from 'dexie';

interface IItems {
  id_key?: number;
  id: number;
  name: string;
  test: string;
  test_id: string;
}

export class MyDexie extends Dexie {
  items!: Table<IItems>

  constructor() {
    super('dexieDB')
    this.version(1).stores({
      items: '++id_key, id, name, test, test_id', // Primary key and indexed props
    });
  }
}

export const db = new MyDexie();