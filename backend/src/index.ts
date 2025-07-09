import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { connectToDatabase } from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";
import catchErrors from "./utils/catchErrors";
import { OK } from "./constants/https";
import authRoutes from "./routes/auth.route";


const app = express()

// adding middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: APP_ORIGIN,
        credentials: true,
    })
);
app.use(cookieParser());



// checks health of the server like is it running or not......
app.get('/', (req, res, next): void => {
   res.status(OK).json({
    status : "Healthy"
   });
});

// auth routes like after checking the server health pointer comes here...
app.use('/auth',authRoutes);

app.use(errorHandler);

app.listen(PORT,async () => {
    console.log(`Server is running on ${PORT} in ${NODE_ENV} environment`);
    await connectToDatabase();
});