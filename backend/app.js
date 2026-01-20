const express = require("express");
const app = express();
const authRouter = require("./routes/userRouter");

const PORT = 3000;

app.use(express.json());

app.use("/auth", authRouter);

app.listen(PORT, () =>
  console.log(`Nodejs Server läuft auf Port ${PORT}`)
);
