const router = require ('express').Router();

const User = require('../models/user');

const bcrypt = require('bcrypt');

const rounds = 10

const jwt = require('jsonwebtoken');

const middleware  = require('../middleware/auth');

const tokenSecret ="my-token"





// adding new user (sign-up route)

router.post('/signin',(req,res)=>{
 
bcrypt.hash(req.body.password, rounds ,(error,hash)=>{

if(error) res.status(500).json(error)
else{
  const newUser = User({username: req.body.username, password:hash})
  newUser.save()
  .then(user=>{
    res.status(200).json(user)
  })
  .catch(error =>{
    res.status(500).json(error)
  })
}



})
  

  
  
});





// login user
router.post('/login', (req,res)=>{
  User.findOne({username: req.body.username})
  .then(user=>{

    if(!user) res.status(404).json({error:"no user found"})
    else{
      bcrypt.compare(req.body.password, user.password,(error, match)=>{

        if(error)res.status(500).json(error)
          // else if (match) res.status(200).json({token: generateToken(user)})
          // else res.status(403).json({error:'pass no match'})
      })
    }
  })
  .catch(error=>{
    res.status(500).json(error)
  })
  
  
});

router.get('/jwt-test', middleware.verify , (req, res) => {
  res.status(200).json(req.user)
})

function generateToken(user){
  return jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
}


    module.exports = router;