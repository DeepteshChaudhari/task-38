const express = require("express");
const app = express();
require("dotenv").config();
const roomsRouter = require("./routes/rooms.routes");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(roomsRouter);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
