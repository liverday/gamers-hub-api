import { Router } from 'express';
import SessionsController from '../controllers/sessions.controller';

const sessionsController = new SessionsController();

const router = Router();

router.post('/', sessionsController.create);

export default router;