import type { Request, Response } from "express"; 
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

// GET ALL BOOKS
export async function getBooks(req: Request, res: Response) {
  try{
    const books = await prisma.book.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
}

// GET ALL DETAIL
export async function getBook(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(id) },
    });
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book" });
  }
};

// CREATE NEW BOOK
export async function createBook(req: Request, res: Response) {
  const { title, author } = req.body;
  try {
    const book = await prisma.book.create({
      data: { title, author },
    });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: "Failed to create book" });
  }
}

// Update book
export async function updateBook(req: Request, res: Response) {
  const { id } = req.params;
  const { title, author } = req.body;
  try {
    const book = await prisma.book.update({
      where: { id: Number(id) },
      data: { title, author },
    });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Failed to update book" });
  }
}

// Delete book
export async function deleteBook(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await prisma.book.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete book" });
  }
}