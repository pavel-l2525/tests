var express = require("express");
var router = express.Router();
const { exec } = require("child_process");

router.post("/", function (req, res, next) {
  let info = req.body;
  console.log(info);
  let axis;
  switch(info.axis) {
    case 'X':
      axis = 'A';
      break;
    case 'Y':
      axis = 'B';
      break;
    case 'Z':
      axis = 'C';
      break;
    default:
      break;
    
    }

  if (info.type === "jog") {
    exec(
      "python " +
        __dirname +
        "/../public/commands/jogMove.py " +
        axis,
      (err, stdout, stderr) => {
        if (err) {
          res.send("Error");
          return;
        }
        let body = JSON.parse(stdout);
        res.send(body);
      }
    );
  } else if (info.type === "coord") {
    exec(
      "python " +
        __dirname +
        "/../public/commands/manualMove.py " +
        axis +
        " " +
        info.distance,
      (err, stdout, stderr) => {
        if (err) {
          res.send("Error");
          return;
        }
        let body = JSON.parse(stdout);
        res.send(body);
      }
    );
  } else if (info.type === "stopjog") {
    exec(
      "python " + __dirname + "/../public/commands/stopJog.py " + axis,
      (err, stdout, stderr) => {
        if (err) {
          res.send("Error");
          return;
        }
        let body = JSON.parse(stdout);
        res.send(body);
      }
    );
  }
});

module.exports = router;
