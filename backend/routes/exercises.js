const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`error: ${err}`));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });
    newExercise.save()
        .then(() => res.json('exercise added'))
        .catch(err => {
            res.status(400).json(`error: ${err}`);
        });
});

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('user delected'))
        .catch(err => res.status(400).json('error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username ? req.body.username : exercise.username;
            exercise.description = req.body.description ? req.body.description : exercise.description;
            exercise.duration = req.body.duration ? Number(req.body.duration) : exercise.duration;
            exercise.date = req.body.date ? Date.parse(req.body.date) : exercise.date;
            console.log(exercise.username);
            exercise.save()
                .then(() => res.json('exercise updated'))
                .catch((err) => res.status(400).json('error: ' + err));
        })
        .catch(err => res.status(400).json('error: ' + err));
});

module.exports = router;