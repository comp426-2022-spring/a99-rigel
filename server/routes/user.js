import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// function to creat jwt
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'secret', {
    expiresIn: maxAge
  })
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