// controller actions
module.exports.register_get = (req, res) => {
    res.render('Register');
  }
  
  module.exports.login_get = (req, res) => {
    res.render('Login');
  }
  
  module.exports.register_post = (req, res) => {
    const {username, password} = req.body;

    const user = req.app.get('db').collection('user');
    
    if (scheme.validate_user(req.body)) {
      const data = {
          user_name: username,
          user_password: password
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