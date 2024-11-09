require('dotenv').config();

import express from 'express';
import { connectDB } from './db-connection';
import { authenticateToken } from './middleware/auth';
import * as authController from './controllers/auth.controller';
import * as bookController from './controllers/book.controller';
import * as mechanismController from './controllers/mechanism.controller';

const app = express();
app.use(express.json());

connectDB();

app.post('/auth/register', authController.registerUser);
app.post('/auth/login', authController.loginUser);

app.get('/book', authenticateToken, bookController.getAllBooks);
app.get('/book/:id', authenticateToken, bookController.getBookById);
app.post('/book', authenticateToken, bookController.addBook);
app.patch('/book/:id', authenticateToken, bookController.modifyBook);
app.delete('/book/:id', authenticateToken, bookController.removeBook);

app.post('/mechanism/borrow/:id', authenticateToken, mechanismController.borrowBook);
app.post('/mechanism/return/:id', authenticateToken, mechanismController.returnBook);
app.get('/', mechanismController.healthCheck);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express is running on Port ${PORT}`);
});