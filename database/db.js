module.exports = {
    // db: 'mongodb://localhost:27017/movie13'
    db:'mongodb+srv://lequyetanh:02081999@cluster0.q3x4x.mongodb.net/newAnguar?retryWrites=true&w=majority'

 };

// const mongoose = require("mongoose");
// const DB_URL = process.env.DB_CONNECT || "mongodb+srv://lequyetanh:02081999@cluster0.q3x4x.mongodb.net/newAnguar?retryWrites=true&w=majority";

// async function connect(){
//   try{
//     await mongoose.connect(DB_URL, {
//       useNewUrlParser:true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//       useCreateIndex: true
//     });
//   }catch(error){
//     console.log(error);
//   }
// }

// module.exports = { connect }
