import { Request, Response } from "express";
import { Pool } from "pg";
import "dotenv/config";

const isProd = process.env.NODE_ENV === "prod";

const pool = new Pool({
  user: "user",
  password: "password",
  database: "postgres",
  host: isProd ? "db" : "localhost",
  port: 5432,
});

pool.on("connect", () => {
  console.log("Database connected successfully");
});

export const createProduct = async (req: Request, res: Response) => {
  const { name, price } = req.body;

  await pool.query("INSERT INTO products (name, price) values ($1, $2)", [
    name,
    price,
  ]);

  res.status(201).send({
    message: "Product added successfully",
  });
};

export const listProducts = async (req: Request, res: Response) => {
  const { rows } = await pool.query(
    "SELECT * FROM products ORDER BY id DESC LIMIT 100"
  );

  res.status(200).send({
    products: rows,
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id: productId } = req.params;
  await pool.query("DELETE FROM products WHERE id = $1", [productId]);

  res.status(201).send({
    message: "Product deleted successfully",
  });
};
