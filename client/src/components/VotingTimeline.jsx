import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import useEth from "../contexts/EthContext/useEth";
import { Box, Button } from "@mui/material";

import HowToRegIcon from "@mui/icons-material/HowToReg";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import BallotIcon from "@mui/icons-material/Ballot";

const VotingTimeline = () => {
  const {
    state: { currentVotingStatus, myself, blockchainService },
  } = useEth();

  const handleNextStatus = () => {
    try {
      blockchainService.nextStatus();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Typography gutterBottom variant="h4" component="div">
        Voting Status
      </Typography>
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot
              color={currentVotingStatus == 0 ? "secondary" : "primary"}
            >
              <HowToRegIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "30px", px: 2 }}>
            <Typography variant="h6" component="span">
              Registering Voters
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot
              color={currentVotingStatus == 1 ? "secondary" : "primary"}
            >
              <AppRegistrationIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "30px", px: 2 }}>
            <Typography variant="h6" component="span">
              ProposalsRegistrationStarted
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot
              color={currentVotingStatus == 2 ? "secondary" : "primary"}
            >
              <DoneAllIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "30px", px: 2 }}>
            <Typography variant="h6" component="span">
              ProposalsRegistrationEnded
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot
              color={currentVotingStatus == 3 ? "secondary" : "primary"}
            >
              <HowToVoteIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "30px", px: 2 }}>
            <Typography variant="h6" component="span">
              Voting Session Started
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot
              color={currentVotingStatus == 4 ? "secondary" : "primary"}
            >
              <DoneAllIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "30px", px: 2 }}>
            <Typography variant="h6" component="span">
              Voting Session Ended
            </Typography>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot
              color={currentVotingStatus == 5 ? "secondary" : "primary"}
            >
              <BallotIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "30px", px: 2 }}>
            <Typography variant="h3" component="span">
              Votes Tallied
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
      {currentVotingStatus != 5 && myself && myself.isOwner && (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            color="success"
            onClick={handleNextStatus}
          >
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VotingTimeline;
