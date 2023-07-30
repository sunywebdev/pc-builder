import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { productId } = req.query;

      const filePath = path.join(process.cwd(), "db", "data.json");
      const data = fs.readFileSync(filePath, "utf8");
      const products = JSON.parse(data);

      const product = products.find(
        (product) => product.id.toString() === productId
      );

      if (!product) {
        res.status(404).json({ message: "Product not found!" });
      }
      const relatedProduct = products
        .filter(
          (related) =>
            related.category === product.category &&
            related.name !== product.name
        )
        .slice(0, 5);

      product.related = relatedProduct;

      res.status(200).json({
        message: "Product retrieved successfully!",
        data: product,
      });
    } catch (error) {
      console.error("Error reading file:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
