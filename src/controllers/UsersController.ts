import { Request, Response } from 'express';
import { User, UserModel } from '../models/User';

class UsersController {
    async index(req: Request, res: Response): Promise<void> {
        try {
            const users = await User.find({});
            res.status(200).json({
                data: { users },
                message: 'Usuarios',
                status: 0, // success
            });
        } catch (err) {
            res.status(400).json({
                data: { users: [] },
                message: 'Ocurrio un problema al solicitar los Usuarios',
                status: 1, //fail
                error: err, // optional
            });
        }
    }

    async find(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        try {
            const user = await User.findById(userId);
            res.status(200).json({
                data: { user },
                message: 'Usuario',
                status: 0,
            });
        } catch (err) {
            res.status(400).json({
                data: { user: {} },
                message: 'Ocurrio un problema al solicitar el Usuario',
                status: 1,
                error: err,
            });

            //TODO buscar por Arrayg
            //TODO solicitar a api externa
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const user = await User.create(req.body);
            res.status(200).json({
                data: { user },
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
            const { userId } = req.params;
            const user = await User.findByIdAndUpdate({ _id: userId }, req.body, { new: true });

            if (!user) {
                res.status(404).json({
                    data: { user },
                    message: 'Usuario no encontrado',
                    status: 1,
                });
                return;
            }

            res.status(202).json({
                data: { user },
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
            const { userId } = req.params;
            const user = await User.findByIdAndDelete(userId);

            if (!user) {
                res.status(404).json({
                    data: { user },
                    message: 'Usuario no encontrado',
                    status: 1,
                });
                return;
            }

            res.status(200).json({
                data: { user },
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
