require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/lib/db');

connectDB();

app.listen(3000, () => {
    console.log("Server running on 3000");
})