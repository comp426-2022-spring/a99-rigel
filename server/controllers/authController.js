const jwt = require('jsonwebtoken');

// function to creat jwt
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'secret', {
    expiresIn: maxAge
  })
}

// controller actions
module.exports.register_get = (req, res) => {
    res.render('Register');
  }
  
  module.exports.login_get = (req, res) => {
    res.render('Login');
  }
  
  module.exports.register_post = (req, res) => {
    const user = req.app.get('db').collection('user');

    // create a token
    const token = createToken()
    
    if (scheme.validate_user(req.body)) {
        const data = {
            user_name: req.body.user_name,
            user_email: req.body.user_email,
            email_verified: true,
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
  
  module.exports.login_post = async (req, res) => {
    const {username, password} = req.body;
    console.log(username, password);
    res.send('user login');
  }