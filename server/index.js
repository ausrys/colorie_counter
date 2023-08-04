const express = require("express");
require("dotenv").config();
const cookierParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookierParser());

const db = require("./models");
const rootRouter = require("./routes/rootRouter");
app.use(rootRouter);
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000);
});
