import express, { Express } from "express";

export default (app: Express) => {
  app.use(express.static("public"));
  app.use(
    express.urlencoded({
      extended: true,
      limit: "50mb",
      parameterLimit: 50000,
    })
  );
  app.use(express.json({ limit: "50mb" }));
};
