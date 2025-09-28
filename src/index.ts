import express from "express";
import bookRoutes from "./routes/bookRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Is Running");
});

app.use("/api/books", bookRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`1Server running at http://localhost:${PORT}`);
});
