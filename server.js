import express from "express";
import  bodyParser from 'body-parser'
import orderRouter from "./src/routes/order.router.js";



const app  = express()

const PORT = 3000;

app.use(bodyParser.json())
app.use("/api", orderRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
