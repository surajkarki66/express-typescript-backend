import express from "express";
import { Application } from "express";

class App {
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; middleWares: any }) {
    this.app = express();
    this.port = appInit.port;
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
