import { Router } from 'express';
import * as api from './default.js';
import * as dev from './devapi.js';
import * as user from './user.js';

const router = Router();


// user register and login
router.post('/register', user.register_post);
router.post('/login', user.login_post);
router.delete('/user/delete/:id', user.delete_user);
router.get('/user/:id', api.user);

// Surveys not including users
router.get('/home/:userid', api.certain_surveys)

// Surveys for given user
router.get('/surveys/:userid', api.user_surveys)
router.post('/add_survey/:userid', api.add_survey);

// Specific survey data
router.get('/survey/:surveyid', api.survey);
router.post('/add_result/:surveyid', api.add_result);
router.get('/result/:surveyid', api.result);

// development API
router.get('/all_users', dev.all_users);
router.get('/all_surveys', dev.all_surveys);
router.get('/all_results', dev.all_results);
router.get('/log', dev.all_logs);
router.get('/', dev.index);
router.get('/hello/:name', dev.hello);

export default router;

