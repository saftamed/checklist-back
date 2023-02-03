require("dotenv").config();
let mongoose = require("mongoose");
const bodyParser = require('body-parser')

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const taskRoute = require("./routes/task");
const ligneRoute = require("./routes/ligne");
const machineRoute = require("./routes/machine");
const typeRoute = require("./routes/type");
const machineTasksCheckerRoute = require("./routes/machineTasksChecker");

var cors = require('cors')

const express = require("express");
const app = express();
app.use(cors())

app.use('/', express.static('public'));
// Connect To DataBase
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

  
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: false
  }));


app.use("/api/v1/user",userRoute)
app.use("/api/v1/auth",authRoute)
app.use("/api/v1/task",taskRoute)

app.use("/api/v1/ligne",ligneRoute)

app.use("/api/v1/machine",machineRoute)
app.use("/api/v1/types",typeRoute)
app.use("/api/v1/machineTasksChecker",machineTasksCheckerRoute)

function getLocalIp() {
  const os = require('os');

  for(let addresses of Object.values(os.networkInterfaces())) {
      for(let add of addresses) {
          if(add.address.startsWith('192.168.')) {
              return add.address;
          }
      }
  }
}
app.listen(process.env.PORT || 3000,"localhost", function () {
  console.log(`server Started on ${getLocalIp()} port ${process.env.PORT || 3000} `);
});