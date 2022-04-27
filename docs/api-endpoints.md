# API Endpoint
This document defines the API endpoints used to communicate between frontend and backend.

# User
## Register

## Login

## Lookup

### /user/:id (GET)

#### Request cURL

```
curl http://localhost:5000/user/1
```

#### Response body

```
{
    "user_name": "mike",
    "user_email": "test@test.com",
    "email_verified": true,
    "user_info": {
        "avatar": "https://www.google.com/",
        "age": 50,
        "gender": "Male"
    },
    "user_intro": "the user is too lazy!",
    "user_id": 1
}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 194
ETag: W/"c2-kqUyvhFmEi6UtNHBC5xh65qcBv8"
Date: Wed, 27 Apr 2022 22:23:57 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

# Survey
## All Surveys 

### /all_surveys(GET)

#### Request cURL

```
curl http://localhost:5000/all_surveys
```

#### Response body

```
[
    {
        "_id": "6260a340b67a6fafea376db0",
        "survey_name": "Survey 1",
        "survey_intro": "Just a line that will be ignored by the frontend.",
        "owner_id": 5,
        "owner_name": "Mike",
        "questions": [
            {
                "type": "FreeInput",
                "question": "Question 1"
            },
            {
                "type": "FreeInput",
                "question": "Question 2"
            },
            {
                "type": "FreeInput",
                "question": "Question 3"
            }
        ],
        "survey_id": 1
    }
]
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 2117
ETag: W/"845-fvhuIou0rOVpwFrbNBkpGfiRUSU"
Date: Wed, 27 Apr 2022 22:26:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
## Specific Surveys 

### /survey/:surveyid(GET)

#### Request cURL

```
curl http://localhost:5000/survey/1
```

#### Response body

```
{
    "survey_name": "Survey 5",
    "owner_id": 5,
    "survey_intro": "Please fill out the questions below.",
    "questions": [
        {
            "type": "FreeInput",
            "question": "Test 3"
        }
    ],
    "survey_id": 5
}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 162
ETag: W/"a2-biv4PfK+MTq5wAAXXS8y8k5IORA"
Date: Wed, 27 Apr 2022 23:16:54 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

## Surveys for a specific user

### /surveys/:userid(GET)

#### Request cURL

```
curl http://localhost:5000/surveys/5
```

#### Response body

```
[
    {
        "_id": "6260a340b67a6fafea376db0",
        "survey_name": "Survey 1",
        "survey_intro": "Just a line that will be ignored by the frontend.",
        "owner_id": 5,
        "owner_name": "Mike",
        "questions": [
            {
                "type": "FreeInput",
                "question": "Question 1"
            },
            {
                "type": "FreeInput",
                "question": "Question 2"
            },
            {
                "type": "FreeInput",
                "question": "Question 3"
            }
        ],
        "survey_id": 1
    },
    {
        "_id": "6260a431b67a6fafea376db1",
        "survey_name": "Survey 2",
        "survey_intro": "Another line that is going to be ignored.",
        "owner_id": 5,
        "owner_name": "Mike",
        "questions": [
            {
                "type": "FreeInput",
                "question": "Input1"
            },
            {
                "type": "FreeInput",
                "question": "Input2"
            },
            {
                "type": "FreeInput",
                "question": "Input3"
            },
            {
                "type": "FreeInput",
                "question": "Input4"
            },
            {
                "type": "FreeInput",
                "question": "Input5"
            }
        ],
        "survey_id": 2
    }
]
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 1400
ETag: W/"578-rhORcK01TVNLueBb+PRSzP0u7Gw"
Date: Wed, 27 Apr 2022 23:09:01 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

## Survey Creation

### /add_survey/:userid (POST)

#### Request body

```
{
    "sender" : "d4ee26eee15148ee92c6cd394edd974e",
    "survey_name" : "Survey 3",
    "questions" : [
        {
            "type": "FreeInput",
            "question": "Test 1"
        }
    ]
}
```

#### Request cURL

```
curl http://localhost:5000/add_survey/5
```

#### Response body

```
{
    "status": "sucess",
    "result": {
        "acknowledged": true,
        "insertedId": "6269cdb8a7a4c8e861e01d12"
    }
}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 90
ETag: W/"5a-B4xr6qMC+3JNxCJotT+bp8b79Vg"
Date: Wed, 27 Apr 2022 23:11:52 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

# Response collection

## Results of a specific survey

### /result/:surveyid (GET)

#### Request cURL

```
curl http://localhost:5000/result/5
```

#### Response body

```
[
    {
        "_id": "62636af591e57b5f52bcc6e8",
        "survey_id": 5,
        "response_time": "2022-04-23T02:56:53.378Z",
        "result": [
            {
                "type": "FreeInput",
                "text": "Hanging on"
            }
        ]
    }
]
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 145
ETag: W/"91-0eCtCd/TQiobA39KPim5HUTbKaY"
Date: Wed, 27 Apr 2022 23:20:45 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

## Survey Response Creation

### /add_result/:surveyid (POST)

#### Request body

```
{
    "result": [
            {
                "type": "FreeInput",
                "text": "Answer1"
            },
            {
                "type": "FreeInput",
                "text": "Answer2"
            },
            {
                "type": "FreeInput",
                "text": "Answer3"
            }
        ]
}
```

#### Request cURL

```
curl http://localhost:5000/add_result/1
```

#### Response body

```
{
    "status": "sucess",
    "result": {
        "acknowledged": true,
        "insertedId": "6269d0b7a7a4c8e861e01d13"
    }
}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 90
ETag: W/"5a-kQL4I7gk4SIB7U2LMy75URB2zkM"
Date: Wed, 27 Apr 2022 23:24:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```



