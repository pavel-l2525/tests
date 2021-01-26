/*
*********************************************
Manual Card START
*********************************************
*/

async function manualMove(el) {
    console.log("Activated manual move");
    /*
    <button
      class="btn btn-outline-secondary"
      type="button"
      id="yManualJog"
      onclick="manualMove(this)"
    >
      <ion-icon name="pulse-outline"></ion-icon>
    </button>
    */
    let distance = 0;
    let cmd = el.id.split("Manual");
    let axis = cmd[0].toUpperCase();
    let type = cmd[1].toLowerCase();
    console.log(axis, type);
  
    //Disbale button until response is back
    if (type === "coord") {
      if (
        document.getElementById(cmd[0] + "Manual").value === "" ||
        isNaN(document.getElementById(cmd[0] + "Manual").value)
      ) {
        console.log(document.getElementById(cmd[0] + "Manual").value);
        return;
      }
      //el.setAttribute("disabled", true);
      //el.innerHTML =
      //  '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
      switch (axis) {
        case "X":
          distance =
            Number(document.getElementById(cmd[0] + "Manual").value) * 200;
          break;
        case "Y":
          distance =
            Number(document.getElementById(cmd[0] + "Manual").value) * 200;
          break;
        case "Z":
          distance =
            Number(document.getElementById(cmd[0] + "Manual").value) *
            787.40157480315;
          break;
        default:
          distance = 0;
          break;
      }
      console.log(distance);
    }
  
    if (type === "jog") {
      if (currentJoggingAxis != null) {
        console.log("Clicking stop", currentJoggingAxis);
        let stopButton =
          document.getElementById(currentJoggingAxis + "ManualstopJog") || false;
        if (stopButton != false) {
          stopButton.click();
        }
        //document.getElementById(currentJoggingAxis + "ManualstopJog").click();
      }
      //setTimeout(function () {
      currentJoggingAxis = cmd[0];
      //Make button Stop Jog
      console.log("making StopJog");
      el.innerHTML = "<ion-icon name='close-outline'></ion-icon>";
      el.className = "btn btn-danger";
      el.id = cmd[0] + "ManualstopJog";
      //}, 500);
    } else if (type === "stopjog") {
      //Make button Jog again
      console.log("making Jog");
      el.innerHTML = "<ion-icon name='pulse-outline'></ion-icon>";
      el.className = "btn btn-outline-secondary";
      el.id = cmd[0] + "ManualJog";
    }
  
    if (type === "stopjog") {
      let manualFetch = await fetch("http://localhost:3000/stopJog");
      let response = await manualFetch.json();
      console.log(response);
    } else {
      let manualFetch = await fetch("http://localhost:3000/manualMove", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
          axis: axis,
          distance: distance,
        }),
      });
      let response = await manualFetch.json();
      // console.log("DID IT!!!");
      console.log(response);
      if (response.type === "coord" && response.status === "OK") {
        el.removeAttribute("disabled");
        el.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon>';
      }
    }
  }
  
  /*
  *********************************************
  Manual Card END
  *********************************************
  */
  
  /*
  *********************************************
  SPEED Card START
  *********************************************
  */
  
  function setSpeed(val, el) {
    console.log("Set speed to", val);
    let err = false;
    let speed = 0;
  
    val = Math.floor(val);
  
    if (val === 0) {
      console.log("Got numeric");
      let inputVal = Number(document.getElementById("speedInput").value);
      if (inputVal <= 0 || inputVal > 1000) {
        err = true;
      } else {
        speed = inputVal;
        val = inputVal;
      }
    }
  
    /*
    <button
      type="button"
      class="btn btn-outline-danger"
      onclick="setSpeed(1000, this)"
    >
      Rápido
    </button>
    */
  
    if (val > 0 && val <= 1000) {
      let buttonList = document.getElementById("btn-group-speed").children;
      if (buttonList.length > 1) {
        for (let element in buttonList) {
          buttonList[element].className = "btn btn-outline-secondary";
        }
      }
      switch (val) {
        case 100:
          document.getElementById("btn-group-speed-low").className =
            "btn btn-success";
          break;
        case 500:
          document.getElementById("btn-group-speed-med").className =
            "btn btn-warning";
          break;
        case 1000:
          document.getElementById("btn-group-speed-high").className =
            "btn btn-danger";
          break;
        default:
          break;
      }
      document.getElementById("speedInput").value = val;
    } else {
      err = true;
    }
  
    if (err) {
      console.log("Error setting speed");
      return;
    }
    document.getElementById("selectedMoveSpeed").innerHTML = val + " mm/min";
    globalObject.speed = val;
    execStatus();
  }
  
  /*
  *********************************************
  SPEED Card END
  *********************************************