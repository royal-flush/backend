const express = require('express');
const cors= require('cors');
const app = express();
const { check, validationResult } = require('express-validator/check');

app.use(express.json());
app.use(cors())
const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) res.status(404).send('The course with the given id was not found') //404
    res.send(course);
});

app.post('/api/courses', [check('name').isLength({min: 3})], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //400 Bad Request
        //res.status(422).send('Name is required and should be minimum 3 characters');
        return res.status(422).json({ errors: errors.array() });
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

//PORT
const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Listening on port ${port}...`));
