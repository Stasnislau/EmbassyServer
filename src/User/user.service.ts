import { Express } from "express";
import { UserInterface } from "../Interfaces";
import { embassyDB } from "../utils/db.server";

export const listUsers = async (): Promise<UserInterface[]> => {
  return await embassyDB.users.findMany({
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
      dateOfBirth: true,
      birthPlace: true,
      phoneNumber: true,
      address: true,
      city: true,
      country: true,
      zip: true,
      passportNumber: true,
      passportExpirationDate: true,
      passportIssuingDate: true,
      passportIssuingCountry: true,
    },
  });
};
