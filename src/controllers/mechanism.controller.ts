import { Request, Response, NextFunction } from 'express';
import * as mechanismService from '../services/mechanism.service';

// Fungsi untuk meminjam buku
export const borrowBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await mechanismService.borrowBook(req.body.id);
        res.json(book); // Mengembalikan buku yang dipinjam
    } catch (err) {
        next(err); // Menangani error jika terjadi masalah
    }
};

// Fungsi untuk mengembalikan buku
export const returnBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const book = await mechanismService.returnBook(req.body.id);
        res.json(book); // Mengembalikan buku yang telah dikembalikan
    } catch (err) {
        next(err); // Menangani error jika terjadi masalah
    }
};

// Fungsi untuk cek status kesehatan
export const healthCheck = (req: Request, res: Response) => {
    res.json({
        "status": 'success',
        "message": 'Hello World!',
        "date": "Thu Nov 07 2024"
    }); // Menyediakan status kesehatan sistem
};
