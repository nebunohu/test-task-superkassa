import { Router, Response, Request } from "express";
import Phone from '../models/Phone';
import { socket } from "../app";

export const router = Router();

router.get("/test", async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        res.status(200).json({ message: 'Test', 'req': '123'});
    } catch(e) {
        res.status(500).json('Something went wrong');
    }
})

// /api/users/get-phones
router.get("/get-phones", async (req: Request, res: Response) => {
    try {
        const findResuls = await Phone.find({});
        res.status(200).json({ result: findResuls });
    } catch (e) {
        res.status(400).json({ message: 'Something went wrong'});
    }
});

// /api/users/add
router.post("/add", async (req: Request, res: Response) => {
    try {
        const { phone } = req.body;
        
        const candidate = await Phone.findOne({phone});
        
        if (candidate) {
            res.status(400).json({ message: 'Такой номер уже существует'});
            return;
        }

        const note = new Phone({phone});

        await note.save();

        const result = await Phone.find({});
        if (socket) {
            //console.log(JSON.stringify({result}));
            socket.send(JSON.stringify({result}));
        }
        
        
        
        res.status(201).json({message: 'Номер сохранен'});

    } catch (e) {
        res.status(400).json({message: 'Something went wrong'});
    }
});

