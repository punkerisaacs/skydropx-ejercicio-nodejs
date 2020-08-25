import { Request, Response } from 'express';
import { User, UserModel } from '../models/User';

class UsersController {
    async index(req: Request, res: Response): Promise<void> {
        try {
            res.status(404).json({
                data: {},
                message: 'Usuarios no encontrados',
                status: 1,
            });
        } catch (err) {
            res.status(400).json({
                data: {},
                message: 'Ocurrio un problema al solicitar los Usuarios',
                status: 1,
                error: err,
            });
        }
    }

    async find(req: Request, res: Response): Promise<void> {
        try {
            res.status(404).json({
                data: {},
                message: 'Usuario no encontrado',
                status: 1,
            });
        } catch (err) {
            res.status(400).json({
                data: {},
                message: 'Ocurrio un problema al solicitar el Usuario',
                status: 1,
                error: err,
            });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            res.status(404).json({
                data: {},
                message: 'Usuario no creado',
                status: 1,
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
            res.status(404).json({
                data: {},
                message: 'Usuario no actualizado',
                status: 1,
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
            res.status(404).json({
                data: {},
                message: 'Usuario no eliminado',
                status: 1,
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
