import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json());// allows us to parse incoming requests:req.body
app.use(cookieParser()); //for parse incoming cookies

// app.get("/", (req, res) => {
//   res.send("Hi there");
// });

app.use("/api/auth",authRoutes)

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

app.listen(PORT, () => {
  connectDB();
  console.log("server is running on the port:",PORT);
});
