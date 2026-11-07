import cors from "cors";
import express, { Request, Response } from "express"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Restaurant Management API is running"
    })
})

export default app;
