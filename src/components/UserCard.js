import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTranslation } from "react-i18next";

function UserCard() {
  // State variables
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEC, setOpenDialogEC] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputRole, setInputRole] = useState("");
  const [userData, setUserData] = useState([]);
  const [cardRefs, setCardRefs] = useState([]);
  const [roleInfo, setRoleInfo] = useState(null);
  const [selectedUser, setSelectedUser] = useState([]);
  const [editedName, setEditedName] = useState(selectedUser.name);
  const [editedRole, setEditedRole] = useState(selectedUser.role);
  const { t } = useTranslation();

  // Fetch user data from an API on component mount
  useEffect(() => {
    fetch("https://656d9c82bcc5618d3c238c0d.mockapi.io/user")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setCardRefs(Array.from({ length: data.length }));
      })
      .catch((error) => console.error("Error in API call:", error));
  }, []);

  // Update editedName and editedRole when selectedUser changes
  useEffect(() => {
    setEditedName(selectedUser.name);
    setEditedRole(selectedUser.role);
  }, [selectedUser]);

  // Open the dialog for adding a new user
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  // Close the dialog for adding a new user
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  // Close the options dialog for editing or deleting a user
  const handleDialogECClose = () => {
    setOpenDialogEC(false);
  };

  // Update user data when a user is edited
  const updateUser = (userId, newName, newRole) => {
    setUserData((prevUserData) =>
      prevUserData.map((user) =>
        user.id === userId ? { ...user, name: newName, role: newRole } : user
      )
    );
    handleDialogECClose();
  };

  // Handle the confirmation of editing a user
  const handleConfirm = () => {
    updateUser(selectedUser.id, editedName, editedRole);
    handleDialogECClose();
  };

  // Handle changes in the input for user name
  const handleNameChange = ({ target: { value } }) => {
    setInputName(value);
  };

  // Handle changes in the input for user role
  const handleRoleChange = ({ target: { value } }) => {
    setInputRole(value);
  };

  // Add a new user to the user data
  const handleAddUser = () => {
    if (inputName && inputRole) {
      const newUser = {
        id: userData.length + 1,
        name: inputName,
        role: inputRole,
        avatar: "https://example.com/default-avatar.png",
      };

      setUserData([...userData, newUser]);
      setCardRefs((prev) => [...prev, null]);
      setInputName("");
      setInputRole("");
      setOpenDialog(false);
    } else {
      console.error("Enter Name and Role.");
    }
  };

  // Set roleInfo for displaying user role information
  const handleInfoUser = (userId) => {
    const user = userData.find((user) => user.id === userId);
    if (user) {
      switch (user.role) {
        case "Manager":
          setRoleInfo({
            title: t(user.role),
            permissions: [
              {
                label: t("Read"),
                icon: <CheckCircleIcon style={{ color: "green" }} />,
              },
              {
                label: t("Add"),
                icon: <CheckCircleIcon style={{ color: "green" }} />,
              },
              {
                label: t("Edit"),
                icon: <CheckCircleIcon style={{ color: "green" }} />,
              },
              {
                label: t("Delete"),
                icon: <CheckCircleIcon style={{ color: "green" }} />,
              },
            ],
          });
          break;
        case "Engineer":
          setRoleInfo({
            title: t(user.role),
            permissions: [
              {
                label: t("Read"),
                icon: <CheckCircleIcon style={{ color: "green" }} />,
              },
              {
                label: t("Add"),
                icon: <CheckCircleIcon style={{ color: "green" }} />,
              },
              {
                label: t("Edit"),
                icon: <CheckCircleIcon style={{ color: "green" }} />,
              },
              {
                label: t("Delete"),
                icon: <CancelIcon style={{ color: "red" }} />,
              },
            ],
          });
          break;
        case "Operator":
          setRoleInfo({
            title: t(user.role),
            permissions: [
              {
                label: t("Read"),
                icon: <CheckCircleIcon style={{ color: "green" }} />,
              },
              {
                label: t("Add"),
                icon: <CheckCircleIcon style={{ color: "green" }} />,
              },
              {
                label: t("Edit"),
                icon: <CancelIcon style={{ color: "red" }} />,
              },
              {
                label: t("Delete"),
                icon: <CancelIcon style={{ color: "red" }} />,
              },
            ],
          });
          break;
        case "Guest":
          setRoleInfo({
            title: t(user.role),
            permissions: [
              {
                label: t("Read"),
                icon: <CheckCircleIcon style={{ color: "green" }} />,
              },
              {
                label: t("Add"),
                icon: <CancelIcon style={{ color: "red" }} />,
              },
              {
                label: t("Edit"),
                icon: <CancelIcon style={{ color: "red" }} />,
              },
              {
                label: t("Delete"),
                icon: <CancelIcon style={{ color: "red" }} />,
              },
            ],
          });
          break;
        default:
          setRoleInfo(null);
          break;
      }
    }
  };

  // Delete a user from the user data
  const handleDeleteUser = (userId) => {
    setUserData(userData.filter((user) => user.id !== userId));
    setCardRefs((prev) => prev.slice(0, -1));
    handleDialogECClose();
  };

  // Handle click on the edit icon to open the options dialog
  const handleEditIconClick = (user, e) => {
    e.stopPropagation();
    setSelectedUser(user);
    setOpenDialogEC(true);
  };

  // Render the UI components
  return (
    <Grid container spacing={2}>
      {userData.map((user, index) => (
        <Grid item key={user.id} xs={12} sm={6} md={3} lg={2.4}>
          {/* Render a card for each user */}
          <Card
            ref={(ref) => (cardRefs[index] = ref)}
            style={{
              height: "100%",
              marginLeft: "20px",
              marginRight: "20px",
              position: "relative",
            }}
          >
            <CardContent style={{ textAlign: "center" }}>
              {/* Render user avatar */}
              <Avatar
                alt={user.name}
                src={user.avatar}
                sx={{ width: 100, height: 100, margin: "auto" }}
              />
              <Box mt={1}>
                {/* Render user name and role */}
                <Typography variant='h6'>{user.name}</Typography>
                <Typography variant='subtitle1'>
                  {t(user.role)}{" "}
                  {/* Render the "Info" icon for role information */}
                  <InfoIcon
                    style={{ verticalAlign: "middle", cursor: "pointer" }}
                    onClick={() => handleInfoUser(user.id)}
                  />
                </Typography>
                {/* Render the "Edit" icon for editing user */}
                <EditIcon
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => handleEditIconClick(user, e.nativeEvent)}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* Render a card with a button to add a new user */}
      <Grid item xs={12} sm={6} md={3} lg={2.4}>
        <Card
          style={{
            textAlign: "center",
            height: "100%",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <CardContent>
            {/* Render the "Add" icon */}
            <Button
              variant='contained'
              color='primary'
              onClick={handleDialogOpen}
              sx={{ marginTop: "40px", marginBottom: "30px" }}
            >
              <AddIcon sx={{ fontSize: 100 }} />
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Render the dialog for adding a new user */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{t("Aggiungi Utente")}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              {/* Input field for entering user name */}
              <TextField
                type='text'
                placeholder={t("Nome")}
                value={inputName}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={6}>
              {/* Input field for entering user role */}
              <TextField
                type='text'
                placeholder={t("Ruolo")}
                value={inputRole}
                onChange={handleRoleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {/* Close the dialog */}
          <Button onClick={handleDialogClose}>{t("Cancella")}</Button>
          {/* Add a new user */}
          <Button onClick={handleAddUser} color='primary'>
            {t("Add")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Render the dialog for role information */}
      <Dialog open={Boolean(roleInfo)} onClose={() => setRoleInfo(null)}>
        <DialogTitle align='center'>{roleInfo && roleInfo.title}</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography
            variant='h6'
            align='center'
            style={{ marginBottom: "15px" }}
          >
            {t("Permission")}
          </Typography>
          {/* Render role permissions */}
          <Grid container spacing={2} justifyContent='space-between'>
            {roleInfo &&
              roleInfo.permissions.map((permission) => (
                <Grid item key={permission.label}>
                  <div style={{ textAlign: "center" }}>
                    {/* Render permission label and icon */}
                    <Typography>{permission.label}</Typography>
                    {permission.icon}
                  </div>
                </Grid>
              ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          {/* Close the dialog */}
          <Button onClick={() => setRoleInfo(null)}>{t("Chiudi")}</Button>
        </DialogActions>
      </Dialog>

      {/* Render the dialog for editing and deleting a user */}
      <Dialog open={openDialogEC} onClose={handleDialogECClose}>
        <DialogTitle>{t("User Options")}</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <Grid container spacing={3}>
                <Grid item xs={6} style={{ marginTop: "5px" }}>
                  {/* Input field for editing user name */}
                  <TextField
                    key='editedName'
                    label={t("Nome")}
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={6} style={{ marginTop: "5px" }}>
                  {/* Input field for editing user role */}
                  <TextField
                    key='editedRole'
                    label={t("Ruolo")}
                    value={t(editedRole)}
                    onChange={(e) => setEditedRole(e.target.value)}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {/* Confirm the changes */}
          <Button onClick={handleConfirm} color='primary'>
            {t("Conferma")}
          </Button>
          {/* Delete the user */}
          <Button
            onClick={() => handleDeleteUser(selectedUser.id)}
            color='secondary'
          >
            {t("Delete")}
          </Button>
          {/* Close the dialog */}
          <Button onClick={handleDialogECClose}>{t("Chiudi")}</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default UserCard;
