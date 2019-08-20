const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const dataCars = new Schema({
  typeCar: { type: String, required: true },
  nameCar: { type: String, required:true },
  kindOfCar: { type: String, required: true }
})
const carsModel = mongoose.model('carsModel', dataCars);
module.exports = carsModel;