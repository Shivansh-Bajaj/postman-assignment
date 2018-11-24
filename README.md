## POSTMAN-ASSIGNMENT  

# requirement: nodeJS v10.4.1 (> 8), mocha    

# step to build  
npm install  

#  step to Run:    
npm start  

# step to run testcases:     
mocha  

##  APIs   

*For all APIs content Type need to be application/json in header*  

### SIGNUP:  
/api/v1/auth/signup  
signup api :  
```
req: {
  username: String,  
  password: String  
}
response: {
  status: success, fail  
}

```

### LOGIN:  
/api/v1/auth/login  
login api :  
```
req: {
  username: String,  
  password: String  
}
response: {
  status: success, fail  
  token: string
}
```

*We have to use this JWT token in header with parameter Authorization for authentication for all ahead apis*  
Example of Header:  
```
header: {
  Authorization: bearer <token>
}
```

### get tweet:  
here user gets tweets he/she created or retweeted  
/api/v1/tweet/
method: get  
 api :  
```
response: {
  status: success, fail  
  data: [<tweet obj>]
}
```

### get all tweet:  
here user gets tweets from all account he/she is following    
/api/v1/tweet/all  
method: get  
 api :  
```
response: {  
  status: success, fail    
  data: [<tweet obj>]  
}  
```  


### create tweet:  
/api/v1/tweet/
method: post  
 api :  
```
req: {
  body: String,  
  title: String  
}
response: {
  status: success, fail  
  data: <tweet obj>
}
```
### delete tweet:    
/api/v1/auth/login    
method: delete  
delete api :   
```
req: {
  id: String,  
    
}
response: {
  status: success, fail  
}
```
### retweet:  
here when we retweet tweet is added to my profile tweets but the owner of the tweet remains the same  

/api/v1/tweet/retweet  
method: post  
retweet api :    
```
req: {
  username: String,  
  password: String  
}
response: {
  status: success, fail   
}
```
### follow:  
/api/v1/user/follow      
method: post  
follow api :  
```
req: {
  username: String,  
}  
response: {  
  status: success, fail    
}  
```
### follow:  
/api/v1/user/unfollow      
method: post  
unfollow api :  
```
req: {
  username: String,  
}  
response: {  
  status: success, fail    
}  
```


