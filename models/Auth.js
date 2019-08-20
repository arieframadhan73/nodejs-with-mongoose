const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const authSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required:true }
})

authSchema.pre('save', async function(next){
  try{
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password, salt)

    this.password = passwordHash;
  }catch(err){
    console.log(err)
  }
} )

const authModel = mongoose.model('authModel', authSchema);
module.exports = authModel;