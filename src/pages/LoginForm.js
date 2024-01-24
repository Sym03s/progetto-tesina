import React from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Button, TextField, Container, Typography } from "@mui/material";
import LanguageSelector from "../components/LanguageSelector";

// LoginForm component definition
const LoginForm = ({ onLogin }) => {
  // Hooks for translation and state management
  const { t } = useTranslation();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [selectedLanguage, setSelectedLanguage] = React.useState("en");

  // Function to handle language change
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  // Function to handle the login process
  const handleLogin = async () => {
    try {
      // Make API call only if username and password are provided
      if (username && password) {
        // Make API call to verify authentication
        const response = await axios.get(
          "https://6571da95d61ba6fcc013c825.mockapi.io/loginUsers",
          {
            params: {
              username,
              password,
            },
          }
        );

        // Check if authentication is successful
        if (response.data.length > 0) {
          onLogin(); // Called when login is successful
        } else {
          // Add logic to handle the case when authentication fails
          console.log("Authentication failed");
        }
      } else {
        console.log("Enter username and password");
      }
    } catch (error) {
      // Handle API call errors
      console.error("Error during authentication:", error.message);
    }
  };

  // JSX structure for the LoginForm component
  return (
    <Container
      component='form'
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "70vh",
        "& .MuiFormControl-root": {
          width: "60%",
          mb: 4,
        },
        "& .MuiButton-root": {
          width: "20%",
          mt: 5,
        },
      }}
    >
      <Typography variant='h2' gutterBottom sx={{ marginBottom: "70px" }}>
        {t("Login su ReactDeportHub")}
      </Typography>
      <TextField
        label={t("Username")}
        variant='outlined'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin='normal'
      />
      <TextField
        label={t("Password")}
        type='password'
        variant='outlined'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin='normal'
      />
      <LanguageSelector onLanguageChange={handleLanguageChange} />
      <Button variant='contained' color='primary' onClick={handleLogin}>
        {t("Login")}
      </Button>
    </Container>
  );
};

export default LoginForm;
