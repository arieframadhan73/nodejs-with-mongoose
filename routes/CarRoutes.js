const express = require('express');
const router = express.Router();
const carModel = require('../models/Cars')

const carSystem = {
  getDataCar: async(req,res)=>{
    try {
      const data = await carModel.find({});
      if(data){
        res.status(200).json({
          status: 200,
          message: "Data Sukses",
          data: data
        });
      }else{
        res.status(200).json({
          status: 200,
          message: "Data kosong"
        })
      }
    } catch(err){
      res.status(500).json("Internal Server Error!")
    }
  },

  addDataCar: async(req,res)=>{
    try{
      const payload = new carModel(req.body)
      const payloadSave = await payload.save();
      res.status(200).json({
        status: 200,
        message: "Data ditambahkan",
        data: payloadSave
      })
    }catch(err){
      res.status(500).json("Internal Server Error!")
      console.log(err)
    }
  }

//tutup
}

router.route('/list-car')
.get(carSystem.getDataCar)
.post(carSystem.addDataCar)


module.exports = router;

