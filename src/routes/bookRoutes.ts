import { Router } from "express";
import {
    getBooks,
    getBook,
    createBook
} from "../controllers/bookController";
import { create } from "domain";

const router = Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", createBook);

export default router;