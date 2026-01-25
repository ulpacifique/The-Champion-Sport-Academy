const signupValidation=(name:string, value:string)=>{
    switch(name){
        case "name":
            if(value.length===0)return "Name is required.";

            return "";
            case "email":
            if(value.length===0)return "Email is required.";
            if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))return "Email is invalid.";
            return"";
            case "password":
                if(value.length===0)return "Passoword is require.";
                return "";
                default:
                    return "";
    }
}
const loginValidation=(name:string, value:string)=>{
    switch(name){
            case "email":
            if(value.length===0)return "Email is required.";
            return"";
            case "password":
                if(value.length===0)return "Passoword is require.";
                return "";
                default:
                    return "";
    }}
export {signupValidation, loginValidation};