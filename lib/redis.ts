import { Redis } from "ioredis";
require('dotenv').config()

// get redis url from environment variables
export const getRedisUrl = () => {

  if (process.env.REDIS_URL) return process.env.REDIS_URL;
  else throw new Error("Redis URL not found");
  
};

export const redis = new Redis(getRedisUrl());