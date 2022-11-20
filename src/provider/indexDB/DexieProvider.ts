import { db } from ".";

class dexieProvider {
  private dbTable: string;

  constructor(table: string) {
    this.dbTable = table
  }

  async addAll(item: any[]) {
    await db.table(this.dbTable).bulkAdd(item)
  }

  async getAll() {
    return db.table(this.dbTable).toArray()
  }

  async deleteAll() {
    await db.table(this.dbTable).clear()
  }
}

export { dexieProvider }