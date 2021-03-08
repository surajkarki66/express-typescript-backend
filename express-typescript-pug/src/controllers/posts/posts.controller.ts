import * as express from "express";
import { Request, Response } from "express";

import IPost from "./post.interface";
import IControllerBase from "interfaces/IControllerBase.interface";

class PostsController implements IControllerBase {
  public path = "/posts";
  public router = express.Router();

  private posts: IPost[] = [
    {
      id: 1,
      author: "Ali GOREN",
      content: "This is an example post",
      title: "Hello world!",
    },
  ];

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path + "/:id", this.getPost);
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, this.createPost);
  }

  getPost = (req: Request, res: Response) => {
    const id = +req.params.id;
    let result = this.posts.find((post) => post.id == id);

    if (!result) {
      res.status(404).send({
        error: "Post not found!",
      });
    }

    res.render("posts/index", result);
  };

  getAllPosts = (req: Request, res: Response) => {
    res.send(this.posts);
  };

  createPost = (req: Request, res: Response) => {
    const post: IPost = req.body;
    this.posts.push(post);
    res.send(this.posts);
  };
}

export default PostsController;
