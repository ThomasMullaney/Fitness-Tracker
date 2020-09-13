
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3000


const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGOATLAS_URI || "mongodb+srv://TomM:<mrniceguy911>@fitness-tracker-2020-tm.jxcw9.mongodb.net/<workout>?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// // routes
app.use(require("./routes/apirouter"));
app.use(require("./routes/htmlRouter"))



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
