import { UserInterface } from "../Interfaces";
import { embassyDB } from "../utils/db.server";

export const getUserById = async (id: number): Promise<UserInterface> => {
  const user = await embassyDB.users.findUnique({
    where: {
      id: Number(id),
    },
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

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const createUser = async (
  user: UserInterface
): Promise<UserInterface> => {
  return await embassyDB.users.create({
    data: {
      name: user.name,
      surname: user.surname,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      birthPlace: user.birthPlace,
      phoneNumber: user.phoneNumber,
      address: user.address,
      city: user.city,
      country: user.country,
      zip: user.zip,
      passportNumber: user.passportNumber,
      passportExpirationDate: user.passportExpirationDate,
      passportIssuingDate: user.passportIssuingDate,
      passportIssuingCountry: user.passportIssuingCountry,
    },
  });
};

export const updateUser = async (
  id: number,
  user: UserInterface
): Promise<UserInterface> => {
  return await embassyDB.users.update({
    where: {
      id: Number(id),
    },
    data: {
      name: user.name,
      surname: user.surname,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      birthPlace: user.birthPlace,
      phoneNumber: user.phoneNumber,
      address: user.address,
      city: user.city,
      country: user.country,
      zip: user.zip,
      passportNumber: user.passportNumber,
      passportExpirationDate: user.passportExpirationDate,
      passportIssuingDate: user.passportIssuingDate,
      passportIssuingCountry: user.passportIssuingCountry,
    },
  });
};