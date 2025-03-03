import React, { useState } from "react";
import { Button, Stack, TextField, Typography, useMediaQuery } from "@mui/material";

const Register = () => {
    const _700 = useMediaQuery("(min-width:700px)");

    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [userData,setUserData] = useState({});

    const loginToggle = () => {
        setLogin(!login);
    };

    const handleLogin = () =>{
      setUserData({
        email,
        password
      })
      console.log(userData);
    }
    const handleRegister = () =>{
      setUserData({
        username,
        email,
        password
      })
      console.log(userData);
    }

    return (
        <>
            <Stack
                width={"100%"}
                height={"100vh"}
                flexDirection={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={_700 && {
                  backgroundImage: 'url("/register-bg.webp")',
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 600px",
              }}
            >
                <Stack flexDirection={"column"} width={_700 ? "40%" : "90%"} gap={2} mt={_700 && 20}>
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
                            placeholder="Enter your username..."
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                    )}
                    <TextField
                        variant="outlined"
                        placeholder="Enter your Email..."
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        placeholder="Enter your Password..."
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                    <Button
                        size="large"
                        sx={{
                            width: "100%",
                            height: "52",
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
