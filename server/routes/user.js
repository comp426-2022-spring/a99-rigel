import bcrypt from 'bcrypt';

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
            res.status(210).json({message: "Error: your account has already been registered"});
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    add_user_helper(req, res, db, hash);
                });
            });
        }
    });
}

function add_user_helper(req, res, db, password) {
    const data = {
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_password : password,
        email_verified: true,
        user_info: req.body.user_info,
        user_intro: req.body.user_intro,
    };
    db.insertOne(data, (err, resdb) => {
        if (err) res.send({
            status: 'error',
            debug: resdb
        });
        res.status(200).json({ status: 'success', msg: { user: resdb.insertedId }});
    });
}

export async function login_post(req, res) {
    const db = req.app.get('db').collection('user');
    const name = req.body.user_name;
    const password = req.body.user_password;
    
    const user = db.findOne({user_name: name});
    user.then(usr => login(usr, password, res));
}

function login(user, password, res) {
    if (user) {
        bcrypt.compare(password, user.user_password, (err, auth) => {
            if (auth) {
                res.status(200).json({ user: user.user_id });
            } else {
                res.status(210).json({message: "Nope! Wrong email or password!"});
            }
        });
    } else {
        res.status(210).json({message: "Nope! Wrong email or password!"})
    }
}

export function delete_user(req, res) {
    const db = req.app.get('db').collection('user');
    db.deleteOne({ user_id: parseInt(req.params.id) }, (err, obj) => {
        if (err) res.send(err);
        res.send({ status: 'success', obj: obj })
    });
}