import  express  from "express";
import config from "config";
import mongoose from "mongoose";
import { router } from "./routes";

const PORT = config.get("port") || 3001;
const app = express();

app.use("/api/users", router)

const start = async () => {
    try {
        await mongoose.connect(config.get("mongoUri"));
    } catch (e: any) {
        console.log(`Server Error ${e.message}`);
        process.exit(1);
    }
    
} 

start();

app.listen(PORT, () => console.log(`Application started on port ${PORT}...`));