import { redis } from "./lib/redis";
import data from "./sample-data.json";

const getTweets = async () => {
  // try getting cached data from redis
  const cachedData = await redis.get("tweets");

  //   if cached data exists then return it
  if (cachedData) {
    return {
      source: "cache",
      data: JSON.parse(cachedData),
    };

  } else {
    // let's assume that data is coming from database
    let tweetsData = data // this will be replaced by database request

    // if cached data doesn't exist then get data from database and add to redis
    await redis.set("tweets", JSON.stringify(data));
    
    return {
      source: "database",
      data: tweetsData,
    };

  }
};

export default getTweets;


// clear tweets data from redis
export const clearCache = async () => {
    const cache = await redis.del("tweets");

    if(cache === 0) return {message: "Cache is already empty"}
    else return {message: "Cache cleared"}

}