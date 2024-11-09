import { Book } from '../models/book.models';

export const getAllBooks = async () => {
    // Logika tambahan (misalnya pengecekan login)
    const books = await Book.find();
    
    // Mengembalikan status dan data buku
    return {
        status: 'success',
        message: 'Successfully get all books',
        data: books
    };
};


export const getBookById = async (id: string) => {
    const books = await Book.findById(id);

    // Mengembalikan status dan data buku
    return {
        status: 'success',
        message: 'Successfully get book',
        data: books
    };
};

export const addBook = async (data: any) => {
    try {
        const { initialQty, qty, ...bookData } = data;

        // Validasi qty dan initialQty
        if (qty < 0 || initialQty < 0) {
            throw new Error('Initial Qty and Qty should not be 0 or less');
        }

        if (qty > initialQty) {
            throw new Error('Qty should not be more than Initial Qty');
        }

        // Logika untuk menambahkan buku ke database atau operasi lainnya
        const newBook = await Book.create(bookData); // Misalnya menggunakan ORM
        return newBook;
    } catch (err) {
        throw err; // Meneruskan error agar bisa ditangani oleh controller
    }
};

export const modifyBook = async (id: string, data: any) => {
    return await Book.findByIdAndUpdate(id, data, { new: true });
};

export const removeBook = async (id: string) => {
    try {
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            throw new Error(`Book with id: ${id} not found`);
        }

    } catch (err) {
        // Log the error for internal debugging and rethrow with a more generic message
        console.error(err);
        throw new Error('Failed to remove book');
    }
};