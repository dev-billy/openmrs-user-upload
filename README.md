# openmrs-user-upload
This project uses puppeteer to automate process to upload users to openmrs

Built using:
- [Puppeteer](https://pptr.dev/)

# Getting started

1. Clone the repository
2. Run ```npm install``` or ```yarn install``` depending on what package manager you are using
3. Add the [data.json](#datajson-file-format) file with the list of your users with the details that you need to upload
4. Add [.env](#env-variables) file with the correct credentials
5. Run ```npm start``` or ```yarn start```

## data.json file format

```
{
    "user_data": [
        {
            "first_name": "First Name",
            "middle_name": "Middle Name",
            "family_name": "Family Name",
            "dob": "2022-03-17",
            "gender": "Male",
            "user_name": "username",
            "password": "password",
            "user_role": "Provider",
            "member_identifier": "username",
            "team_name": "teamname",
            "assigned_location": "location",
        },
    ]
}
```

## .env variables
```
OPENMRS_BASE_URL='https://your_domain.com/openmrs'
OPENMRS_USER_NAME='admin'
OPENMRS_USER_PASSWORD='your_super_secret_password'
```
