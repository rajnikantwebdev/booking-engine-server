import { client } from "../db/mongoClient.js";

export const getAllData = async (filter) => {
  const database = client.db("booking-engine");
  const collection = database.collection("hotels_data");
  const data = await collection.find(filter).toArray();
  return data.length !== 0
    ? { data: data, dataMessage: 1 }
    : { data: [], dataMessage: 0 };
};
