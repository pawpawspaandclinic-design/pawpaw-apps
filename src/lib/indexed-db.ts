import { openDB, DBSchema } from 'idb';

interface PawPawDB extends DBSchema {
  bookingQueue: {
    key: number;
    value: any;
  };
}

const dbPromise = openDB<PawPawDB>('pawpaw-db', 1, {
  upgrade(db) {
    db.createObjectStore('bookingQueue', { autoIncrement: true });
  },
});

export async function addToQueue(data: any) {
  const db = await dbPromise;
  await db.add('bookingQueue', data);
}

export async function getQueue() {
  const db = await dbPromise;
  return db.getAll('bookingQueue');
}

export async function clearQueue() {
  const db = await dbPromise;
  await db.clear('bookingQueue');
}
