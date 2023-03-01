export interface VisaApplicationInterface {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  visaType: string;
  visaDuration: string;
  visaDate: string;
  passportNumber: string;
  passportExpirationDate: string;
  passportIssuingDate: string;
  passportIssuingCountry: string;
  comments: string;
  status: string;
}

export interface ResidencePermitApplicationsInterface {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  residencePermitType: string;
  passportNumber: string;
  passportExpirationDate: string;
  passportIssuingDate: string;
  passportIssuingCountry: string;
  comments: string;
  status: string;
}

export interface UserInterface {
  name: string;
  surname: string;
  email: string;
  dateOfBirth: string;
  birthPlace: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  passportNumber: string;
  passportExpirationDate: string;
  passportIssuingDate: string;
  passportIssuingCountry: string;
}

export interface VisitInterface {
  date: string;
  time: string;
  location: string;
  description: string;
  userId: number;
}

export interface CredentialsInterface {
  email: string;
  password: string;
}
