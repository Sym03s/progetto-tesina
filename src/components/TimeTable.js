import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

// TimeTable component
const TimeTable = ({ timeTable }) => {
  // State to manage rows data
  const [rows, setRows] = useState([]);
  // Translation hook
  const { t } = useTranslation();

  useEffect(() => {
    // Set rows data when chargers prop changes
    setRows(timeTable || []);
  }, [timeTable]);

  // State for dialog control
  const [open, setOpen] = useState(false);
  const [newRow, setNewRow] = useState({
    Service: "",
    Vehicle: "",
    InTime: "",
    OutTime: "",
    LinkTime: "",
    UnlinkTime: "",
  });

  // States for editing and deleting rows
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogId, setDeleteDialogId] = useState("");

  // Columns configuration
  const columns = [
    // This column can be added at will
    // { field: "id", headerName: "ID", width: 50 },
    {
      field: "Service",
      headerName: t("Servizio"),
      width: 220,
      editable: isEditing,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) => handleCellEdit(params.id, "Service", e.target.value)}
          disabled={!isEditing}
        />
      ),
    },
    {
      field: "Vehicle",
      headerName: t("Veicolo"),
      width: 180,
      editable: isEditing,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) => handleCellEdit(params.id, "Name", e.target.value)}
          disabled={!isEditing}
        />
      ),
    },
    {
      field: "InTime",
      headerName: t("Orario di Entrata"),
      width: 150,
      editable: isEditing,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) => handleCellEdit(params.id, "InTime", e.target.value)}
          disabled={!isEditing}
        />
      ),
    },
    {
      field: "OutTime",
      headerName: t("Orario di Uscita"),
      width: 140,
      editable: isEditing,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) => handleCellEdit(params.id, "OutTime", e.target.value)}
          disabled={!isEditing}
        />
      ),
    },
    {
      field: "LinkTime",
      headerName: t("Inizio Ricarica"),
      width: 130,
      editable: isEditing,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) =>
            handleCellEdit(params.id, "LinkTime", e.target.value)
          }
          disabled={!isEditing}
        />
      ),
    },
    {
      field: "UnlinkTime",
      headerName: t("Fine Ricarica"),
      width: 130,
      editable: isEditing,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) =>
            handleCellEdit(params.id, "UnlinkTime", e.target.value)
          }
          disabled={!isEditing}
        />
      ),
    },
    // Add similar configurations for other columns
  ];

  // Function to handle cell edits
  const handleCellEdit = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  // Function to toggle editing mode
  const handleToggleEditing = () => {
    setIsEditing((prevEditing) => !prevEditing);
    setIsAdding(false);
    setSelectedRowId(null);
  };

  // Function to handle row deletion
  const handleDeleteRow = () => {
    setDeleteDialogOpen(true);
  };

  // Functions to handle delete dialog
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteDialogConfirm = (idToDelete) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== idToDelete));
    setSelectedRowId(null);
    setDeleteDialogOpen(false);
  };

  // Function to handle row addition
  const handleAddRow = () => {
    setIsAdding(true);
    setOpen(true);
  };

  // Functions to handle dialog
  const handleDialogSave = () => {
    setRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, ...newRow },
    ]);
    setOpen(false);
    setNewRow({
      Service: "",
      Name: "",
      InTime: "",
      OutTime: "",
      LinkTime: "",
      UnlinkTime: "",
    });
  };

  const handleDialogClose = () => {
    setOpen(false);
    setNewRow({
      Service: "",
      Name: "",
      InTime: "",
      OutTime: "",
      LinkTime: "",
      UnlinkTime: "",
    });
    setSelectedRowId(null);
    setIsAdding(false);
  };

  // JSX structure for the TimeTable component
  return (
    <div style={{ position: "relative", height: 400, width: "100%" }}>
      {/* Toolbar with buttons for adding, editing, and deleting rows */}
      <div style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}>
        {/* Button to add a new row */}
        <Tooltip title={t("Aggiungi")}>
          <IconButton
            onClick={handleAddRow}
            disabled={isEditing || deleteDialogOpen}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        {/* Button to toggle editing mode */}
        <Tooltip title={t("Modifica")}>
          <IconButton
            onClick={handleToggleEditing}
            disabled={open || deleteDialogOpen}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        {/* Button to delete a row */}
        <Tooltip title={t("Cancella")}>
          <IconButton onClick={handleDeleteRow} disabled={isEditing || open}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>

      {/* DataGrid component to display the table */}
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        isCellEditable={() => isEditing}
      />

      {/* Dialog for adding/editing a row */}
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>{t("Aggiungi Nuova Riga")}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {/* Input fields for adding/editing row data */}
            <Grid item xs={6}>
              <TextField
                label={t("Servizio")}
                value={newRow.Service}
                onChange={(e) =>
                  setNewRow({ ...newRow, Service: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={t("Veicolo")}
                value={newRow.Name}
                onChange={(e) => setNewRow({ ...newRow, Name: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={t("Orario di Entrata")}
                value={newRow.InTime}
                onChange={(e) =>
                  setNewRow({ ...newRow, InTime: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={t("Orario di Uscita")}
                value={newRow.OutTime}
                onChange={(e) =>
                  setNewRow({ ...newRow, OutTime: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={t("Inizio Ricarica")}
                value={newRow.LinkTime}
                onChange={(e) =>
                  setNewRow({ ...newRow, LinkTime: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={t("Fine Ricarica")}
                value={newRow.UnlinkTime}
                onChange={(e) =>
                  setNewRow({ ...newRow, UnlinkTime: e.target.value })
                }
              />
            </Grid>
          </Grid>
        </DialogContent>

        {/* Dialog actions (e.g., Save and Cancel buttons) */}
        <DialogActions>
          <Button onClick={handleDialogClose}>{t("Annulla")}</Button>
          <Button onClick={handleDialogSave}>{t("Salva")}</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for confirming row deletion */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>
          {t("Inserisci l'ID della riga da cancellare")}
        </DialogTitle>
        <DialogContent>
          {/* Input field for entering the row ID to be deleted */}
          <TextField
            label='ID'
            type='number'
            InputProps={{ inputProps: { min: 1 } }}
            onChange={(e) => setDeleteDialogId(parseInt(e.target.value, 10))}
          />
        </DialogContent>
        {/* Dialog actions (e.g., Confirm and Cancel buttons) */}
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>{t("Annulla")}</Button>
          <Button
            onClick={() => handleDeleteDialogConfirm(deleteDialogId)}
            disabled={isNaN(deleteDialogId) || deleteDialogId < 1}
          >
            {t("Conferma")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TimeTable;
