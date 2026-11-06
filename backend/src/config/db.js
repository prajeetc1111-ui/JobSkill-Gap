import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export let dbStatus = {
  connected: false,
  mode: 'disconnected', // 'mongodb' | 'fallback'
  uri: '',
  error: null,
};

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'local-database.json');

// Ensure local fallback store directory and file exist
export function initLocalStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify({ analyses: [], profiles: [], plans: [] }, null, 2)
    );
  }
}

export function readLocalStore() {
  try {
    initLocalStore();
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading local fallback store:', err.message);
    return { analyses: [], profiles: [], plans: [] };
  }
}

export function writeLocalStore(data) {
  try {
    initLocalStore();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing local fallback store:', err.message);
  }
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jobskill_gap';
  dbStatus.uri = uri;

  console.log(`[DB] Attempting MongoDB connection to: ${uri}`);

  try {
    // Attempt connecting with 2500ms timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500,
    });
    dbStatus.connected = true;
    dbStatus.mode = 'mongodb';
    dbStatus.error = null;
    console.log('✅ [DB] Connected successfully to MongoDB!');
  } catch (err) {
    dbStatus.connected = true; // functionally operational via fallback
    dbStatus.mode = 'fallback';
    dbStatus.error = err.message;
    initLocalStore();
    console.warn(`⚠️ [DB] MongoDB unreachable (${err.message}).`);
    console.log('📂 [DB] Seamlessly switched to Local Persistent File Store (data/local-database.json).');
    console.log('💡 [DB] All features (save, load, update, delete) will function without interruption.');
  }

  return dbStatus;
}

