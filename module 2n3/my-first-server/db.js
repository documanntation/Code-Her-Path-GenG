import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/toko_online")
  .then(() => {
    console.log("MongoDB connected 🎉");
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
