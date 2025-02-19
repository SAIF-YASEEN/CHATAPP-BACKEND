dotenv.config();
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://chatapp-delta-rouge.vercel.app/",
    credentials: true,
  })
);

app.use(
  cors({
    origin: "https://chatapp-delta-rouge.vercel.app/", // Frontend URL
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"], // Allow Authorization header
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/test", (req, res) => {
  res.send("test page working showing that");
});
app.get("/", (req, res) => {
  res.send("main page working showing that");
});
server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
