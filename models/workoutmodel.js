
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({

  day: {
    type: Date,
    default: Date.now,
  },

  exercises: [{
    type: {
      type: String,
      trim: true,
      required: true
    },

    name: {
      type: String,
      trim: true,
      required: true
    },


    weight: {
      type: Number,
      
    },

    sets: {
      type: Number,
      
    },


    reps: {
      type: Number,
      
    },

    duration: {
      type: Number,
      required: true
    },

    distance: {
      type: Number,
      
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
