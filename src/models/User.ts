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
            required: true,
        },
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // optional
        toJSON: {
            virtuals: true,
        },
    }
);

export const User = model<UserModel>('Users', UserSchema);
