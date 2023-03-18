import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import VotingTimeline from "../../../components/VotingTimeline";
import RecentEvents from "../../../components/RecentEvents";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const UserDashboard = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <VotingTimeline />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Box display="flex" justifyContent="center" alignItems="center">
              You're not registered as a Voter !
            </Box>
          </Item>
          <Item>
            <Box>Ask Owner To Add You To Voters List.</Box>
          </Item>
          </Grid>
        <Grid item xs={4}>
          <Item>
          <RecentEvents/>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserDashboard;
