import { Router } from 'express';
import * as api from './default.js';

const router = Router();

router.get('/', api.index);
router.get('/hello/:name', api.hello);
router.get('/all_users', api.all_users);
router.get('/user/:id', api.user);
router.post('/add_user', api.add_user);

router.get('/all_surveys', api.all_surveys);
router.post('/add_survey/:userid', api.add_survey);
router.get('/survey/:surveyid', api.survey);

router.post('/add_result/:surveyid', api.add_result);
router.get('/all_results', api.all_results);
router.get('/result/:surveyid', api.result);

export default router;