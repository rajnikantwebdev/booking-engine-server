import http from "http";
import connectToMongo from "./db/mongoClient.js";
import { getAllData } from "./routes/getAllData.js";

async function startServer() {
  try {
    await connectToMongo();
    http
      .createServer(async (req, res) => {
        if (req.url === "/api/data") {
          try {
            const data = await getAllData();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(data)); // End the response after writing
          } catch (error) {
            console.log("unable to fetch data try again later...");
            res.writeHead(500);
            res.end("Internal server error");
          }
        } else {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("closed");
        }
      })
      .listen(8000);
    console.log("server started successfully");
  } catch (error) {
    console.log("Error starting the sever: ", error);
  }
}

startServer();
