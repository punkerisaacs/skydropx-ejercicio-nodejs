import { Router } from 'express';
import UsersController from '../controllers/UsersController';

class UsersRoutes {
    public router: Router = Router({ mergeParams: true });

    constructor() {
        this.config();
    }

    config(): void {
        const usersController = new UsersController();
        this.router.get('/', usersController.index);
        this.router.post('/find', usersController.find);
        this.router.post('/', usersController.create);
        this.router.post('/:userId', usersController.update);
        this.router.delete('/:userId', usersController.delete);
    }
}

export default UsersRoutes;
