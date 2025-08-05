const Adminauth=(req,res,next)=>{
    console.log("Admin suth is checking");
    
    const token ="xyz";
    const ifauthorized=token==="xyz";
    if(!ifauthorized){
        res.status(401).send("unuthorized acess");

    }
    else{
        next();
    }

};
const profileauth=(req,res,next)=>{
    console.log("Admin suth is checking");
    
    const token ="xyz";
    const ifauthorized=token==="xyz";
    if(!ifauthorized){
        res.status(401).send("unuthorized acess");

    }
    else{
        next();
    }

};
module.exports={
    Adminauth,profileauth
}