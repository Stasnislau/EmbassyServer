import express, { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.post("/users", async (req: Request, res: Response) => {
  const { name } = req.body;
  const user = await prisma.user.create({
    data: {
      name,
    },
  });
  res.json(user);
});
