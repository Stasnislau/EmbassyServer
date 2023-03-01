import { CredentialsInterface, UserInterface, VisaApplicationInterface, VisitInterface, residencePermitApplicationsInterface } from "./Interfaces";
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
    birthPlace,
    phoneNumber,
    address,
    city,
    country,
    zip,
    passportNumber,
    passportExpirationDate,
    passportIssuingDate,
    passportIssuingCountry,
  } = req.body;
  const user = await prisma.users.create({
    data: {
      name: name,
      surname: surname,
      email: email,
      dateOfBirth: dateOfBirth,
      birthPlace: birthPlace,
      phoneNumber: phoneNumber,
      address: address,
      city: city,
      country: country,
      zip: zip,
      passportNumber: passportNumber,
      passportExpirationDate: passportExpirationDate,
      passportIssuingDate: passportIssuingDate,
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
    birthPlace,
    phoneNumber,
    address,
    city,
    country,
    zip,
    passportNumber,
    passportExpirationDate,
    passportIssuingDate,
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
      birthPlace: birthPlace,
      phoneNumber: phoneNumber,
      address: address,
      city: city,
      country: country,
      zip: zip,
      passportNumber: passportNumber,
      passportExpirationDate: passportExpirationDate,
      passportIssuingDate: passportIssuingDate,
      passportIssuingCountry: passportIssuingCountry,
    },
  }) as UserInterface;
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
  const userCredentials = await prisma.credentials.create({
    data: {
      email: email,
      password: password,
      user: {
        connect: {
          email: email,
        },
      },
    },
  }) as CredentialsInterface;
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

app.post("/visits:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { date, time, location, description } = req.body;
  const visit = await prisma.visits.create({
    data: {
      date: date,
      time: time,
      location: location,
      description: description,
      user: {
        connect: {
          id: Number(userId),
        },
      },
    },
  }) as VisitInterface;
  res.json(visit);
});

app.get("/visits:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const visits = await prisma.visits.findMany({
    where: {
      userId: Number(userId),
    },
  });
  res.json(visits);
});

app.get("/visits/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const visit = await prisma.visits.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(visit);
});

app.post(
  "/visa-applications:accountId",
  async (req: Request, res: Response) => {
    const accountId = req.params.accountId;
    const {
      name,
      surname,
      email,
      birthDate,
      birthPlace,
      phoneNumber,
      address,
      city,
      zip,
      country,
      passportNumber,
      passportExpirationDate,
      passportIssuingDate,
      passportIssuingCountry,
      visaType,
      visaDuration,
      visaDate,
      comments,
      status,
    } = req.body;
    const visaApplication = await prisma.visaApplications.create({
      data: {
        name: name,
        surname: surname,
        email: email,
        birthDate: birthDate,
        birthPlace: birthPlace,
        phoneNumber: phoneNumber,
        address: address,
        city: city,
        zip: zip,
        country: country,
        passportNumber: passportNumber,
        passportExpirationDate: passportExpirationDate,
        passportIssuingDate: passportIssuingDate,
        passportIssuingCountry: passportIssuingCountry,
        visaType: visaType,
        visaDuration: visaDuration,
        visaDate: visaDate,
        comments: comments,
        userId: Number(accountId),
        status: status,
        user: {
          connect: {
            id: Number(accountId),
          },
        },
      } as VisaApplicationInterface,
    });
    res.json(visaApplication);
  }
);

app.get("/visa-applications:accountId", async (req: Request, res: Response) => {
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
    userId,
    status,
  } = req.body;
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
      userId: Number(userId),
      status: status,
      user: {
        connect: {
          id: Number(userId),
        },
      },
    } as residencePermitApplicationsInterface,
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
