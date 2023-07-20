import { Request, Response, Express } from "express";
import getTweets, { clearCache } from "./functions";
require("dotenv").config();

// create express app
const app: Express = require("express")();

const PORT = process.env.PORT || 3000;


app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World");
});


app.get("/tweets", async (req: Request, res: Response) => {
  try {
    let data = await getTweets();
    res.status(200).send(data);
  } catch (e: any) {
    res.status(404).send({ message: e.message });
  }
});


app.get("/clear-cache", async (req: Request, res: Response) => {
  let data = await clearCache();
  res.status(200).send(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
