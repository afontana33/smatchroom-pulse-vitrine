import { initSchema, closeDb } from '../lib/db.js';
import { logger } from '../lib/logger.js';

initSchema();
logger.info('Database schema initialized at src/seo-engine/data/seo.db');
closeDb();
