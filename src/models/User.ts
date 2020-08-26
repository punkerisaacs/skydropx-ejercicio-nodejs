import { Document, model, Schema, SchemaTimestampsConfig } from 'mongoose';

export interface UserModel extends SchemaTimestampsConfig {
    email: string;
    first_name: string;
    last_name: string;
    company: string;
    url: string;
    text: string;
}

export interface UserDocument extends UserModel, Document {}

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
            transform: (doc: UserDocument, ret: UserModel): UserModel => {
                delete ret.createdAt;
                delete ret.updatedAt;
                return ret;
            },
        },
    }
);

export const User = model<UserDocument>('Users', UserSchema);
