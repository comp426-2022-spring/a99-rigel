function index(req, res) {
    res.send('Hello World');
}

function hello(req, res) {
    const name = req.params.name ?? "world";
    res.send(`hello ${name}!`);
}

function all_users(req, res) {
    const cursor = req.app.get('db').collection('user').find({}, {projection: {'_id': false}});
    cursor.toArray().then((result) => {
        res.send(result);
    });
}

export { index, hello, all_users };