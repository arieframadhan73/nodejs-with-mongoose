const JWT = require('jsonwebtoken')
const Auth = require('../models/Auth');
const { jwt_secret } = require('../Configuration')


const signToken = user => {
  return JWT.sign({
    iss: 'coba',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, jwt_secret)
}

module.exports ={

  signUp: async (req,res) => {
    const { email, password } = req.body;
    const foundUser = await Auth.findOne({email})

    if(foundUser){
      return res.status(403).json({
        error:'Phone Number is already'
      })
    }

    const newCustomer =new Auth({ email, password });
    await newCustomer.save();

    const token = signToken(newCustomer);
    res.status(200).json({
      status: 200,
      token: token
    })

  }

}