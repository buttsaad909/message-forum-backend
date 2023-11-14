const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json())
app.use(cors());

const PORT = 3010;

app.listen(PORT, () => {
    console.log(`Server Listening on port ${PORT}`);
  });