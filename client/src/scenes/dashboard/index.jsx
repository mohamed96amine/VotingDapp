import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import useEth from "../../contexts/EthContext/useEth";
import OwnerDashboard from "./owner";
import VoterDashboard from "./voter";
import UserDashboard from "./user";


const Dashboard = () => {
  const theme = useTheme();
  const {
    state: { contract, accounts, myself },
  } = useEth();
  return (
    <div>
      {myself && myself.isOwner && <OwnerDashboard />}
      {myself && !myself.isOwner && myself.isRegistered && <VoterDashboard />}
      {myself && !myself.isOwner && !myself.isRegistered && <UserDashboard />}
    </div>
  );
};

export default Dashboard;
