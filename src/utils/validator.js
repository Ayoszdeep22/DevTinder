const validator = require("validator");


const validatorcheck = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    // First name length check
    if (firstName.length < 4 || firstName.length > 50) {
        throw new Error("first name is too big or too small");
    }

    // Strong password check
    if (!validator.isStrongPassword(password)) {
        throw new Error("password is weak");
    }

    // You can also validate email here
    if (!validator.isEmail(emailId)) {
        throw new Error("invalid email address");
    }
};

const ValidateprofileEditData=(req)=>
{
    
    const AllowedFields=["gender","age","skills","about","emailId"];
    const isAllowed=Object.keys(req.body).every(i=>AllowedFields.includes(i));

    return isAllowed;
   

}

module.exports = {validatorcheck,ValidateprofileEditData};
