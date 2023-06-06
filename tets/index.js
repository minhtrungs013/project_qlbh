import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();


// routes
import AuthRoute from './routers/AuthRoute.js'
import UserRoute from './routers/UserRoute.js'
import PostRoute from './routers/PostRoute.js'
import ChatRoute from './routers/ChatRoute.js'
import MessageRoute from './routers/MessageRoute.js'
import UploadRoute from './routers/UploadRoute.js'
import ProductRoute from './routers/ProductRoute.js'

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));

dotenv.config();
const PORT = process.env.PORT;

const CONNECTION =process.env.MONGODB_CONNECTION;
mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

app.use('/auth', AuthRoute);
app.use('/user', UserRoute)
app.use('/posts', PostRoute)
app.use('/chat', ChatRoute)
app.use('/message', MessageRoute)
app.use('/upload', UploadRoute)
app.use('/product', ProductRoute)