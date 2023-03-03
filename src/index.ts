import * as dotenv from "dotenv";

import {
  CredentialsInterface,
  ResidencePermitApplicationsInterface,
  UserInterface,
  VisaApplicationInterface,
  VisitInterface,
} from "./Interfaces";
import express, { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { userRouter } from "./User/user.router";
import { visaApplicationRouter } from "./VisaApplication/visaApplication.router";
import { visitRouter } from "./Visit/visit.router";

dotenv.config();
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient();

app.listen(PORT, () => {
  console.log("Server is running on port 3001");
});

app.use("/users", userRouter);
app.use("/visits", visitRouter);
app.use("/visa-applications", visaApplicationRouter);

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
  const userCredentials = (await prisma.credentials.create({
    data: {
      email: email,
      password: password,
      user: {
        connect: {
          email: email,
        },
      },
    },
  })) as CredentialsInterface;
  res.json(userCredentials);
});

app.put("/credentials/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, password } = req.body;
  const userCredentials = await prisma.credentials.update({
    where: {
      id: Number(id),
    },
    data: {
      email: email,
      password: password,
    },
  });
  res.json(userCredentials);
});

app.get("/visa-applications/users/:accountId", async (req: Request, res: Response) => {
  const accountId = req.params.accountId;
  const visaApplications = await prisma.visaApplications.findMany({
    where: {
      userId: Number(accountId),
    },
  });
  res.json(visaApplications);
});

app.get("/visa-applications/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const visaApplication = await prisma.visaApplications.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(visaApplication);
});

app.get(
  "/residence-applications:accountId",
  async (req: Request, res: Response) => {
    const accountId = req.params.accountId;
    const residenceApplications =
      await prisma.residencePermitApplications.findMany({
        where: {
          userId: Number(accountId),
        },
      });
    res.json(residenceApplications);
  }
);

app.post("/residence-applications", async (req: Request, res: Response) => {
  const {
    name,
    surname,
    email,
    phoneNumber,
    birthDate,
    birthPlace,
    address,
    city,
    zip,
    country,
    residencePermitType,
    passportNumber,
    passportExpirationDate,
    passportIssuingDate,
    passportIssuingCountry,
    comments,
    status,
  } = req.body as ResidencePermitApplicationsInterface;
  const userId = req.params.userId;
  const residenceApplication = await prisma.residencePermitApplications.create({
    data: {
      name: name,
      surname: surname,
      email: email,
      phoneNumber: phoneNumber,
      birthDate: birthDate,
      birthPlace: birthPlace,
      address: address,
      city: city,
      zip: zip,
      country: country,
      residencePermitType: residencePermitType,
      passportNumber: passportNumber,
      passportExpirationDate: passportExpirationDate,
      passportIssuingDate: passportIssuingDate,
      passportIssuingCountry: passportIssuingCountry,
      comments: comments,
      status: status,
      user: {
        connect: {
          id: Number(userId),
        },
      },
    },
  });
});

app.get("/residence-applications/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const residenceApplication =
    await prisma.residencePermitApplications.findUnique({
      where: {
        id: Number(id),
      },
    });
  res.json(residenceApplication);
});
