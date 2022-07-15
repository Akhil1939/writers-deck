export const LoginStart = (userCredentials)=>({
    type: "Login_Start"
});


export const LoginSuccess =(user)=>({
    type:"Login_Success",
    payload:user,
});

export const LoginFailure = ()=>({
    type:"Login_Failure"

})
export const LogOut = ()=>({
    type:"Logout"

})