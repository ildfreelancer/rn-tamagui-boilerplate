import {MMKV, MMKVConfiguration} from 'react-native-mmkv';

export class Storage {
  private static _instance: Storage;
  private _storage: MMKV;
  constructor(configuration?: MMKVConfiguration) {
    this._storage = new MMKV(configuration);
  }

  static get instance() {
    return Storage._instance;
  }

  public static setup(configuration?: MMKVConfiguration) {
    if (!Storage.instance) {
      Storage._instance = new Storage(configuration);
    }
    return Storage._instance;
  }

  getStorage() {
    return this._storage;
  }

  /**
   * Loads a string from storage.
   *
   * @param key The key to fetch.
   */
  getItem(key: string, type?: 'number' | 'string' | 'boolean' | 'object') {
    if (type === 'number') {
      return this._storage.getNumber(key);
    }
    if (type === 'boolean') {
      return this._storage.getBoolean(key);
    }
    if (type === 'object') {
      try {
        const jsonObject = this._storage.getString(key);
        return JSON.parse(jsonObject as any);
      } catch {
        return null;
      }
    }
    return this._storage.getString(key);
  }

  /**
   * Saves a string to storage.
   *
   * @param key The key to fetch.
   * @param value The value to store.
   */
  setItem(key: string, value: string | number | boolean | object) {
    let targetValue;
    if (typeof value === 'object') {
      targetValue = JSON.stringify(value);
    } else {
      targetValue = value;
    }
    return this._storage.set(key, targetValue);
  }

  /**
   * Removes something from storage.
   *
   * @param key The key to kill.
   */
  removeItem(key: string) {
    return this._storage.delete(key);
  }

  /**
   * Burn it all to the ground.
   */
  clearAll() {
    return this._storage.clearAll();
  }
}

export const storage = new MMKV();

export const getAsyncStorage = (storage: Storage) => ({
  setItem: (key: string, value: string): Promise<void> => {
    storage.setItem(key, value);
    return Promise.resolve();
  },
  getItem: (key: string): Promise<string | null> => {
    const value = storage.getItem(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string): Promise<void> => {
    storage.removeItem(key);
    return Promise.resolve();
  },
});
