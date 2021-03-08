import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../interfaces/IControllerBase.interface";

class HomeController implements IControllerBase {
  public path = "/";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/", this.index);
  }

  index = (req: Request, res: Response) => {
    const users = [
      {
        id: 1,
        name: "Tony Stark",
      },
      {
        id: 2,
        name: "Pepper Pots",
      },
      {
        id: 3,
        name: "Don Cheadle",
      },
    ];

    res.render("home/index", { users });
  };
}

export default HomeController;
