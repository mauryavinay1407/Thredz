import React, { useEffect, useState } from "react";
import { Button, Stack, TextField, Typography, useMediaQuery } from "@mui/material";
import { useLoginMutation, useSigninMutation } from "../redux/service";
import { toast } from "sonner";

const Register = () => {
    const _700 = useMediaQuery("(min-width: 700px)");

    const [login, setLogin] = useState(false);
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [signinUser, signinUserData] = useSigninMutation();
    const [loginUser, loginUserData] = useLoginMutation();

    const loginToggle = () => {
        setLogin(!login);
    };

    const handleLogin = async () => {
        const data = { email, password };
        await loginUser(data);
    };

    const handleRegister = async () => {
        const data = { userName, email, password };
        await signinUser(data);
    };

    useEffect(() => {
        if (signinUserData.isSuccess) {
            toast.success(signinUserData.data?.msg);
        }
        if (signinUserData.isError) {
            toast.error(signinUserData.error?.data?.msg);
        }
    }, [signinUserData.isSuccess, signinUserData.isError]);
    
    useEffect(() => {
        if (loginUserData.isSuccess) {
            toast.success(loginUserData.data?.msg);
        }
        if (loginUserData.isError) {
            toast.error(loginUserData.error?.data?.msg);
        }
    }, [loginUserData.isSuccess, loginUserData.isError]);
    
    return (
        <Stack
            width={"100%"}
            height={"100vh"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
                backgroundImage: _700 ? 'url("/register-bg.webp")' : undefined,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: _700 ? "rgba(0, 0, 0, 0.5)" : "#f5f5f5", 
                backgroundBlendMode: _700 ? "overlay" : undefined,
            }}
        >
            <Stack
                flexDirection={"column"}
                width={_700 ? "40%" : "90%"}
                gap={2}
                p={4}
                sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography
                    variant="h5"
                    fontSize={_700 ? "1.5rem" : "1.2rem"}
                    fontWeight={"bold"}
                    alignSelf={"center"}
                    color={"textPrimary"}
                >
                    {login ? "Login with email" : "Register with email"}
                </Typography>
                {!login && (
                    <TextField
                        variant="outlined"
                        placeholder="Enter your username..."
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)}
                        sx={{ borderRadius: "8px" }}
                    />
                )}
                <TextField
                    variant="outlined"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ borderRadius: "8px" }}
                />
                <TextField
                    variant="outlined"
                    placeholder="Enter your password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ borderRadius: "8px" }}
                />
                <Button
                    size="large"
                    sx={{
                        width: "100%",
                        height: 52,
                        background: "linear-gradient(45deg,rgb(18, 180, 23) 30%,rgb(54, 180, 60) 90%)",
                        color: "white",
                        fontSize: "1rem",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
                        ":hover": {
                            background: "linear-gradient(45deg, #388E3C 30%, #66BB6A 90%)",
                            cursor: "pointer",
                        },
                    }}
                    onClick={login ? handleLogin : handleRegister}
                >
                    {login ? "LOGIN" : "SIGN UP"}
                </Button>
                <Typography
                    variant="subtitle2"
                    fontSize={_700 ? "1.1rem" : "1rem"}
                    alignSelf={"center"}
                    color={"textSecondary"}
                >
                    {login ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span
                        style={{
                            color: "#4CAF50",
                            fontWeight: "bold",
                            cursor: "pointer",
                            ":hover": {
                                textDecoration: "underline",
                            },
                        }}
                        onClick={loginToggle}
                    >
                        {login ? "Sign up" : "Login"}
                    </span>
                </Typography>
            </Stack>
        </Stack>
    );
};

export default Register;