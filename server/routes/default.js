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
    const cursor = user.find({}, {projection: {'_id': false}});
    cursor.toArray().then((result) => {
        res.send(result);
    });
}

export function user(req, res) {
    const user = req.app.get('db').collection('user');
    if (req.params.id) {
        const result = user.findOne({'user_id': req.params.id}, {projection: {'_id': false}});
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
export function all_surveys(req, res) {
    const survey = req.app.get('db').collection('survey');
    const cursor = survey.find({}, { projection: { '_id': false } });
    cursor.toArray().then((result) => {
        res.send(result);
    });
}