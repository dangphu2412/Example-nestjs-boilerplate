import * as env from 'dotenv';
env.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = parseInt(process.env.PORT, 10) || 3000;
export const DB_URI = process.env.DB_URI;
export const DB_LOGGING = process.env.NODE_ENV !== 'production';
export const DB_TYPE = process.env.DB_TYPE || 'postgres';
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;
export const JWT_CONFIG = {
    SECRET: process.env.JWT_SECRET,
    EXPIRE: process.env.JWT_EXPIRES
}
