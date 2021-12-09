import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.router';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.router';
import postsRouter from '@modules/posts/infra/http/routes/posts.router';
import filesRouter from '@modules/files/infra/http/routes/files.router';

const router = Router();

router.use('/users', usersRouter);
router.use('/sessions', sessionsRouter);
router.use('/posts', postsRouter);
router.use('/files', filesRouter);

export default router;