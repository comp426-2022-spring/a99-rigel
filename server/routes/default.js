import { ObjectId } from 'mongodb';
import * as scheme from './scheme.js';

export function index(req, res) {
    res.send('Hello World');
}

export function hello(req, res) {
    const name = req.params.name ?? "world";
    res.send(`hello ${name}!`);
}

export function all_users(req, res) {
    const user = req.app.get('db').collection('user');
    const cursor = user.find({});
    cursor.toArray().then((result) => {
        res.send(result);
    });
}

export function user(req, res) {
    const user = req.app.get('db').collection('user');

    if (req.params.id) {
        const result = user.findOne({'_id': ObjectId(req.params.id)});
        //console.log(result)
        result.then(data => res.send(data));
    }
}

export function add_user(req, res) {
    const user = req.app.get('db').collection('user');
    if (scheme.validate_user(req.body)) {
        const data = {
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            email_verified: false,
            user_info: req.body.user_info,
            user_intro: "This user doesn't create an introduction."
        };
        user.insertOne(data, (err, resdb) => {
            if (err) res.send({
                status: 'error',
                debug: resdb
            });
            else res.send({
                status: 'sucess',
                result: resdb
            });
        });
    }
}

// Gets all the surveys in the database
export function all_surveys(req, res) {
    const survey = req.app.get('db').collection('survey');
    const cursor = survey.find({});
    cursor.toArray().then((result) => {
        res.send(result);
    });
}

// It adds a survey to the database
// The user id is given in the params
export function add_survey(req, res) {
    const survey = req.app.get('db').collection('survey');
   
    const data = {
        survey_name: req.body.survey_name,
        owner_id: req.params.userid,
        survey_intro: "Please fill out the questions below.",
        questions: req.body.questions
    };
    survey.insertOne(data, (err, resdb) => {
        if (err) res.send({
            status: 'error',
            debug: resdb
        });
        else res.send({
            status: 'sucess',
            result: resdb
        });
    });
}

// Fetches the data for a specific survey
// Survey id is in the params
export function survey(req, res) {
    const survey = req.app.get('db').collection('survey');
    if (req.params.surveyid) {
        const result = survey.findOne({ 'survey_id': ObjectId(req.params.surveyid) });
        result.then(data => res.send(data));
    }
}

// Adds a respone to a particular survey
// The survey id is in the params
export function add_result(req, res) {
    const result = req.app.get('db').collection('result');

    const data = {
        survey_id: req.params.surveyid,
        response_time: new Date(),
        result: req.body.result
    };
    result.insertOne(data, (err, resdb) => {
        if (err) res.send({
            status: 'error',
            debug: resdb
        });
        else res.send({
            status: 'sucess',
            result: resdb
        });
    });
}

// All the responses for a particular survey
// Survey id passed in params
export function result(req, res) {
    const result = req.app.get('db').collection('result');
    if (req.params.surveyid) {
        const result = result.findOne({ 'survey_id': ObjectId(req.params.surveyid) });
        result.then(data => res.send(data));
    }
}