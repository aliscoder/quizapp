import express from "express";
import "express-async-errors";
import http from "http";
import config from "./startup/config";
import db from "./startup/db";
import middlewares from "./startup/middlewares";
import routes from "./startup/routes";
import server from "./startup/server";

const app = express();
export const HTTPserver = http.createServer(app);

// cron.schedule("*/1 * * * * *", changeGames);

config();
middlewares(app);
routes(app);
db();
server(HTTPserver);
