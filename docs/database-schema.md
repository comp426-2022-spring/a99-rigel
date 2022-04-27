# Database
The project is developed under MongoDB community edition. This page aims to describe the database scheme used to write and read data structure. In the future, we may also transit to other document database such as Firebase to more easily host the service. 

# User
MongoDB collection name: `user`

It is the user table for researchers who post surveys.
```
{
	user_id: Int,			// auto-incremented by the MongoDB trigger
	user_name: String,
	user_email: String,
	email_verified: Bool,		// to show whether user has verified email or not
	user_info: {
		avatar: URL
		age: Int,
		gender: String,		// the gender that people self-identified
	},
	user_intro: String,		// may used for researcher's title
}
```

# Survey
MongoDB collection name: `survey`

```
{
	// Basic survey information
	survey_id: Int,			// auto-incremented by the MongoDB trigger
	survey_name: String,
	survey_intro: String,		// a brief introduction of the survey
	owner_id: Int,
	owner_name: String,

	// Survey scheme
	questions: List[survey_items],
}
```

## Survey items
### Text
This item is a markdown text block without any user response. It is used for title, summary, or explanation of the survey by researchers.
```
{
	order: Int,			// a integer to specify the order of questions
	type: "Text",
	text: String			// Markdown format
}
```

### Multiple Choice
```
{
	order: Int,			// a integer to specify the order of questions
	type: "MultiChoice",
	question: String,
	choices: List[String],	// list of text to describe the options
	max_choices: Int,		// maximum number of choices. Default to 1 which user can only choose one option
	optional: Bool			// False if the response is required; True if the response is optional
}
```

#### Response format
```
{
	order: Int,			// to show this is a response to which question
	type: "MultiChoice",
	choice: List[Int]		// list to selected choices
}
```

### Free Input
```
{
	order: Int,			// a integer to specify the order of questions
	type: "FreeInput",
	quesiton: String,
	input_size: String,		// specify the size of the input in order to render the input box
	hint_text: String,
	optional: Bool,			// False if the response is required; True if the response is optional
	validator: Function		// built-in validators: email, phone, url, text length
}
```

#### Response format
```
{
	order: Int,			// to show this is a response to which question
	type: "FreeInput",
	text: String
}
```

# Result
MongoDB collection name: `result`

```
{
	// response info
	survey_id: Int,
	response_time: DateTime,

	result: List[response_item]
}
```