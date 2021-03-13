import mongoose, { Schema } from 'mongoose';

import { IUserDocument, IUserModel, Gender } from '../interfaces/user';

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: Object.values(Gender) },
    address: {
        street: { type: String },
        city: { type: String },
        postCode: { type: String }
    },
    preferences: [{ type: String }]
});

// Static methods
UserSchema.statics.findByEmail = async function (email) {
    return await this.findOne({ email: email });
};

UserSchema.statics.getAllUsers = async function () {
    return await this.find({});
};

UserSchema.statics.findByFirstName = async function (firstName: string) {
    return await this.find({ firstName: new RegExp(firstName, 'i') });
};

// Virtual
UserSchema.virtual('fullName').get(function (this: { firstName: string; lastName: string }) {
    return this.firstName + ' ' + this.lastName;
});

const UserModel: IUserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

export default UserModel;
