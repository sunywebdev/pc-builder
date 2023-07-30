import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const filePath = path.join(process.cwd(), "db", "data.json");
      const data = fs.readFileSync(filePath, "utf8");
      const products = JSON.parse(data);

      res.status(200).json({
        message: "Products retrieved successfully!",
        data: products
          .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
          .slice(0, 20),
      });
    } catch (error) {
      console.error("Error reading file:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
