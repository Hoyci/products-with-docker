import express from "express";
import cors from "cors";
import { createProduct, deleteProduct, listProducts } from "./database";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

app.get("/", listProducts);
app.post("/", createProduct);
app.delete("/:id", deleteProduct);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
