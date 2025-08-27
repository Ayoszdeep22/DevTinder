const mongoose=require("mongoose");
const ConnectionSchecma=new mongoose.Schema({
    SenderConnection:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,

    },
    RecieverConnection:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
       enum:{
   values:["ignored","accepted","rejected","interested"],
   message:`u have to not add value other than that`
},

        required:true,

    }



},{timestamps:true,}
);





const connectionRequest=mongoose.model("connectionRequest",ConnectionSchecma);
module.exports=connectionRequest;