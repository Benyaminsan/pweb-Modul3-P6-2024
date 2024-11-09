import { Request, Response, NextFunction } from 'express';
import * as bookService from '../services/book.service';

// Mengambil semua buku
export const getAllBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);// Mengembalikan daftar buku
    } catch (err) {
        next(err); // Menangani error dengan middleware
    }
};

// Mengambil buku berdasarkan ID
export const getBookById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const book = await bookService.getBookById(req.params.id);
        if (!book) {
            res.status(404).json({ error: 'Book not found' });
            return; // Menghentikan eksekusi lebih lanjut
        }
        res.status(200).json(book); // Mengembalikan data buku berdasarkan ID
    } catch (err) {
        next(err); // Menangani error dengan middleware
    }
};

export const addBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const book = await bookService.addBook(req.body); // Memanggil service untuk menambahkan buku
        res.status(200).json({
            status: 'success',
            message: 'Book added successfully',
            data: book,
        });
    } catch (err: any) {
        console.error(err);

        // Menangani error khusus dari service
        if (err.message === 'Initial Qty and Qty should not be 0 or less' || err.message === 'Qty should not be more than Initial Qty') {
            res.status(400).json({
                status: 'error',
                message: err.message,
            });
        } else {
            // Untuk error lain, misalnya masalah pada database atau server
            res.status(500).json({
                status: 'error',
                message: 'An unexpected error occurred',
            });
        }
        
        next(err); // Menangani error dengan middleware
    }
};

export const modifyBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const book = await bookService.modifyBook(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Successfully update book',
            data: book,
        });; // Mengembalikan buku yang telah dimodifikasi
    } catch (err) {
        next(err); // Menangani error dengan middleware
    }
};

export const removeBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await bookService.removeBook(req.params.id);  // Call the service to remove the book
        res.status(200).json({
            status: 'success',
            message: 'Successfully removed the book',
        });
    } catch (err: any) {
        console.error(err);  // Log the error for debugging purposes

        // Specific error handling based on error message
        if (err.message.includes('not found')) {
            res.status(400).json({ 
                status: 'error',
                message: err.message,
            });
        } else {
            // Catch-all for other errors (e.g., DB issues, unexpected server errors)
            res.status(500).json({
                status: 'error',
                message: 'An unexpected error occurred',
            });
        }
        next(err);  // Pass the error to the next middleware (optional, depending on your error handling strategy)
    }
};