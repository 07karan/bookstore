import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import serviceRoute from "./route/service.route.js";
import { connection } from "./database/database.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;

app.use("/api/book", bookRoute);
app.use("/api/user", userRoute);
app.use("/api", serviceRoute);

connection();

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});