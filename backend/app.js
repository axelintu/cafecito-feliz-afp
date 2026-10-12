import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.conf.js';
import notFound from './src/middleware/notFound.js';
import errorHandler from './src/middleware/errorHandler.js';

const app = express();

const port = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use(express.json());

await connectDB();

app.get('/api', (req, res) => {
	res.json({ status: 'ok' });
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
