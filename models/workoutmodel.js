
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({

  Date: {
    type: Date,
    default: Date.now
  },

  exercises: [{
    type: {
      type: String,
      unique: true,
      required: "Enter exercise type"
    },

    name: {

      type: Schema.Types.ObjectId,
      ref: "Note",
      required: "Enter Workout Name"
    },

    duration: {
      type: Number,
      required: "Please enter duration of workout"
    },

    weight: {
      type: Number
    },

    reps: {
      type: Number
    },

    sets: {
      type: Number
    },

    distance: {
      type: Number
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
    return total + exercise.duration;
  }, 0);
});
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
