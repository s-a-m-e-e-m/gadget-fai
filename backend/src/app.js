import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRouter from "./routes/user.routes.js";
import gadgetRouter from "./routes/gadget.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.get('/', (req, res) => {
  res.send('Server is running');
});

// API Routes
app.use('/api/user', userRouter);
app.use('/api/gadget', gadgetRouter);

export default app;