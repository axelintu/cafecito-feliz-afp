import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { STATUS_CODES } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const errorHandler = (err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}

	if (err.type === 'entity.parse.failed') {
		return res.status(400).json({
			error: 'Invalid JSON',
			message: 'The request body is not valid JSON'
		});
	}

	const status = err.status || err.statusCode || 500;

	if (status < 500) {
		return res.status(status).json({
			error: STATUS_CODES[status],
			message: err.message
		});
	}

	const logFilePath = path.join(__dirname, '../../logs/error.log');
	const dateTime = new Date().toISOString();
	const logMessage = `${dateTime} | ${req.method} | ${req.originalUrl}`
		+ ` | ${err.message} | ${err.stack}\n`;
	const logDir = path.dirname(logFilePath);

	if (!fs.existsSync(logDir)) {
		fs.mkdirSync(logDir, { recursive: true });
	}

	fs.appendFile(logFilePath, logMessage, (fsErr) => {
		if (fsErr) {
			console.error('Failed to write into log file: ', fsErr);
		}
	});

	console.error(logMessage);

	res.status(500).json({
		error: 'Internal server error',
		message: 'Something went wrong, try again later'
	});
};

export default errorHandler;
