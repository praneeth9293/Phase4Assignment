import { User } from "./app/shared/models/User";

export const users: User[] = [
    {
        id: "001",
        username: 'praneeth',
        name: 'Praneeth',
        isAdmin: false,
        password: '1234'
    },
    {
        id: "002",
        username: 'admin',
        name: 'Admin',
        isAdmin: true,
        password: 'admin'
    }
]