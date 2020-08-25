import { Router } from 'express';
import UsersRoutes from './UsersRoutes';

class Routes {
    public router: Router = Router({ mergeParams: true });

    constructor() {
        this.config();
    }

    config(): void {
        const usersRoutes = new UsersRoutes();
        this.router.use('/users', usersRoutes.router);
    }
}

export default Routes;
