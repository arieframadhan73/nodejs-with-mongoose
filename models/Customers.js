const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dataCustomer =  new Schema({
  namaCustomers: { type: String, required: true },
  alamatCs: { type: String, required: true },
  phoneCustomer: { type: Number, required: true}
});

const customersModel = mongoose.model('customersModel', dataCustomer);
module.exports = customersModel;