import "dotenv/config";
import express from "express";
import jobsRouter from "./api/jobs";
import { connectDB } from "./persistance/db";
import jobApplicationsRouter from "./api/jobApplications";
import cors from "cors";
import GlobalErrorHandlerMiddleware from "./api/middlewares/global-error-handling-middleware";

const app = express();
app.use(express.json());
app.use(cors()); // Allow any frontend url to call this API.

connectDB();

app.use("/jobs", jobsRouter);
app.use("/jobApplications", jobApplicationsRouter);

app.use(GlobalErrorHandlerMiddleware)

app.listen(process.env.PORT, () => console.log("Server is listening on port ", process.env.PORT));
