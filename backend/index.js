import dotenv from 'dotenv';
dotenv.config();

import connectToDB from './src/db.js';
connectToDB();
import app from './src/app.js';
 
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})