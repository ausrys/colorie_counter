const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const db = require('./models');
const rootRouter = require('./routes/rootRouter');
app.use(rootRouter);
db.sequelize.sync().then(() => {
    app.listen(process.env.PORT || 5000);
})