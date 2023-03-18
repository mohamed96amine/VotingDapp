import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import useEth from "../../../contexts/EthContext/useEth";
import VotingTimeline from "../../../components/VotingTimeline";
import ProposalsList from "../../../components/ProposalsList";
import AddProposal from "../../../components/AddProposal";
import ShowResult from "../../../components/ShowResult";
import RecentEvents from "../../../components/RecentEvents";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const VoterDashboard = () => {
  const {
    state: { myself, currentVotingStatus },
  } = useEth();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <VotingTimeline />
          </Item>
        </Grid>
        <Grid item xs={4}>
          {currentVotingStatus == 1 && (
            <Item>
              <AddProposal />
            </Item>
          )}
          {currentVotingStatus == 3 && (
            <Item>
              {myself && myself.hasVoted && <Box>You've already voted !</Box>}
              {myself && !myself.hasVoted && myself.isRegistered && (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <ProposalsList />
                </Box>
              )}
            </Item>
          )}
          {currentVotingStatus == 5 && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="60vh"
            >
              <Item>
                <ShowResult />
              </Item>
            </Box>
          )}
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

export default VoterDashboard;
