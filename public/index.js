const workoutSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioName = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weight = document.querySelector("#weight");
const sets = document.querySelector("#sets");
const reps = document.querySelector("#reps");
const duration = document.querySelector("#duration");
const resistanceDuration = document.querySelector("#resistance-duration");
const distance = document.querySelector("#distance");
const complete = document.querySelector("button.complete");
const addBtn = document.querySelector("button.add-button");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout");

let workoutType = null;
let shouldNavigateAway = false;

init();

async function init() {
  if (location.search.split("=")[1] === undefined) {
    const workout = await API.getLastWorkout();
    if (workout) {
      location.search = "?id=" + workout._id;
    } else {
      document.querySelector("#continue-btn").classList.add("d-none")
    }
  }
}

function validation(){
  let isValid = true;

  if(workoutType === "resistance"){
    if (nameInput.value.trim() === ""){
      isValid = false;
    }

    if (weight.value.trim() === ""){
      isValid = false;
    }
    if (sets.value.trim() === ""){
      isValid = false;
    }
    if (reps.value.trim() === ""){
      isValid = false;
    }
    if (resistanceDuration.value.trim() === ""){
      isValid = false;
    }
  } else

  if(workoutType === "cardio") {
    if (cardioName.value.trim() === ""){
      isValid = false;
    }
    if (distance.value.trim() === ""){
      isValid = false;
    }
    if (duration.value.trim() === ""){
      isValid = false;
  }
}
}