export interface NewUser {
  firstName: string;
  lastName: string;
  dniNumber: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: 'USER';
}