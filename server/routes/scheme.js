
/**
 * Validate the user parameters
 * @param {Object} params - parameters from the request of adding a user
 * @returns {boolean} return true if the parameters is valid, otherwise return false
 */
export function validate_user(params) {
    // TODO: need to implement user validator
    const user = req.app.get('db').collection('user');

    const {email, username, password} = params;

    if (user.findOne({user_email: email}) == null && user.findOne({user_name: username}) == null) {
        return true;
    } else {
        return false;
    }
} 