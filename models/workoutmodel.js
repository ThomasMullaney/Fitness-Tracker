
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({

  date: {
    type: Date,
    default: Date.now,
  },

  exercises: [{
    type: {
      type: String,
      trim: true,
      required: [true, "Enter exercise type"]
    },

    name: {
      type: String,
      trim: true,
      required: [true, "Enter Workout Name"]
    },


    weight: {
      type: Number,
      required: [true, "Enter weight"]
    },

    sets: {
      type: Number,
      required: [true, "Enter sets"]
    },


    reps: {
      type: Number,
      required: [true, "Enter reps"]
    },

    duration: {
      type: Number,
      required: [true, "Please enter duration of workout"]
    },

    distance: {
      type: Number,
      required: [true, "enter distance run"]
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


workoutSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercises) => {
    return total + exercises.duration;
  }, 0);
});
const Workout = mongoose.model("workouts", workoutSchema);

module.exports = Workout;
