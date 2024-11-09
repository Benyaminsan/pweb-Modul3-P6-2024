import { Book } from '../models/book.models';

export const borrowBook = async (id: string) => {
    // Find the book by ID
    const book = await Book.findById(id);
    
    // Check if the book exists and is available
    if (!book || !book.available) throw new Error('Book not available');
    
    // Set the book as unavailable
    book.available = false;
    
    // Save the updated book document
    return await book.save();
};

export const returnBook = async (id: string) => {
    // Find the book by ID
    const book = await Book.findById(id);
    
    // Check if the book exists
    if (!book) throw new Error('Book not found');
    
    // Set the book as available again
    book.available = true;
    
    // Save the updated book document
    return await book.save();
};
