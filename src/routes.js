import { Router } from 'express';
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import multer from 'multer'
import multerConfig from './config/multer'
import authMiddleware from './app/middlewares/auth'
import ProviderController from './app/controllers/ProviderController';
import AvaliableController from './app/controllers/AvaliableController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
// separar o roteamento
const routes = new Router();
const upload= multer (multerConfig)
routes.post('/users',UserController.store);
routes.post('/login',SessionController.store);

routes.use(authMiddleware)
routes.put('/users',UserController.update);
routes.post('/files',upload.single('file'),FileController.store);
routes.post('/appointments',AppointmentController.store);
routes.get('/providers',ProviderController.index)
routes.get('/providers/:providerId/avaliable',AvaliableController.index)
routes.get('/appointments',AppointmentController.index)
routes.delete('/appointments/:id',AppointmentController.delete)
routes.get('/schedule',ScheduleController.index)
routes.get('/notifications',NotificationController.index)
routes.put('/notifications/:id',NotificationController.update)

export default routes;
