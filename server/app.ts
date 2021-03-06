import  express  from "express";
import http from "http";
import { WebSocket, WebSocketServer } from "ws";
import config from "config";
import mongoose from "mongoose";
import { router } from "./routes";
import cors from 'cors';
import Phone from "./models/Phone";

const PORT = process.env.PORT || config.get("port") || 3001;
const app = express();

const server = http.createServer(app);
export let socket: WebSocket | null = null;

export const wsServer = new WebSocketServer({ server });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", router)

const start = async () => {
    try {
        await mongoose.connect(config.get("mongoUri"));

        wsServer.on('connection', async ws => {
            socket = ws;
            ws.on('message', m => {
                console.log('test');
                wsServer.clients.forEach(client => client.send(m));
            });
        
            ws.on("error", e => ws.send(e));
        
            const base = await Phone.find({});
            ws.send(JSON.stringify({result: base}));
         });
        
    } catch (e: any) {
        console.log(`Server Error ${e.message}`);
        process.exit(1);
    }
    
} 

start();
server.listen(PORT , () => console.log(`Application started on port ${PORT}...`));