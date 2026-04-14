import { supabase } from '../lib/supabaseClient.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { generateToken } from '../services/generateToken.js';

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        const { data: existingUser } = await supabase.from('User').select('*').eq('email', email).single();

        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase.from('User').insert({
            email,
            password: hashedPassword,
        })
        .select().single();

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(201).json({ message: 'User registered successfully', user: {id: data.id, email: data.email} });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const { data: user } = await supabase.from('User').select('*').eq('email', email).single();
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const tokens = generateToken(user);

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ message: 'Login successful', accessToken: tokens.accessToken });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'Internal server error', errorDetails: error.message });
    }
}

export const refresh = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            return res.status(401).json({ error: 'No refresh token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        const newAccessToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '15m' });

        return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(401).json({ error: 'Invalid refresh token' });
    }
}