
/*
/**
 * Validate the user parameters
 * @param {Object} params - parameters from the request of adding a user
 * @returns {boolean} return true if the parameters is valid, otherwise return false
 */
/*
export default function validate_user(params) {
    // TODO: need to implement user validator
    const user = req.app.get('db').collection('user');

    const {email, username, password} = params;

    const valid = user.find( {$or: [{user_email: email}, {user_name: username}]} );

    if (valid) {
        return true;
    } else {
        return false;
    }
} 
*/