import * as Environment from "~/node_common/environment";

import express from "express";
import next from "next";
import compression from "compression";
import cors from "cors";

const app = next({
  dev: !Environment.IS_PRODUCTION,
  dir: __dirname,
  quiet: false,
});

const handler = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  server.use(cors());

  if (Environment.IS_PRODUCTION) {
    server.use(compression());
  }

  server.use("/public", express.static("public"));
  server.all("*", async (r, s) => handler(r, s, r.url));

  const listenServer = server.listen(Environment.PORT, (e) => {
    if (e) throw e;

    console.log(`[ slate ] client: http://localhost:${Environment.PORT}`);
  });

  listenServer.setTimeout(15 * 60 * 1000);
});
