const Workout =  require("../models/workoutmodel");
const db = require("../models");
const router = require("express").Router();

// module.exports = function(app) {
    router.get("/api/workouts", (req, res) => {
        db.Workout.findOne({}).sort({date:-1})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        })
    });

    


// New Post
router.post("/api/workouts", async(req, res) => {
    Workout.create({}).then(dbWorkout => {
        res.json(dbWorkout)
    })
    .catch(err=> {
        res
    })
});

router.put("/api/workouts/:id", ({body, params}, res) => {
    console.log(body, params)
    const workoutId = params.id;
    let savedExercises = [];

    db.Workout.find({_id: workoutId})
    .then (dbWorkout => {
        console.log(dbWorkout)
        savedExercises = dbWorkout(0).exercises;
        res.json(dbWorkout[0].exercises);
        let allExercises = [...savedExercises, body]
        console.log(allExercises)
        updatedWorkout(allExercises)
    })
    .catch(err => {
        res.json(err);
    });

    function updatedWorkout(exercises){
        db.Workout.findByIdAndUpdate(workoutId, {exercises: exercises}, function(err, doc){
            if(err){
                console.log(err)
            }
        })
    }
})

router.get("/api/workouts/range", (req, res) => {
    db.Workout.findOne({})
    .then(workout => {
        res.json(workout);
    })
    .catch(err => {
        res.json(err);
    });
});


module.exports = router;