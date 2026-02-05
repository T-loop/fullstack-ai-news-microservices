const express = require("express");
const app = express();
const path = require("path");
const authRouter = require("./routes/userRouter");
const newsRouter= require("./routes/newsRouter");
const publicRouter= require("./routes/publicRouter");
const allowedOrNot = require("./middleware/middleware");

require("./utils/cron");

const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);

app.use("/news",allowedOrNot,newsRouter);

app.use("/public",publicRouter);


app.listen(PORT, () =>
  console.log(`Nodejs Server läuft auf Port ${PORT}`)
);
