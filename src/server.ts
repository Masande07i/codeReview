import express from "express";
import dotenv from "dotenv";
import { testDbConnection } from "./config/database";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import projectRoutes from "./routes/projectRoutes";
import projectMemberRoutes from "./routes/projectMemberRoutes";
import submissionRoutes from "./routes/submissionRoutes";
import commentRoutes from "./routes/commentsRoutes";    


dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await testDbConnection();
    app.use(express.json());
    app.use('/api/auth', authRoutes )
    app.use("/api", userRoutes);
    app.use("/api", projectRoutes);
    app.use("/api", projectMemberRoutes);
    app.use("/api", submissionRoutes);
    app.use("/api", commentRoutes);
   

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`)
    })
}
startServer()