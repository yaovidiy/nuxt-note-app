import { v4 as uuidv4 } from 'uuid';
import { DB_NAME, STORE_NAME } from "./indexedDBInit"

interface NoteItem {
  uuid: string,
  content: string,
  createdAt: number
}

let db: IDBDatabase

export function addItem(content: string): Promise<any> {
  const open = indexedDB.open(DB_NAME)

  return new Promise((resolve, reject) => {
    open.onsuccess = () => {
      db = open.result

      if ([...db.objectStoreNames].find(name => name === STORE_NAME)) {
        const transaction = db.transaction(STORE_NAME, 'readwrite')
        const objStore = transaction.objectStore(STORE_NAME)
        const payload: NoteItem = {
          uuid: uuidv4(),
          content,
          createdAt: new Date().getTime()
        }
        const request = objStore.add(payload)
        request.onerror = (err) => reject(err)
        request.onsuccess = () => {
          resolve(payload)
        }

        transaction.oncomplete = () => db.close()
      } else {
        reject('No such store in IndexedDB!')
      }
    }
  })
}

export function deleteItem(uuid: string): Promise<string> {
  const open = indexedDB.open(DB_NAME)

  return new Promise((resolve, reject) => {
    open.onsuccess = () => {
      let request: IDBRequest

      db = open.result

      if ([...db.objectStoreNames].find(name => name === STORE_NAME)) {
        const transaction = db.transaction(STORE_NAME, 'readwrite')
        const objectStore = transaction.objectStore(STORE_NAME)
        request = objectStore.delete(uuid)
        request.onerror = (err) => reject(err)
        request.onsuccess = () => {
          resolve('Item deleted')
        }
        transaction.oncomplete = () => db.close()
      } else {
        reject('No such store in IndexedDB!')
      }
    }
  })
}

export function editItem(uuid: string, payload: NoteItem): Promise<string> {
  const open = indexedDB.open(DB_NAME)

  return new Promise((resolve, reject) => {
    open.onsuccess = () => {
      let request: IDBRequest

      db = open.result

      if ([...db.objectStoreNames].find(name => name === STORE_NAME)) {
        const transaction = db.transaction(STORE_NAME, 'readwrite')
        const objectStore = transaction.objectStore(STORE_NAME)
        request = objectStore.get(uuid)
        request.onerror = (err) => reject(err)
        request.onsuccess = () => {
          const sereliazed = JSON.parse(JSON.stringify(payload))
          const updateRequest = objectStore.put(sereliazed)

          updateRequest.onsuccess = () => resolve('successfully updated')
        }
        transaction.oncomplete = () => db.close()
      } else {
        reject('No such store in IndexedDB!')
      }
    }
  })
}

export function getAllItems(): Promise<Array<NoteItem>> | Promise<[]> {
  const open = indexedDB.open(DB_NAME)

  return new Promise((resolve, reject) => {
    open.onsuccess = () => {
      let request!: IDBRequest

      db = open.result

      if ([...db.objectStoreNames].find(name => name === STORE_NAME)) {
        const transaction = db.transaction(STORE_NAME)
        const objStore = transaction.objectStore(STORE_NAME)
        request = objStore.getAll()
        request.onsuccess = () => resolve(request.result.sort((a: NoteItem, b: NoteItem) => b.createdAt - a.createdAt))
      } else {
        reject('No such store in IndexedDB!')
      }
    }
  })
}