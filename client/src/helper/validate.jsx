import toast from 'react-hot-toast'
import { authenticate } from './helper';

export async function usernameValidate(values)
{
    const error ={};

    if(!values.username){
        error.username=toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username=toast.error('Invalid Username...!');
    }
    else{
        const {status}=await authenticate(values.username);
        console.log(status);
        if(status!==200) error.username=toast.error("Username doesn't exist");
    }
    return error;
}
export async function usernameValidateregister(values)
{
    const error ={};

    if(!values.username){
        error.username=toast.error('Username Required...!');
    }else if(values.username.includes(" ")){
        error.username=toast.error('Invalid Username...!');
    }
    return error;
}

export async function passwordvalidate(value)
{
    const error={};
    const specialchar=/[~!@#$%^&*()_+-={}[]|\:;"'<>,.?]/;

    if(!value.password){
        error.password=toast.error("Enter your password");
    }else if(value.password.includes(" ")){
        error.password=toast.error("Password can't include space");
    }else if(value.password.length<4){
        error.password=toast.error("Password must have more than 4 characters");
    }else if(!specialchar.test(value.password)){
        error.password=toast.error("Password must include special character");
    }
    return error;
}

export async function resetpasswordvalidate(value)
{
    const error= passwordvalidate(value);
    
    if(value.password!==value.cnfpassword){
        error.password=toast.error("Confirm Password need to be same as New password");
    }
    return error;
}

export async function validateemail(value)
{
    const attherate=/[@]/;
    const error={};
    if(!value.email)
    {
        error.email=toast.error("Enter email");
    }else if(value.email.includes(" ")){
        error.email=toast.error("email don't contain space");
    }else if(!attherate.test(value.email)){
        error.email=toast.error("Enter valid email");
    }///this is not working don't know why?
    return error;
}

export async function validateregister(values)
{   
    return {...usernameValidateregister(values),...passwordvalidate(values),}
}

export async function validateprofile(value)
{
    const error={};
    const attherate=/[@]/;

    if(!value.firstname){
        error.firstname=toast.error("Enter First name");
    }else if(value.firstname.includes(" ")){
        error.firstname=toast.error("First name Can't include spaces");
    }else if(!value.lastname){
        error.firstname=toast.error("Enter Last name");
    }else if(value.lastname.includes(" ")){
        error.firstname=toast.error("Last name can't include spaces");
    }else if(!value.mobile){
        error.firstname=toast.error("Enter mobile no.");
    }else if(!value.email){
        error.email=toast.error("Enter email");
    }else if(value.email.includes(" ")){
        error.email=toast.error("email don't contain space");
    }else if(!attherate.test(value.email)){
        error.email=toast.error("Enter valid email");
    }
    return error;
}