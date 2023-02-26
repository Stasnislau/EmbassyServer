import express, { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.post("/users", async (req: Request, res: Response) => {
  const {
    name,
    surname,
    email,
    dateOfBirth,
    phoneNumber,
    address,
    city,
    country,
    zipCode,
    passportNumber,
    passportExpirationDate,
    passportIssuingCountry,
  } = req.body;
  const user = await prisma.users.create({
    data: {
      name: name,
      surname: surname,
      email: email,
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber,
      address: address,
      city: city,
      country: country,
      zipCode: zipCode,
      passportNumber: passportNumber,
      passportExpirationDate: passportExpirationDate,
      passportIssuingCountry: passportIssuingCountry,
    },
  });
  res.json(user);
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.users.findMany();
  res.json(users);
});

app.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.users.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(user);
});

app.put("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    surname,
    email,
    dateOfBirth,
    phoneNumber,
    address,
    city,
    country,
    zipCode,
    passportNumber,
    passportExpirationDate,
    passportIssuingCountry,
  } = req.body;
  const user = await prisma.users.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name,
      surname: surname,
      email: email,
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber,
      address: address,
      city: city,
      country: country,
      zipCode: zipCode,
      passportNumber: passportNumber,
      passportExpirationDate: passportExpirationDate,
      passportIssuingCountry: passportIssuingCountry,
    },
  });
  res.json(user);
});


app.get("/credentials:email", async (req: Request, res: Response) => {
  const email = req.params.email;
  const user = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });
  res.json(user);
});

app.post("/credentials", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.users.create({
    data: {
      email: email,
      password: password,
    },
  });
  res.json(user);
});
