const path = require("path");

module.exports = {
    apps : [{
      name   : "id-card",
      script : path.join(__dirname, "bin/id-card-service.exe")
    }]
  };