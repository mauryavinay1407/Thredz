import React from 'react';
import { Stack, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation

const Error = () => {
  const navigate = useNavigate();

  return (
    <>
      <Stack
        width={'100%'}
        height={'100vh'}
        justifyContent="center"
        alignItems="center"
        spacing={4}
        sx={{ backgroundColor: '#f5f5f5' }}
      >
        <Container maxWidth="sm">
          <Typography variant="h1" align="center" color="error" sx={{ fontWeight: 'bold', fontSize: '6rem' }}>
            404
          </Typography>
          <Typography variant="h4" align="center" sx={{ mb: 4 }}>
            Oops! Page Not Found
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4 }}>
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          <Stack direction="row" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')} // Navigate to the home page
              sx={{ textTransform: 'none', fontSize: '1rem' }}
            >
              Go Back to Home
            </Button>
          </Stack>
        </Container>
      </Stack>
    </>
  );
};

export default Error;