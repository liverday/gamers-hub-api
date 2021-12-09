import { Router } from 'express';
import ensureAuthenticated from '@infra/http/middlewares/ensureAuthenticated';
import FilesController from '../controllers/files.controller';
import multer from 'multer';
import multerConfig from '@config/multer';

const upload = multer({
  storage: multerConfig.storage
})

const router = Router();
const filesController = new FilesController();

router.post('/', 
  ensureAuthenticated, 
  upload.array('uploads'), 
  filesController.create
);

export default router;