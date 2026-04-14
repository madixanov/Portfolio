import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.route.js';
import cvRoutes from './routes/cv.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true,
}
));
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/cv", cvRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})