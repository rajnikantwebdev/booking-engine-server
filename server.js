import http from "http";
import connectToMongo from "./db/mongoClient.js";
import { getAllData } from "./routes/getAllData.js";
import url from "url";
import { URL } from "url";

async function startServer() {
  try {
    await connectToMongo();
    http
      .createServer(async (req, res) => {
        res.setHeader(
          "Access-Control-Allow-Origin",
          "*"
        ); /* @dev First, read about security */
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
        res.setHeader("Access-Control-Max-Age", 2592000); // 30 days
        res.setHeader("Access-Control-Allow-Headers", "content-type"); // Might be helpful

        const q = url.parse(req.url, true);
        console.log(req.url);

        if (q.pathname === "/api/data") {
          const { searchParams } = new URL(
            req.url,
            "http://localhost:4000/api/data"
          );
          const indianParam = searchParams.get("indian");
          const location = searchParams.get("location");
          const adultCount = searchParams.get("adult");
          const roomCount = searchParams.get("room");
          const childrenCount = searchParams.get("children");

          const filter = {};

          if (indianParam !== null) {
            filter["indian"] = indianParam === "true";
          }

          if (location != null) {
            filter["location"] =
              location.slice(0, 1).toUpperCase() + location.slice(1);
          }

          if (adultCount >= 2 || roomCount > 1) {
            filter["spacious"] = true;
          }

          if (childrenCount > 0) {
            filter["children"] = true;
          }

          try {
            const data = await getAllData(filter);
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
