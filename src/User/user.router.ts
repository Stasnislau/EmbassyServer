import * as userService from "./user.service";

import { body, validationResult } from "express-validator";
import express, { Request, Response } from "express";

export const userRouter = express.Router();

userRouter.get("/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await userService.getUserById(Number(id));
  res.json(user);
});

userRouter.post("/users", async (req: Request, res: Response) => {
  const Errors = validationResult(req);
  if (!Errors.isEmpty()) {
    return res.status(400).json({ errors: Errors.array() });
  }
  try {
    const user = await userService.createUser(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

userRouter.put("/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await userService.updateUser(Number(id), req.body);
  const Errors = validationResult(req);
  if (!Errors.isEmpty()) {
    return res.status(400).json({ errors: Errors.array() });
  }
  try {
    const user = await userService.updateUser(Number(id), req.body);
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }

  res.json(user);
});
