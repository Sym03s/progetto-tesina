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

// VehicleTable component
const VehicleTable = ({ vehicles }) => {
  // State to manage rows data
  const [rows, setRows] = useState([]);
  // Translation hook
  const { t } = useTranslation();

  useEffect(() => {
    // Set rows data when chargers prop changes
    setRows(vehicles || []);
  }, [vehicles]);

  // State for dialog control
  const [open, setOpen] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    DepotId: "",
    Vehicle: "",
    NominalBatteryCapacity: "",
    MaximumBatterySoC: "",
    MinimumBatterySoC: "",
    BatteryChargingEfficiency: "",
    NominalPreconditioningPower: "",
  });

  // States for editing and deleting rows
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDialogId, setDeleteDialogId] = useState("");

  // Columns configuration
  const columns = [
    // { field: "id", headerName: "ID", width: 50 },
    {
      field: "DepotId",
      headerName: t("ID Deposito"),
      width: 100,
      editable: isEditing,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) => handleCellEdit(params.id, "DepotId", e.target.value)}
          disabled={!isEditing}
        />
      ),
    },
    {
      field: "Vehicle",
      headerName: t("Veicoli"),
      width: 190,
      editable: isEditing,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) => handleCellEdit(params.id, "Vehicle", e.target.value)}
          disabled={!isEditing}
        />
      ),
    },
    {
      field: "NominalBatteryCapacity",
      headerName: t("Nominal Battery Capacity"),
      width: 190,
      editable: isEditing,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) =>
            handleCellEdit(params.id, "NominalBatteryCapacity", e.target.value)
          }
          disabled={!isEditing}
        />
      ),
    },
    {
      field: "MaximumBatterySoC",
      headerName: t("Maximum Battery SoC"),
      width: 170,
      editable: isEditing,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) =>
            handleCellEdit(params.id, "MaximumBatterySoC", e.target.value)
          }
          disabled={!isEditing}
        />
      ),
    },
    {
      field: "MinimumBatterySoC",
      headerName: t("Minimum Battery SoC"),
      width: 170,
      editable: isEditing,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) =>
            handleCellEdit(params.id, "MinimumBatterySoC", e.target.value)
          }
          disabled={!isEditing}
        />
      ),
    },
    {
      field: "BatteryChargingEfficiency",
      headerName: t("Battery Charging Efficiency"),
      width: 200,
      editable: isEditing,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) =>
            handleCellEdit(
              params.id,
              "BatteryChargingEfficiency",
              e.target.value
            )
          }
          disabled={!isEditing}
        />
      ),
    },
    {
      field: "NominalPreconditioningPower",
      headerName: t("Nominal Preconditioning Power"),
      width: 230,
      editable: isEditing,
      renderCell: (params) => (
        <TextField
          value={params.value}
          onChange={(e) =>
            handleCellEdit(
              params.id,
              "NominalPreconditioningPower",
              e.target.value
            )
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
    setIsAdding(false); // Disattiva anche la modalità di aggiunta
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
      { id: prevRows.length + 1, ...newVehicle },
    ]);
    setOpen(false);
    setNewVehicle({
      DepotId: "",
      Vehicle: "",
      NominalBatteryCapacity: "",
      MaximumBatterySoC: "",
      MinimumBatterySoC: "",
      BatteryChargingEfficiency: "",
      NominalPreconditioningPower: "",
    });
  };

  const handleDialogClose = () => {
    setOpen(false);
    setNewVehicle({
      DepotId: "",
      Vehicle: "",
      NominalBatteryCapacity: "",
      MaximumBatterySoC: "",
      MinimumBatterySoC: "",
      BatteryChargingEfficiency: "",
      NominalPreconditioningPower: "",
    });
    setSelectedRowId(null);
    setIsAdding(false);
  };

  // JSX structure for the VehicleTable component
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
                label={t("ID Deposito")}
                value={newVehicle.DepotId}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, DepotId: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={t("Veicolo")}
                value={newVehicle.Vehicle}
                onChange={(e) =>
                  setNewVehicle({ ...newVehicle, Vehicle: e.target.value })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label={t("Nominal Battery Capacity")}
                value={newVehicle.NominalBatteryCapacity}
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    NominalBatteryCapacity: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label={t("Maximum Battery SoC")}
                value={newVehicle.MaximumBatterySoC}
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    MaximumBatterySoC: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label={t("Minimum Battery SoC")}
                value={newVehicle.MinimumBatterySoC}
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    MinimumBatterySoC: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label={t("Battery Charging Efficiency")}
                value={newVehicle.BatteryChargingEfficiency}
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    BatteryChargingEfficiency: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label={t("Nominal Preconditioning Power")}
                value={newVehicle.NominalPreconditioningPower}
                onChange={(e) =>
                  setNewVehicle({
                    ...newVehicle,
                    NominalPreconditioningPower: e.target.value,
                  })
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

export default VehicleTable;
