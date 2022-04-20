// controller actions
module.exports.register_get = (req, res) => {
    res.render('Register');
  }
  
  module.exports.login_get = (req, res) => {
    res.render('Login');
  }
  
  module.exports.register_post = async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    res.send('new register');
  }
  
  module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    res.send('user login');
  }