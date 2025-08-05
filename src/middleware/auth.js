const Adminauth=(req,res,next)=>{
    console.log("Admin auth is checking");
    
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
    console.log("User auth is checking");
    
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