import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Chart1 from "../components/Chart1";
import Chart2 from "../components/Chart2";
import Chart3 from "../components/Chart3";
import BigChart from "../components/BigChart";
import SmallChart1 from "../components/SmallChart1";
import SmallChart2 from "../components/SmallChart2";
import { useTranslation } from "react-i18next";

// Overview component definition
function Overview() {
  // Translation hook
  const { t } = useTranslation();

  // JSX structure for the Overview component
  return (
    <div>
      <Box textAlign='center' m={3}>
        <Typography variant='h4'>{t("Overview Page")}</Typography>
      </Box>

      {/* Charts at the first level */}
      <Grid container justifyContent='space-between'>
        <Grid item xs={4}>
          <Paper className='chart-paper'>
            <Chart1 />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className='chart-paper'>
            <Chart2 />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className='chart-paper'>
            <Chart3 />
          </Paper>
        </Grid>
      </Grid>

      {/* Large chart at the second level */}
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={8}>
          <Paper className='chart-paper'>
            <BigChart />
          </Paper>
        </Grid>
      </Grid>

      {/* Charts at the bottom */}
      <Grid container justifyContent='space-between'>
        <Grid item xs={6}>
          <Paper className='chart-paper'>
            <SmallChart1 />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className='chart-paper'>
            <SmallChart2 />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Overview;
