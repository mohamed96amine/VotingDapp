import * as React from "react";
import useEth from "../contexts/EthContext/useEth";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const RecentEvents = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    state: { allEvents },
  } = useEth();

  const shortenhash = (hash) => {
    const firstSix = hash.slice(0, 6);
    const lastFour = hash.slice(-4);
    return `${firstSix}...${lastFour}`;
  };

  return (
    <Box backgroundColor={colors.primary[400]} overflow="auto">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        colors={colors.grey[100]}
        p="15px"
      >
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Recent Transactions
        </Typography>
      </Box>
      {allEvents.map((event, i) => (
        <Box
          key={`${event.id}-${i}`}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          p="15px"
        >
          <Box>
            <Typography
              color={colors.greenAccent[500]}
              variant="h5"
              fontWeight="600"
            >
              {event.event}
            </Typography>
            <Typography color={colors.grey[100]} variant="h9">
              TX Hash : {shortenhash(event.transactionHash)}
            </Typography>
          </Box>
          <Box
            backgroundColor={colors.greenAccent[500]}
            p="5px 10px"
            borderRadius="4px"
          >
            {event.id}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default RecentEvents;
