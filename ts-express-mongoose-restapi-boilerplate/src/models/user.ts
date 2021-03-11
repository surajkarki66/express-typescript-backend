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
    return await this.find({ email: email });
};

const UserModel: IUserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

export default UserModel;
