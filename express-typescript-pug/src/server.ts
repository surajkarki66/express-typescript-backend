import App from "./app";
import bodyParser from "body-parser";

import loggerMiddleware from "./middleware/logger";
import HomeController from "./controllers/home.controller";
import PostsController from "./controllers/posts/posts.controller";

const app = new App({
  port: 5000,
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware,
  ],
  controllers: [new HomeController(), new PostsController()],
});

app.listen();
