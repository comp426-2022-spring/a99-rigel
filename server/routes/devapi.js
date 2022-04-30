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
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
    });
}

// Gets all the surveys in the database
export function all_surveys(req, res) {
    const survey = req.app.get('db').collection('survey');
    const cursor = survey.find({});
    cursor.toArray().then((result) => {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
    });
}

// All of the results for all survey
export function all_results(req, res) {
    const result = req.app.get('db').collection('result');
    const cursor = result.find({});
    cursor.toArray().then((result) => {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
    });
}

// All of the results for all survey
export function all_logs(req, res) {
    const result = req.app.get('db').collection('log');
    const cursor = result.find({});
    cursor.toArray().then((result) => {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(result, null, 4));
    });
}