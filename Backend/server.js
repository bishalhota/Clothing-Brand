const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
app.use(cors());
app.use(express.json());


dotenv.config();

const PORT = process.env.PORT || 3001

connectDB();

app.get("/",(req,res)=>{
    res.send("welcome to becool");
})

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, () =>{
    console.log(`server is running on http://localhost:${PORT}`);
})