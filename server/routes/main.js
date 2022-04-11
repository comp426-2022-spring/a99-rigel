import { Router } from 'express';
import { index, hello, all_users } from './default.js';

const router = Router();

router.get('/', index);
router.get('/hello/:name', hello);
router.get('/users', all_users);

export default router;