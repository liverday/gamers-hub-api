import { Router } from 'express';
import ensureAuthenticated from '@infra/http/middlewares/ensureAuthenticated';;

import PostsController from '@modules/posts/infra/http/controllers/posts.controller';

const router = Router();

const postsController = new PostsController();

router.use(ensureAuthenticated)

router.post('/', postsController.create);
router.get('/', postsController.index)

export default router;