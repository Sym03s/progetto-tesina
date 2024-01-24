import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UserCard from "../components/UserCard";
import { useTranslation } from "react-i18next";

// UserRoles component definition
function UserRoles() {
  // Translation hook
  const { t } = useTranslation();

  // JSX structure for the UserRoles component
  return (
    <div>
      {/* Box containing the title */}
      <Box textAlign='center' m={3}>
        <Typography variant='h4'>{t("UserRoles Page")}</Typography>
      </Box>

      {/* Render the UserCard component */}
      <UserCard />
    </div>
  );
}

export default UserRoles;
