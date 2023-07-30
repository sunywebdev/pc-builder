import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const publicReview = req.body;
		const id = uuidv4();
		publicReview.id = id;

		try {
			const filePath = path.join(process.cwd(), "db", "reviews.json");
			const data = fs.readFileSync(filePath, "utf8");
			const reviews = JSON.parse(data);

			reviews.push(publicReview);
			fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));
			res.status(200).json({ message: "Review added successfully!" });
		} catch (error) {
			console.error("Error reading file:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	} else if (req.method === "GET") {
		const { id } = req.query;

		try {
			const filePath = path.join(process.cwd(), "db", "reviews.json");
			const data = fs.readFileSync(filePath, "utf8");
			const reviews = JSON.parse(data);

			const productReviews = reviews.filter(
				(review) => review.productId.toString() === id,
			);

			console.log(productReviews);

			res.status(200).json({
				message: "Reviews received successfully!",
				data: productReviews,
			});
		} catch (error) {
			console.error("Error reading file:", error);
			res.status(500).json({ message: "Internal server error" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
