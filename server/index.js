import express from "express";
import cors from "cors";
import activitiesRoutes from "./routes/activities.js";
import donationsRoutes from "./routes/donations.js";
import authRoutes from "./routes/auth.js";
import hygieneRoutes from "./routes/hygiene.js";
import resourcesRoutes from "./routes/resources.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/activities", activitiesRoutes);
app.use("/api/donations", donationsRoutes);
app.use("/api/hygiene", hygieneRoutes);
app.use("/api/resources", resourcesRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));