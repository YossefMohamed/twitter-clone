import { Router } from "express";
import { postRouter } from "./posts";

const router = Router();

router.use("/", postRouter);

export { router as ApiRouter };
