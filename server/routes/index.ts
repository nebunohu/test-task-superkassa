import { Router, Response, Request } from "express";

export const router = Router();

// /api/user/add
router.post("add", async (req: Request, res: Response) => {
    try {

    } catch (e) {
        res.status(500).json('Something went wrong');
    }
});

