import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import useEth from "../contexts/EthContext/useEth";

export default function ShowResult() {
  const {
    state: { proposals, winningProposalId },
  } = useEth();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            🏆Winning Proposal🏆
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
            {proposals[winningProposalId]}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
