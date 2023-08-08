const express = require("express");
require("dotenv").config();
const cookierParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://colorie-counter-sx7c.vercel.app/"
        : "http://localhost:5173",
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
