import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

const port = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL }));

app.use(express.json());

app.get("/api", (req, res) => {
	res.json({ status: "ok" });
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
