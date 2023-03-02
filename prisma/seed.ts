import {
  CredentialsInterface,
  ResidencePermitApplicationsInterface,
  UserInterface,
  VisaApplicationInterface,
  VisitInterface,
} from "../src/Interfaces";

import { prisma } from "../src/utils/db.server";

const getMockUsers = () => {
  const users = [
    {
      name: "Test",
      surname: "Testovich",
      email: "test.testovich@gmail.com",
      dateOfBirth: "01.01.1990",
      birthPlace: "Test City",
      phoneNumber: "+381123456789",
      address: "Test Street 1",
      city: "Test City",
      country: "Test Country",
      zip: "123-45",
      passportNumber: "TS123456",
      passportExpirationDate: "01.01.2025",
      passportIssuingDate: "01.01.2015",
      passportIssuingCountry: "Test Country",
    },
    {
      name: "Steven",
      surname: "Universe",
      email: "crystal.gems@gmail.com",
      dateOfBirth: "02.05.2005",
      birthPlace: "Beach City",
      phoneNumber: "+1871951855",
      address: "Prebeach Street, 1",
      city: "Beach City",
      country: "United States",
      zip: "123-45",
      passportNumber: "SU123456",
      passportExpirationDate: "01.01.2025",
      passportIssuingDate: "01.01.2015",
      passportIssuingCountry: "United States",
    },
  ];
  return users;
};

const getMockVisaApplications = () => {
  const visaApplications = [
    {
      name: "Test",
      surname: "Testovich",
      email: "test.testovich@gmail.com",
      phoneNumber: "+381123456789",
      birthDate: "01.01.1990",
      birthPlace: "Test City",
      address: "Test Street 1",
      city: "Test City",
      country: "Test Country",
      zip: "123-45",
      visaType: "C Tourist",
      visaDuration: "1 year",
      visaDate: "01.01.2021",
      passportNumber: "TS123456",
      passportExpirationDate: "01.01.2025",
      passportIssuingDate: "01.01.2015",
      passportIssuingCountry: "Test Country",
      comments: "Test comment",
      status: "Pending",
    },
    {
      name: "Steven",
      surname: "Universe",
      email: "crystal.gems@gmail.com",
      phoneNumber: "+1871951855",
      birthDate: "02.05.2005",
      birthPlace: "Beach City",
      address: "Prebeach Street, 1",
      city: "Beach City",
      country: "United States",
      zip: "123-45",
      visaType: "D student",
      visaDuration: "1 year",
      visaDate: "01.01.2021",
      passportNumber: "SU123456",
      passportExpirationDate: "01.01.2025",
      passportIssuingDate: "01.01.2015",
      passportIssuingCountry: "United States",
      comments: "Test comment",
      status: "Pending",
    },
  ];
  return visaApplications;
};

const getMockResidencePermitApplications = () => {
  const residencePermitApplications = [
    {
      name: "Test",
      surname: "Testovich",
      email: "test.testovich@gmail.com",
      phoneNumber: "+381123456789",
      birthDate: "01.01.1990",
      birthPlace: "Test City",
      address: "Test Street 1",
      city: "Test City",
      country: "Test Country",
      zip: "123-45",
      residencePermitType: "Work",
      passportNumber: "TS123456",
      passportExpirationDate: "01.01.2025",
      passportIssuingDate: "01.01.2015",
      passportIssuingCountry: "Test Country",
      comments: "Test comment",
      status: "Rejected",
    },
  ];
  return residencePermitApplications;
};

const getMockVisits = () => {
  const visits = [
    {
      date: "01.01.2021",
      time: "12:00",
      location: "Test City",
      description: "Submitting of visa application",
      userId: 1,
    },
    {
      date: "01.01.2021",
      time: "13:00",
      location: "Test City",
      description: "Collecting the visa",
      userId: 2,
    },
  ];
  return visits;
};

const getMockCredentials = () => {
  const credentials = [
    {
      email: "test.testovich@gmail.com",
      password: "enterPlease",
    },
    {
      email: "crystal.gems@gmail.com",
      password: "pinkDiamond",
    },
  ];
  return credentials;
};

async function seed() {
  await Promise.all(
    getMockUsers().map(async (user: UserInterface) => {
      return prisma.users.create({
        data: {
          ...user,
        },
      });
    })
  );
  await Promise.all(
    getMockCredentials().map(async (credential: CredentialsInterface) => {
      const { email, password } = credential;
      return prisma.credentials.create({
        data: {
          password: password,
          user: {
            connect: {
              email: email,
            },
          },
        },
      });
    })
  );

  await Promise.all(
    getMockVisaApplications().map(
      async (visaApplication: VisaApplicationInterface) => {
        return prisma.visaApplications.create({
          data: {
            ...visaApplication,
            user: {
              connect: {
                email: visaApplication.email,
              },
            },
          },
        });
      }
    )
  );

  await Promise.all(
    getMockResidencePermitApplications().map(
      async (
        residencePermitApplication: ResidencePermitApplicationsInterface
      ) => {
        return prisma.residencePermitApplications.create({
          data: {
            ...residencePermitApplication,
            user: {
              connect: {
                email: residencePermitApplication.email,
              },
            },
          },
        });
      }
    )
  );

  await Promise.all(
    getMockVisits().map(async (visit: VisitInterface) => {
      return prisma.visits.create({
        data: visit,
      });
    })
  );
}

seed();
