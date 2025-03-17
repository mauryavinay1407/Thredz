import React, { useEffect, useState } from "react";
import {
    Button,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { useLoginMutation, useSigninMutation } from "../redux/service";

const Register = () => {
    const _700 = useMediaQuery("(min-width: 700px)");

    const [login, setLogin] = useState(false);
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    const [signinUser,signinUserData] = useSigninMutation();
    const [loginUser,loginUserData] = useLoginMutation();

    const loginToggle = () => {
        setLogin(!login);
    };

    const handleLogin = async() => {
        const data = {
            email,
            password,
        };
        console.log(data);
        await loginUser(data);
    };
    const handleRegister = async() => {
        const data = {
            userName,
            email,
            password,
        };
        console.log(data);
        await signinUser(data);
    };


    useEffect(()=>{
        if(signinUserData.isSuccess){
            console.log(signinUserData.data);
        }
        if(loginUserData.isSuccess){
            console.log(loginUserData.data);
        }
    },[signinUserData.isSuccess,loginUserData.isSuccess])

    return (
        <>
            <Stack
                width={"100%"}
                height={"100vh"}
                flexDirection={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={
                    _700 ? {
                        backgroundImage: 'url("/register-bg.webp")',
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 600px",
                    }
                    : undefined
                }
            >
                <Stack
                    flexDirection={"column"}
                    width={_700 ? "40%" : "90%"}
                    gap={2}
                    mt={_700 ? 20 : 0}
                >
                    <Typography
                        variant="h5"
                        fontSize={_700 ? "1.5rem" : "1rem"}
                        fontWeight={"bold"}
                        alignSelf={"center"}
                    >
                        {login ? "Login with email" : "Register with email"}
                    </Typography>
                    {!login && (
                        <TextField
                            variant="outlined"
                            placeholder="Enter your userName..."
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                        />
                    )}
                    <TextField
                        variant="outlined"
                        placeholder="Enter your Email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Enter your Password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        size="large"
                        sx={{
                            width: "100%",
                            height: 52,
                            bgcolor: "green",
                            color: "white",
                            fontSize: "1rem",
                            ":hover": {
                                bgcolor: "blue",
                                cursor: "pointer",
                            },
                        }}
                        onClick={login ? handleLogin : handleRegister}
                    >
                        {login ? "LOGIN" : "SIGN UP"}
                    </Button>
                    <Typography
                        variant="subtitle2"
                        fontSize={_700 ? "1.3rem" : "1rem"}
                        alignSelf={"center"}
                    >
                        {login
                            ? "Don't have an account ?"
                            : "Already have an account ?"}{" "}
                        <span className="login-link" onClick={loginToggle}>
                            {login ? "Sign up" : "Login"}{" "}
                        </span>
                    </Typography>
                </Stack>
            </Stack>
        </>
    );
};

export default Register;
