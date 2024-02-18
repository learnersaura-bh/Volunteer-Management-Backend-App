require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const initialiseDatabase = require('./db/db.connection');

const volunteerRouter = require('./routes/volunteer.route')
const eventRouter = require('./routes/event.route')



initialiseDatabase();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json()); 
app.use(cors()); 
app.use(helmet()); 
app.use('/volunteer', volunteerRouter)
app.use('/event', eventRouter)

app.get("/", (req, res) => {
    res.send("This is Volunteer Management App");
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`App is running on port : ${PORT}`);
});
