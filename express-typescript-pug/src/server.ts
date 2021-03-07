import App from "./app";
import bodyParser from "body-parser";

const app = new App({
  port: 5000,
  middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true })],
});

app.listen();
