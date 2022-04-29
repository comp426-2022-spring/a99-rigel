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

// Gets all the surveys in the database
export function all_surveys(req, res) {
    const survey = req.app.get('db').collection('survey');
    const cursor = survey.find({});
    cursor.toArray().then((result) => {
        res.send(result);
    });
}