# UserLoginAuth
This is the code for the user signup , change password , login and update details


// you can send data using post method by inserting the data in the format of raw data (Json format)... 


//for register:
API->https://userloginauth.onrender.com/register
Method -> POST
Data-> data need to be send in the following format in json format:
{
	"email":"123@g.com",
	"password":"123",
	"name":"supreet",
	"phone":"123",
}


//for login:
API->https://userloginauth.onrender.com/login
Method->POST
Data-> data need to be send in the following format in json format:
{
	"email":"123@g.com",
	"password":"123"
}

//for change password:
API->https://userloginauth.onrender.com/changepass
Method->POST
Data-> data need to be send in the following format in json format:
{
	"email":"123@g.com",
	"oldPass":"123",
	"newPass":"321"
}

//for update:
https://userloginauth.onrender.com/update
Method->POST
Data-> data need to be send in the following format in json format:
{
	"email":"123@g.com",
	"name":"supreet",
	"phone":"123",
}
