require('dotenv').config();
const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("This is Volunteer Management App");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`App is running on port : ${PORT}`);
});
