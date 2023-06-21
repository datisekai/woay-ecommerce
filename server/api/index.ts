import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import UserRoute from '../src/routes/user.route'
import InfoRoute from '../src/routes/info.route'
import CategoryRoute from '../src/routes/category.route'
import ProductRoute from '../src/routes/product.route'
import SizeRoute from '../src/routes/size.route'
import ColorRoute from '../src/routes/color.route'
import BlogRoute from '../src/routes/blog.route'
import PostRoute from '../src/routes/post.route'
import RateRoute from '../src/routes/rate.route'
import OrderRoute from '../src/routes/order.route'
import StatisticRoute from '../src/routes/statistic.route'

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json())

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Server datisekai is running....");
});


app.use('/user', UserRoute)
app.use('/info', InfoRoute)
app.use('/category', CategoryRoute)
app.use('/product', ProductRoute)
app.use('/color', ColorRoute)
app.use('/size', SizeRoute)
app.use('/blog', BlogRoute)
app.use('/post', PostRoute)
app.use('/rate', RateRoute)
app.use('/order', OrderRoute)
app.use('/statistic', StatisticRoute)


const PORT = process.env.PORT || 6060;

app.listen(PORT, () => {
  console.log("Server running...." + PORT);
});