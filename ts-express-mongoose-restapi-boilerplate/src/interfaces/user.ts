import { Document, Model } from 'mongoose';

export enum Gender {
    male = 'male',
    female = 'female',
    undisclosed = 'undisclosed'
}

interface IAddress extends Document {
    street: string;
    city: string;
    postCode: string;
}

export interface IUserDocument extends Document {
    // This contains schema and instance methods
    email: string;
    firstName: string;
    lastName: string;
    gender?: Gender;
    address?: IAddress; // Single sub documents
    preferences?: string[]; // Array of string
}
export interface IUserModel extends Model<IUserDocument> {
    // Declare any static methods here
    findByEmail: (email: string) => Promise<Document>;
}
