
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({

  date: {
    type: Date,
    default: Date.now
  },

  exercises: [{
    type: {
      type: String,
      trime: true,
      required: "Enter exercise type"
    },

    name: {
      type: String,
      trim: true,
      required: "Enter Workout Name"
    },

    duration: {
      type: Number,
      required: "Please enter duration of workout"
    },

    weight: {
      type: Number,
      required: "Enter weight"
    },

    reps: {
      type: Number,
      required: "Enter reps"
    },

    sets: {
      type: Number,
      required: "Enter sets"
    },

    distance: {
      type: Number,
      required: "enter distance run"
    }

  }],
},

  {
    toJSON:
    {
      virtuals: true
    }
  }
);


workoutSchema.virtual("totalDuration").get(function(){
  return this.exercises.reduce((total, exercises) => {
    return total + exercises.duration;
  }, 0);
});
const Workout = mongoose.model("workouts", workoutSchema);

module.exports = Workout;
