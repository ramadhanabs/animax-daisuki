import Dexie from 'dexie'

export const db = new Dexie('db')
db.version(1).stores({
  collection: '++id, name' // Primary key and indexed props
})
