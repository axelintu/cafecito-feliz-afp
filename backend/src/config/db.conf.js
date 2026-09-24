import mongoose from "mongoose";
const connectDB = async () => {
	try {
		const dbConnection = await mongoose.connect(
			process.env.MONGODB_URI ||
			"mongodb://localhost:27017/cafecito-pos"
		);
		console.log(`MongoDB connected ${dbConnection.connection.host}`);
	} catch (err) {
		console.error("Error connecting to MongoDB", err);
		process.exit(1);
	}
}

export default connectDB;
