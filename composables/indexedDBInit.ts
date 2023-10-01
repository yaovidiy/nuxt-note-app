export const DB_NAME: string = 'NOTES_DB'
export const STORE_NAME: string = 'notesStore'

export function initDB(): IDBDatabase | string {
  let db!: IDBDatabase

  const request = indexedDB.open(DB_NAME, 1)
  request.onerror = (error) => console.log(error)
  request.onsuccess = () => db = request.result
  request.onupgradeneeded = () => {
    const db = request.result
    const notesStore = db.createObjectStore(STORE_NAME, { keyPath: 'uuid' })
    notesStore.createIndex('content', 'content', {})
    notesStore.createIndex('uuid', 'uuid', { unique: true })
    notesStore.createIndex('createdAt', 'createdAt', {})
  }

  return db
}
