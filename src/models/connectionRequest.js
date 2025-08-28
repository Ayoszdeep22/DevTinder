const mongoose=require("mongoose");
const ConnectionSchecma=new mongoose.Schema({
    SenderConnection:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
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
 ConnectionSchecma.pre("save",function (next) {
    const connection=this;

       if(connection.SenderConnection.equals(connection.RecieverConnection)){
        throw new Error("same connectipn");
        
       };
       next();

        
    });
    ConnectionSchecma.index({SenderConnection:1,RecieverConnection:1});





const connectionRequest=mongoose.model("connectionRequest",ConnectionSchecma);
module.exports=connectionRequest;