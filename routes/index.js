const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customersController');
const signUp = require('../controllers/Auth')

/* GET home page. */
router.route('/')
  .post(customerController.newCustomer)
  .get(customerController.index)
router.route('/customer/:id')
.get(customerController.getCustomerId)
.put(customerController.updateCustomerData)
.delete(customerController.deleteCustomer)
router.route('/signup')
.post(signUp.signUp)
module.exports = router;
