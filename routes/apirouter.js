const Workout = require("../models/workoutmodel");
const router = require("express").Router();

// module.exports = function(app) {
router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            console.log("this is dbWorkout", dbWorkout)
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
});

// New Post
router.post("/api/workouts", ({ body }, res) => {
    console.log("body: ", typeof body);
    const keys = Object.keys(body)
    console.log(keys)
    if (keys === {}) {

    }

    Workout.create({}).then(dbWorkout => {
        res.json(dbWorkout)
    },

        { new: true, runValidators: true })
        .catch(err => {
            res.json(err)
        })
});

router.put("/api/workouts/:id", (req, res) => {
    console.log("req.body: ", req.body);
    console.log("req.params.id: ", req.params.id);

    Workout.updateOne({ _id: req.params.id },
        {
            $push: {
                exercises: [
                    {
                        // _id: mongojs.ObjectID(),
                        ...req.body,
                    }
                ],
            },
        })
        // ,{ new: false, runValidators: true })
        // The validator breaks code. No longer adds new exercises to mongo, and will not update continued workouts

        .then((dbWorkout) => {
            console.log(dbWorkout)
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
})

exports.getWorkoutByDate = async(req, res) => {
    try {
        let {startDate, endDate} = req.query;

        if(startDate==="" || endDate===""){
            return res.status(400).json({
                status: 'failure',
                message: "please select a date"
            })
        }
        console.log({startDate, endDate});

        const workouts = Workout.find({
            day: {
                $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                $lte: new Date (new Date(endDate).setHours(23, 59, 59)) 
            }
        }).sort({day: 'asc'})
    }
   finally { res.status(200).json({
       status:'success',
       data: workouts
   })
}
}

router.get("/api/workouts/range", (req, res) => {
    Workout.find().sort({ $natural: -1 }).limit(7)
        .then(dbWorkout => {
            console.log("This is dbWorkout: ", dbWorkout)
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
})

router.delete("/api/workouts/delete", (req, res) => {
    Workout.deleteMany({})
        .then(() => {
            res.json("deleted")
        });
});


module.exports = router;