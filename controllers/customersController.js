const Customers = require('../models/Customers');
const Cars = require ('../models/Cars')
module.exports = {

  index: async (req, res)=>{
    try {
      const limit = parseInt(req.query.limit);
      const page = parseInt(req.query.page);
      const search = req.query.search;

      // const { limit , page, search}  = req.query
  
      // untuk search
      //  $regex: '.*' + search + '.*'

      // untuk contain search
      // $options:'i'

      const data = await Customers.find({namaCustomers: { $regex: '.*' + search + '.*' ,$options:'i'}})
      .limit(limit)
      .skip((limit*page)-limit)

      if(data){
        res.status(200).json({
          status: 200,
          message: "Data Sukses",
          pagination:{
            page: page,
            limit: limit
          },
          data: data
        });
      }else{
        res.status(200).json({
          status: 200,
          message: "Data kosong",
          data: data
        })
      }
    } catch(err){
      res.status(500).json("Internal Server Error!")
    }
  },

  //without async
  // newCustomer:(req,res,next)=>{
  //   console.log(req.body)
  //   const payload = new Customers(req.body);
  //   payload.save().then(data=>{
  //     res.status(201).json(data)
  //   }).catch(err =>{
  //     res.status(400).send(err.message)
  //   })
  // },

  //with async
  newCustomer: async (req, res) =>{
    try {
      const data = new Customers(req.body);
      const dataSave = await data.save();

      res.status(200).json({
        status: 200,
        message: 'Data Berhasil!',
        data: dataSave
      });
    } catch(err) {
      res.status(500).json(
        {
          status: 500,
          message: "Internal Server Error",
          path: Object.keys(err.errors)+" "+ "is required"
        }
      )
    }
  },

  getCustomerId: async (req, res) => {
    try{
      const { id } = req.params;
      const search = await Customers.findById(id);
      if(search){
        res.status(200).json({
          status:200,
          message : "Data sukses",
          data: search
        })
      }else{
        res.status(404).json(
          {
            status: 404,
            message: "Data tidak ditemukan!"
          }
        )
      }
    } catch (err){
      res.status(500).json(
        {
          status: 500,
          message: "Internal server error!",
          pa: err
        }
      )
    }
  },
  
  updateCustomerData: async (req, res) => {
    try {
      const { id } = req.params;
      const newCustomerData =  req.body;
      const result = await Customers.findByIdAndUpdate(id, newCustomerData);

      if(result){
        res.status(200).json({
          message: "OK",
          data: result
        })
      }else{
        console.log(result)
      }
    } catch(err) {
      res.status(500).json(
        {
          status: 500,
          message: "Internal server error!",
        }
      )
    }
  },
  
  deleteCustomer: async (req, res) => {
    try{
      const { id } = req.params;
      const resultDel = await Customers.deleteOne({ _id: id });
      
      res.status(200).json({
        status: 200,
        message: "Bye Kenangan"
      })

    } catch(err){
      console.log(err)
      res.status(500).json({
        status: 500,
        message: "Internal server error"
      })
    }
  }


};