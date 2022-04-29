// Finds a specific user with id given in params
export function user(req, res) {
    const user = req.app.get('db').collection('user');
    
    if (req.params.id) {
        const result = user.findOne({'user_id': parseInt(req.params.id)}, {projection: {'_id': false}});
        result.then(data => res.send(data));
    }
}

// Gets surveys that aren't current users
// User id passsed in params
export function certain_surveys(req, res) {
    const survey = req.app.get('db').collection('survey');
    
    if (req.params.userid) {
        const cursor = survey.find({"owner_id" : {$ne: parseInt(req.params.userid)}});
        cursor.toArray().then((result) => {
            res.send(result);
        });
    }

    const cursor = survey.find({});
    cursor.toArray().then((result) => {
        res.send(result);
    });
}

// It adds a survey to the database
// The user id is given in the params
export function add_survey(req, res) {
    const survey = req.app.get('db').collection('survey');
   
    const data = {
        survey_name: req.body.survey_name,
        owner_id: parseInt(req.params.userid),
        survey_intro: "Please fill out the questions below.",
        questions: req.body.questions
    };
    survey.insertOne(data, (err, resdb) => {
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

// Fetches the data for a specific survey
// Survey id is in the params
export function survey(req, res) {
    const survey = req.app.get('db').collection('survey');
    
    if (req.params.surveyid) {
        const result = survey.findOne({ 'survey_id': parseInt(req.params.surveyid) }, { projection: { '_id': false } });
        result.then(data => res.send(data));
    }
}

// Finds all the surveys created by a certain user
// The user id is passed in the params
export function user_surveys(req, res) {
    const survey = req.app.get('db').collection('survey');

    if (req.params.userid) {
        //console.log(req.params.userid)
        const cursor = survey.find({ 'owner_id': parseInt(req.params.userid) });
        cursor.toArray().then((result) => {
            res.send(result);
        });
    }
}

// Adds a respone to a particular survey
// The survey id is in the params
export function add_result(req, res) {
    const result = req.app.get('db').collection('result');

    const data = {
        survey_id: parseInt(req.params.surveyid),
        response_time: new Date(),
        result: req.body.result
    };
    result.insertOne(data, (err, resdb) => {
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

// All the results for a particular survey
// Survey id passed in params
export function result(req, res) {
    const result = req.app.get('db').collection('result');

    if (req.params.surveyid) {
        //console.log(req.params.surveyid)
        const cursor = result.find({ 'survey_id': parseInt(req.params.surveyid) });
        cursor.toArray().then((result) => {
            res.send(result);
        });
    }
}



