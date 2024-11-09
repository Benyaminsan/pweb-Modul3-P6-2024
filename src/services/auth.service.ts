import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.models';

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key'; // Gunakan .env untuk menyimpan SECRET_KEY dengan aman

// Fungsi untuk mendaftar pengguna baru
export const register = async (username: string, email: string, password: string) => {
    // Memeriksa apakah username atau email sudah digunakan
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        throw new Error('User already registered');
    }

    // Mengenkripsi password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Membuat objek user baru
    const newUser = new User({ username, email, password: hashedPassword });
    
    // Menyimpan user baru ke database
    const savedUser = await newUser.save();

    // Mengembalikan data user yang telah terdaftar
    return {
        status: 'success',
        message: 'User registered successfully',
        data: {
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
        },
    };
};

// Fungsi untuk login pengguna
export const login = async (username: string, password: string) => {
    // Mencari user berdasarkan username
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('User not registered');
    }

    // Memverifikasi password menggunakan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }

    // Membuat token JWT dengan durasi 1 jam
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '5h' });

    // Mengembalikan data user dan token
    return {
        status: 'success',
        message: 'Login successful',
        data: {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            token,
        },
    };
};
