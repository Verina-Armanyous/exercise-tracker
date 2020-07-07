const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// connecting mongoose with mongoATLAS database
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });
//

//connecting database routers
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
app.use("/exercises", exercisesRouter);
app.use("users", usersRouter);
//

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`server is running on: ${port} `);
});
