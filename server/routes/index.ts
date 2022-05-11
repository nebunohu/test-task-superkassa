import { Router, Response, Request } from "express";
import Phone from '../models/Phone';

export const router = Router();

router.get("/test", async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        res.status(200).json({ message: 'Test', 'req': '123'});
    } catch(e) {
        res.status(500).json('Something went wrong');
    }
})

// /api/user/add
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
        
        res.status(201).json({message: 'Номер сохранен'});

    } catch (e) {
        res.status(400).json({message: 'Something went wrong'});
    }
});

