import { CredentialsInterface } from "../Interfaces";
import { embassyDB } from "../utils/db.server";

export const getCredentialsById = async (
  id: number
): Promise<CredentialsInterface> => {
  const credentials = await embassyDB.credentials.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      email: true,
      password: true,
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!credentials) {
    throw new Error("Credentials not found");
  }

  return credentials;
};

export const getCredentialsByEmail = async (
  email: string
): Promise<CredentialsInterface> => {
  const user = await embassyDB.users.findUnique({
    where: {
      email: email,
    },
    select: {
      credentials: {
        select: {
          email: true,
          password: true,
        },
      },
    },
  });
  if (!user || !user.credentials) {
    throw new Error(`No such user`);
  }
  const credentials = {
    email: user.credentials[0].email,
    password: user.credentials[0].password,
  };
  return credentials;
};

export const createCredentials = async (
  credentials: CredentialsInterface
): Promise<CredentialsInterface> => {
  const newCredentials = await embassyDB.credentials.create({
    data: credentials,
  });
  return newCredentials;
};

export const updateCredentials = async (
  id: number,
  credentials: CredentialsInterface
): Promise<CredentialsInterface> => {
  const updatedCredentials = await embassyDB.credentials.update({
    where: {
      id: Number(id),
    },
    data: credentials,
  });
  return updatedCredentials;
};
