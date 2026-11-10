import cors from "cors";
import express, { Request, Response } from "express"
import categoryRoutes from "./routes/category.routes";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/categories", categoryRoutes);

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Restaurant Management API is running"
    })
});

// Handle unknown routes
app.use(notFoundHandler);

// Handle application errors
app.use(errorHandler);

export default app;
