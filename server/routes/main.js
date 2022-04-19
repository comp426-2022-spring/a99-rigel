import { Router } from 'express';
import * as api from './default.js';

const router = Router();

router.get('/', api.index);
router.get('/hello/:name', api.hello);
router.get('/all_users', api.all_users);
router.get('/user/:id', api.user);
router.post('/add_user', api.add_user);
router.get('/all_surveys', api.all_surveys);

export default router;