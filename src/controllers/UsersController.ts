/* eslint-disable prettier/prettier */
import {Request, Response} from 'express';
import mongoose from 'mongoose';
import fetch from 'node-fetch';

import {User, UserModel} from '../models/User';

const URL = 'https://reqres.in/api/users';

const validate = (id: string | number | mongoose.Types.ObjectId): boolean => {
    let valid = false;
    try {
        if (id == new mongoose.Types.ObjectId('' + id)) valid = true;
    } catch (e) {
        valid = false;
    }
    return valid;
};

class UsersController {
    async index(req: Request, res: Response): Promise<void> {
        try {
            const users: Array<UserModel> = await User.find({});
            res.status(200).json({
                data: {users},
                message: 'Usuarios',
                status: 0, // success
            });
        } catch (err) {
            res.status(400).json({
                data: {users: []},
                message: 'Ocurrio un problema al solicitar los Usuarios',
                status: 1, //fail
                error: err, // optional
            });
        }
    }

    async find(req: Request, res: Response): Promise<void> {
        const {userIds} = req.body;
        try {
            const validUsers = userIds.filter((id: string) => {
                if (validate(id)) {
                    return id;
                }
            });

            const inValidUsers = userIds.filter((id: string) => {
                if (!validate(id)) {
                    return id;
                }
            });

            const users: Array<UserModel> = await User.find({
                _id: {$in: validUsers},
            });

            const inValidPromises = inValidUsers.map((id: string) => {
                return fetch(`${URL}/${id}`);
            });

            const invalidUsers = await Promise.all(inValidPromises);
            const inValidJson = invalidUsers.map((response: any) => {
                return response.json();
            });
            const validJson = await Promise.all(inValidJson);
            const usersExternal = [];
            validJson.map((json: any) => {
                if (json.data) {
                    usersExternal.push({
                        ...json.data,
                        ...json.ad
                    })
                }
            });

            res.status(200).json({
                data: {
                    users,
                    usersExternal,
                },
                message: 'Usuarios',
                status: 0,
            });
        } catch (err) {
            res.status(400).json({
                data: {user: {}},
                message: 'Ocurrio un problema al solicitar el Usuario',
                status: 1,
                error: err,
            });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const user: UserModel = await User.create(req.body);
            res.status(200).json({
                data: {user},
                message: 'Usuario creado',
                status: 0,
            });
        } catch (err) {
            res.status(400).json({
                data: {},
                message: 'Ocurrio un problema al crear el Usuario',
                status: 1,
                error: err,
            });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const {userId} = req.params;
            const user: UserModel = await User.findByIdAndUpdate({_id: userId}, req.body, {new: true});

            if (!user) {
                res.status(404).json({
                    data: {user},
                    message: 'Usuario no encontrado',
                    status: 1,
                });
                return;
            }

            res.status(202).json({
                data: {user},
                message: 'Usuario Actualizado',
                status: 0,
            });
        } catch (err) {
            res.status(400).json({
                data: {},
                message: 'Ocurrio un problema al actualizar el Usuario',
                status: 1,
                error: err,
            });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const {userId} = req.params;
            const user: UserModel = await User.findByIdAndDelete(userId);

            if (!user) {
                res.status(404).json({
                    data: {user},
                    message: 'Usuario no encontrado',
                    status: 1,
                });
                return;
            }

            res.status(200).json({
                data: {user},
                message: 'Usuario eliminado',
                status: 0,
            });
        } catch (err) {
            res.status(400).json({
                data: {},
                message: 'Ocurrio un problema al eliminar el Usuario',
                status: 1,
                error: err,
            });
        }
    }
}

export default UsersController;
