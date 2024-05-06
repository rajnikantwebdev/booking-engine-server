import { MongoClient } from "mongodb";
const uri =
  "mongodb+srv://rsusishere:6d2L62D3jQtCg2y0@cluster0.7wgd2pu.mongodb.net/";

export const client = new MongoClient(uri);

const connectToMongo = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.log("unable to connect to mongo due to: ", error);
  }
};

export default connectToMongo;
