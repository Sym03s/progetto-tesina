// Importing necessary React components and Material-UI components
import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { MainListItems } from "./components/listItems";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Overview from "./pages/Overview";
import Configuration from "./pages/Configuration";
import UserRoles from "./pages/UserRoles";
import logo from "./logo.png";
import CircularProgress from "@mui/material/CircularProgress";
import LoginForm from "./pages/LoginForm";
import { useTranslation } from "react-i18next";
import Depot from "./pages/Depot";

// Function to create a copyright notice
function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      <Link color='inherit' href='https://mui.com/'>
        ReactDeportHub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// Width of the drawer
const drawerWidth = 200;

// Styling for the logo image
const LogoImg = styled("img")({
  maxHeight: "50px",
});

// Styling for the AppBar component
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// Styling for the Drawer component
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  display: open ? "block" : "none",
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    overflowX: "hidden",
    [theme.breakpoints.up("sm")]: {
      width: open ? drawerWidth : theme.spacing(7),
    },
  },
}));

// Creating the default theme for the entire application
const defaultTheme = createTheme();

// Main component
export default function App() {
  // Internationalization hook
  const { t } = useTranslation();

  // State variables
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [authenticated, setAuthenticated] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [appInitialized, setAppInitialized] = React.useState(false);

  // Function to toggle the drawer
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Function to update the clock time
  const updateClock = () => {
    setCurrentTime(new Date());
  };

  // Function to handle route changes
  const handleRouteChange = () => {
    if (!appInitialized) {
      setAppInitialized(true);
      return;
    }

    setLoading(true);

    const loadData = async () => {
      try {
        // Add logic for loading necessary data here
      } catch (error) {
        console.error("Error loading data", error);
      } finally {
        // Set loading flag to false after 1300 milliseconds (1.3 seconds)
        setTimeout(() => {
          setLoading(false);
        }, 1300);
      }
    };

    loadData();
  };

  // Function to handle the login process
  const handleLogin = () => {
    setLoading(true);

    // Simulate an asynchronous login request
    setTimeout(() => {
      setAuthenticated(true);
      setLoading(false);
    }, 1000);
  };

  // Effect hook to handle URL changes
  React.useEffect(() => {
    const handleLocationChange = () => {
      handleRouteChange();
    };

    const unlisten = () => {
      handleLocationChange();
    };
    handleLocationChange();

    return unlisten;
  }, [window.location.pathname]);

  // Effect hook for updating the clock time
  React.useEffect(() => {
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Effect hook to check authentication status after login
  React.useEffect(() => {
    if (authenticated) {
      setLoading(true);

      // Simulate a time-consuming process (e.g., data loading)
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [authenticated]);

  return (
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex", position: "relative" }}>
          <CssBaseline />

          {/* Add a gray overlay above the content during loading */}
          {loading && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(191, 191, 191, 0.7)",
                zIndex: 2000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress color='primary' size={100} thickness={6} />
            </div>
          )}

          {/* Main page content if the user is authenticated */}
          {authenticated && (
            <>
              <AppBar position='absolute' open={open}>
                <Toolbar
                  sx={{
                    pr: "24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      edge='start'
                      color='inherit'
                      aria-label='open drawer'
                      onClick={toggleDrawer}
                      sx={{
                        marginRight: "26px",
                        ...(open && { display: "none" }),
                      }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <LogoImg src={logo} alt='Logo' />
                  </div>
                  <Typography color='inherit' textAlign='center'>
                    {currentTime.toLocaleTimeString()}
                  </Typography>
                  <IconButton color='inherit'>
                    <Badge color='secondary'>{t("Simone Schiano")}</Badge>
                  </IconButton>
                </Toolbar>
              </AppBar>
              <Drawer variant='permanent' open={open}>
                <Toolbar
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    px: [1],
                  }}
                >
                  <IconButton onClick={toggleDrawer}>
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
                <Divider />
                <List component='nav'>
                  <MainListItems />
                </List>
              </Drawer>
              <Box
                component='main'
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
                  flexGrow: 1,
                  height: "100vh",
                  overflow: "auto",
                }}
              >
                <Toolbar />
                <Routes>
                  <Route path='/' element={<Overview />} />
                  <Route path='/configuration' element={<Configuration />} />
                  <Route path='/user-roles' element={<UserRoles />} />
                  <Route path='/depot' element={<Depot />} />
                </Routes>
                <Copyright sx={{ pt: 4 }} />
              </Box>
            </>
          )}

          {/* Login page if the user is not authenticated */}
          {!authenticated && <LoginForm onLogin={handleLogin} />}
        </Box>
      </ThemeProvider>
    </Router>
  );
}
