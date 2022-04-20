// controller actions
module.exports.register_get = (req, res) => {
    res.render('register');
  }
  
  module.exports.login_get = (req, res) => {
    res.render('login');
  }
  
  module.exports.register_post = async (req, res) => {
    res.send('new register');
  }
  
  module.exports.login_post = async (req, res) => {
    res.send('user login');
  }