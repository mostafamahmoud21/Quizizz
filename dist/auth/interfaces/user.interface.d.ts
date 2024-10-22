import { Role } from '../enums/roles.enum';
export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
}
