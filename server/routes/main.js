import { Router } from 'express';
import * as api from './default.js';
import * as dev from './devapi.js';

const router = Router();

router.get('/', dev.index);
router.get('/hello/:name', dev.hello);
router.get('/all_users', dev.all_users);
router.get('/user/:id', api.user);
router.post('/add_user', api.add_user);

router.get('/all_surveys', dev.all_surveys);
// Surveys not including users
router.get('/home/:userid', api.certain_surveys)
// Surveys for given user
router.get('/surveys/:userid', api.user_surveys)
router.post('/add_survey/:userid', api.add_survey);
// Specific survey data
router.get('/survey/:surveyid', api.survey);

router.post('/add_result/:surveyid', api.add_result);
router.get('/all_results', api.all_results);
// Results for a specific survey
router.get('/result/:surveyid', api.result);

//router.get('/log', api.log);


router.post('/register', api.register_post);
router.post('/login', api.login_post);

export default router;

