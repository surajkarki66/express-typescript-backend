// eslint-disable-next-line no-shadow
enum Role {
    user = 'user',
    admin = 'admin'
}

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}

export default IUser;
