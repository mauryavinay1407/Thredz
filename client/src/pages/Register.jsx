import React from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";

const Register = () => {
  return (
    <>
      <Stack
        width={"100%"}
        height={"100vh"}
        flexDirection={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          backgroundImage: 'url("/register-bg.webp")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 600px",
        }}
      >
        <Stack flexDirection={"column"} width={"40%"} gap={2} mt={20}>
          <Typography
            variant="h5"
            fontSize={"1.5rem"}
            fontWeight={"bold"}
            alignSelf={"center"}
          >
            Register with email
          </Typography>
          <TextField variant="outlined" placeholder="Enter your username..." />
          <TextField variant="outlined" placeholder="Enter your Email..." />
          <TextField variant="outlined" placeholder="Enter your Password..." />
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
          >
            SIGN UP
          </Button>
          <Typography variant="subtitle2" fontSize={"1.3rem"} alignSelf={'center'}
          >
            Already have an account ?<span className="login-link"> Login</span>
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default Register;
