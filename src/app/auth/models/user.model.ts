import { Role } from "./role.enum";

export interface User {
  id?: number; 
  firstName: string;
  lastName: string;
  displayName?: string;
  dniNumber: string;
  phoneNumber: string;
  province: number;
  email: string;
  password: string;
  role: Role;
  createdBy?: number;
}