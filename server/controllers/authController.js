const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

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
        // create and send a token
        const token = createToken(user.findOne(user.ObjectId));
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({ user: user.ObjectId });
      });
    }
  }
  
  module.exports.login_post = async (req, res) => {
    const User = req.app.get('db').collection('user');
    
    // create and send a token
    const token = createToken(User.findOne(user.ObjectId));
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    
    const {username, password} = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        res.status(200).json({ user: user.ObjectId})
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  }