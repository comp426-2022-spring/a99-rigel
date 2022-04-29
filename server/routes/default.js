import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


// function to creat jwt
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'secret', {
    expiresIn: maxAge
  })
}

export function index(req, res) {
    res.send('Hello World');
}

export function hello(req, res) {
    const name = req.params.name ?? "world";
    res.send(`hello ${name}!`);
}

// Finds all users in the database
export function all_users(req, res) {
    const user = req.app.get('db').collection('user');
    const cursor = user.find({});
    cursor.toArray().then((result) => {
        res.send(result);
    });
}

// Finds a specific user with id given in params
export function user(req, res) {
    const user = req.app.get('db').collection('user');
    
    if (req.params.id) {
        const result = user.findOne({'user_id': parseInt(req.params.id)}, {projection: {'_id': false}});
        result.then(data => res.send(data));
    }
}

// Adds a user
// Validate user authentication not set up?
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


// Gets surveys that aren't current users
// User id passsed in params
export function certain_surveys(req, res) {
    const survey = req.app.get('db').collection('survey');
    
    if (req.params.userid) {
        const cursor = survey.find({"owner_id" : {$ne: parseInt(req.params.userid)}});
        cursor.toArray().then((result) => {
            res.send(result);
        });
    }

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
        owner_id: parseInt(req.params.userid),
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
        const result = survey.findOne({ 'survey_id': parseInt(req.params.surveyid) }, { projection: { '_id': false } });
        result.then(data => res.send(data));
    }
}

// Finds all the surveys created by a certain user
// The user id is passed in the params
export function user_surveys(req, res) {
    const survey = req.app.get('db').collection('survey');

    if (req.params.userid) {
        //console.log(req.params.userid)
        const cursor = survey.find({ 'owner_id': parseInt(req.params.userid) });
        cursor.toArray().then((result) => {
            res.send(result);
        });
    }
}

// Adds a respone to a particular survey
// The survey id is in the params
export function add_result(req, res) {
    const result = req.app.get('db').collection('result');

    const data = {
        survey_id: parseInt(req.params.surveyid),
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

// All the results for a particular survey
// Survey id passed in params
export function result(req, res) {
    const result = req.app.get('db').collection('result');

    if (req.params.surveyid) {
        //console.log(req.params.surveyid)
        const cursor = result.find({ 'survey_id': parseInt(req.params.surveyid) });
        cursor.toArray().then((result) => {
            res.send(result);
        });
    }
}

// All of the results for all survey
export function all_results(req, res) {
    const result = req.app.get('db').collection('result');
    const cursor = result.find({});
    cursor.toArray().then((result) => {
        res.send(result);
    });
}

// controller actions
export function register_post(req, res){
    const db = req.app.get('db').collection('user');
    const params = req.body;

    const email = params.user_email;
    const username = params.user_name;
    const password = params.user_password;

    const valid = db.findOne( {$or: [{user_email: email}, {user_name: username}]} );
    valid.then(data => {
        if (data) {
            res.status(200).json({message: "Error: your account has already been registered"});
        } else {
            add_user_helper(req, res, db);
        }
    });
}

function add_user_helper(req, res, db) {
    const data = {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_password : req.body.user_password,
        email_verified: true,
        user_info: req.body.user_info,
        user_intro: req.body.user_intro,
    };
    
    db.insertOne(data, (err, resdb) => {
        if (err) res.send({
            status: 'error',
            debug: resdb
        });
        res.status(201).json({ user: user.user_id });
    });
}

export async function login_post(req, res) {
    // console.log(JSON.stringify(req))
    const User = req.app.get('db').collection('user');
    const name = req.body.user_name;
    const password = req.body.user_password;
    
    const user = User.findOne({user_name: name});
    user.then(usr => login(usr, password, res));
}

function login(user, password, res) {
    console.log(user);
    if (user) {
        const auth = password === user.user_password;
        if (auth) {
            const token = createToken(user.user_id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({ user: user.user_id });
        } else {
            res.status(510).json({message: "Nope! Wrong email or password!"});
        }
    } else {
        res.status(510).json({message: "Nope! Wrong email or password!"})
    }
}

