import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import TableChartIcon from "@mui/icons-material/TableChart";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";

// MainListItems component
export const MainListItems = () => {
  // Access the translation functionality
  const { t } = useTranslation();

  // JSX structure for the list items
  return (
    <React.Fragment>
      {/* Depot */}
      <ListItemButton component={Link} to='/depot'>
        <ListItemIcon>
          <DirectionsBusIcon />
        </ListItemIcon>
        <ListItemText primary={t("Depot")} />
      </ListItemButton>

      {/* Overview */}
      <ListItemButton component={Link} to='/'>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary={t("Overview")} />
      </ListItemButton>

      {/* Configuration */}
      <ListItemButton component={Link} to='/configuration'>
        <ListItemIcon>
          <TableChartIcon />
        </ListItemIcon>
        <ListItemText primary={t("Configuration")} />
      </ListItemButton>

      {/* User Roles */}
      <ListItemButton component={Link} to='/user-roles'>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary={t("User Roles")} />
      </ListItemButton>
    </React.Fragment>
  );
};
