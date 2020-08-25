import { Router } from 'express';
import UsersController from '../controllers/UsersController';

class UsersRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        const usersController = new UsersController();
        this.router.get('/users', usersController.index);
        this.router.get('/users/:userId', usersController.find);
        this.router.post('/users', usersController.create);
        this.router.post('/users/:userId', usersController.update);
        this.router.delete('/users', usersController.delete);
    }
}

export default UsersRoutes;
