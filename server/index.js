const express = require("express");
require("dotenv").config();
const cookierParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://colorie-counter.vercel.app"
        : "http://127.0.0.1:5173",
    credentials: true,
    preflightContinue: true,
  })
);

app.use(express.json());
app.use(cookierParser());

const db = require("./models");
const rootRouter = require("./routes/rootRouter");
const oldRecordsRemoval = require("./cron/cronjobs");
app.use(rootRouter);
db.sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT || 5000);
  oldRecordsRemoval();
});
