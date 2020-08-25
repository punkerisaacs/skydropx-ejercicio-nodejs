import { Document, model, Schema } from 'mongoose';

export interface UserModel extends Document {
    email: string;
    first_name: string;
    last_name: string;
    company: string;
    url: string;
    text: string;
}

export const UserSchema = new Schema(
    {
        email: {
            type: String,
        },
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        company: {
            type: String,
        },
        url: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    {
        timestamps: true, // optional
        toJSON: {
            virtuals: true,
        },
    }
);

export const User = model<UserModel>('account_user_profiles', UserSchema);
