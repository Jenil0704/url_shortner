import express from 'express'
import dotenv from 'dotenv';
dotenv.config("./.env");
import connectDB from './src/config/mongo.config.js';
import short_url from './src/routes/short_url.route.js';
import { redirectFromShortUrl } from './src/controllers/short_url.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';
import cors from 'cors';



const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/create',short_url)
app.get("/:id", redirectFromShortUrl)
app.use(errorHandler);

app.listen(5000, () => {
    connectDB();
    console.log('App running on http://localhost:5000');
})