import * as React from "react";
import { useState, useEffect } from "react";
import useEth from "../../../contexts/EthContext/useEth";
import BlockchainService from "../../../service/BlockchainService";
import VotingTimeline from "../../../components/VotingTimeline";
import AddVoter from "../../../components/AddVoter";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import RecentEvents from "../../../components/RecentEvents";
import Alert from '@mui/material/Alert';

const OwnerDashboard = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const [currentStatus, setCurrentStatus] = useState(0);
  const {
    state: { contract, accounts, currentVotingStatus },
  } = useEth();
  const blockchainService = new BlockchainService(contract, accounts);

  const handleNextStatus = () => {
    try {
      blockchainService.nextStatus();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleStatus = async () => {
      try {
        const status = await blockchainService.getCurrentStatus();
        setCurrentStatus(status);
      } catch (err) {
        console.error(err);
      }
    };
    handleStatus();
  }, [contract, accounts, currentStatus, handleNextStatus]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>
            <VotingTimeline />
          </Item>
        </Grid>
        <Grid item xs={4}>
          {currentVotingStatus === 0 && (
            <Item>
              <AddVoter />
            </Item>
          )}
          {currentVotingStatus == 1 && (
            <Alert severity="info">People are adding proposals...</Alert>
          )}
          {currentVotingStatus == 2 && (   
            <Alert severity="info">No more proposals are getting registred</Alert>
          )}
          {currentVotingStatus == 3 && (
            <Alert severity="info">People are voting...</Alert>
          )}
          {currentVotingStatus == 4 && (
            <Alert severity="info">Votes ended</Alert>
          )}
          {currentVotingStatus == 5 && (
            <Alert severity="success">Votes Tallied</Alert>
          )}
          
          
        </Grid>
        <Grid item xs={4}>
          <Item>
            <RecentEvents/>
          </Item>
        </Grid>
      </Grid>
    </div>
    // <VotingTimeline/>
  );
};

export default OwnerDashboard;
