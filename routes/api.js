const router = require("express").Router();
const Workout = require("../models/workout");

router.post("/api/workouts", (req, res) => {
    Workout.create({}).then(data => res.json(data)).catch(err => res.json(err))
});

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ]).then(data => res.json(data))
})

router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        { new: true, runValidators: true }
    ).then(data => res.json(data)).catch(err => res.json(err))
});

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "exercises.duration"
                }
            }
        }
    ]).sort({ _id: -1 }).limit(7).then(data => res.json(data))
})

module.exports = router;