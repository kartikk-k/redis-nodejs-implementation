
# Simple Redis implementation

It uses redis for storing and fetching data whenever request is made. For example in this case it is: `http://localhost:8080/tweets`

## References
Redis - [Upstash(free)](https://upstash.com/)

Starter template - [nodeJS with typescript (github)](https://github.com/kartikk-k/nodejs-typescript-template)
## Example

When cached data is returned
```json
{
    "source": "cache",
    "data": [
        ...
    ]
}
```

When data is returned from database
```json
{
    "source": "database",
    "data": [
        ...
    ]
}
```

## Implementation

#### Setup redis

Package required
```bash
npm i ioredis dotenv
```

create `lib/redis.ts`
```ts
import { Redis } from "ioredis";
require('dotenv').config()

// get redis url from environment variables
export const getRedisUrl = () => {

  if (process.env.REDIS_URL) return process.env.REDIS_URL;
  else throw new Error("Redis URL not found");
  
};

export const redis = new Redis(getRedisUrl());
```

#### Usage - Get data (array of tweets in this case) `functions.ts`

```ts
  const getTweets = async () => {
  // try getting cached data from redis
  const cachedData = await redis.get("tweets");

  //   if cached data exists
  if (cachedData) {
    return {
      source: "cache",
      data: JSON.parse(cachedData),
    };

  // if cached data doesn't exists 
  } else {
    /* database request
        ... get data ex:
        const data = await fetch('http://...')
    */
    
    // add/cache data in redis for future requests
    await redis.set("tweets", JSON.stringify(data));
    
    return {
      source: "database",
      data: tweetsData,
    };

  }
};
```

#### API endpoint `index.ts`

```ts
app.get("/tweets", async (req: Request, res: Response) => {
  try {
    let data = await getTweets();
    res.status(200).send(data);
  } catch (e: any) {
    res.status(404).send({ message: e.message });
  }
});
```