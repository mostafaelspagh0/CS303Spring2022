class DebugStorage {
  storage = {};
  constructor() {
    this.storage = {};
  }
  async setItem(key: string, value: any) {
    this.storage[key] = value;
    const jsonStorage = {};
    for (let key in this.storage) {
      jsonStorage[key] = JSON.parse(this.storage[key]);
    }
    console.log("setItem", this.storage);
  }
  async getItem(key: string) {
    const jsonStorage = {};
    for (let key in this.storage) {
      jsonStorage[key] = JSON.parse(this.storage[key]);
    }
    console.log("getItem", jsonStorage);
    return this.storage[key];
  }
  async removeItem(key: string) {
    const jsonStorage = {};
    for (let key in this.storage) {
      jsonStorage[key] = JSON.parse(this.storage[key]);
    }
    console.log("removeItem", jsonStorage);
    delete this.storage[key];
  }
}

export default new DebugStorage();
