

const {v4 :uuidv4 } = require('uuid')

let users = require('../model/Users')
// signup new us
const signUp = (req, res)=> {

let foundEmail = users.find((user) => user.email === req.body.email);
if (foundEmail) {
     return res.json('email already exists')

}
else if(req.body.password !== req.body.confirmPassword){
    return res.json('Password does not match')
}

else if (
    !req.body.email || !req.body.fullName || !req.body.password || !req.body.confirmPassword
) {
    res.json('All fields need to be filled')
}

else{ 
    let newUser = {
    id: uuidv4(),
    email:req.body.email,
    fullName:req.body.fullname,
    password:req.body.password,
    confirmPassword:req.body.confirmPassword
    }

users.push(newUser);
res.json(users)
}
};


// signIn user 

const signIn = (req, res) => {

    let credentials = {
        email:req.body.email,
        password: req.body.password
    }
    let foundUser = users.find((user) => {
    if (user.email === credentials.email && user.password === credentials.password){
        return user;
    }
  });
  
    if(!foundUser)
    { 
        res.json('No user with those details please check gain or signup')

    }
    return res.json(foundUser)


};
// const allUsers = (req, res) =>{
//     res.json(allUsers)
// };




module.exports = {signIn, signUp};