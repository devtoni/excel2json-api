import path from 'path'
import { Router } from 'express'
import { getHome } from '../controllers/homeController';
import { postUpload, getUpload } from '../controllers/uploadController';

const router = Router()

router.get('/', getHome)
router.get('/upload', getUpload)
router.post('/upload', postUpload)

export default router