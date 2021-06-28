import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { title, image, address, description } = req.body;

    const client = await MongoClient.connect(process.env.url);

    const db = client.db();
    const meetupCollection = db.collection("meetups");

    const result = await meetupCollection.insertOne(req.body);

    client.close();

    res.status(201).send(result);
  }
}
export default handler;
