import mongoose, { Schema, Document } from 'mongoose';

// Rating subdocument schema
const ratingSchema = new mongoose.Schema({
    average: { type: Number },
    count: { type: Number },
});

// Define the Book document interface
export interface IBook extends Document {
    title: string;
    author: string;
    publishedDate: Date;
    publisher: string;
    description: string;
    coverImage: string;
    tags: string[];
    initialQty: number;
    qty: number;
    available: boolean;  // Added `available` field
    rating: {
        average?: number;
        count?: number;
    };
}

// Book schema definition
const bookSchema = new mongoose.Schema<IBook>({
    title: { type: String },
    author: { type: String },
    publishedDate: { type: Date },
    publisher: { type: String },
    description: { type: String },
    coverImage: { type: String },
    tags: { type: [String] },
    initialQty: { type: Number, default: 0 },
    qty: { type: Number, default: 0 },
    available: { type: Boolean, default: true },  // New `available` field
    rating: ratingSchema,
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt
});

// Create and export the Book model with the type
export const Book = mongoose.model<IBook>('Book', bookSchema);
