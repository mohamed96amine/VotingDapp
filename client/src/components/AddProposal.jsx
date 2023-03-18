import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import useEth from "../contexts/EthContext/useEth";
import { Box } from "@mui/material";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function AddProposal() {
  const {
    state: { myself, blockchainService },
  } = useEth();
  const [proposal, setProposal] = useState("");
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorCode, setErrorCode] = useState("");

  const handleInputChange = (event) => {
    setProposal(event.target.value);
  };

  const register = async () => {
    try {
      const value = await blockchainService.addProposal(
        proposal,
        myself.address
      );
      setSuccess(value.status);
      setShowError(false);
      setErrorCode(null);
    } catch (err) {
      setSuccess(false);
      setShowError(true);
      const regex = /code=(\w+)/; // Regex pour extraire le texte entre les parenthèses "code=..."
      const match = regex.exec(err.message);
      setErrorCode(match[1]);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Typography
          variant="h3"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
          gutterBottom
        >
          Add Proposal
        </Typography>
        <Paper
          centered
          position="alternate"
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Enter a proposal"
            inputProps={{ "aria-label": "enter proposal" }}
            value={proposal}
            onChange={handleInputChange}
          />
          <IconButton
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={register}
          >
            <HowToRegIcon />
          </IconButton>
        </Paper>
        {success && (
          <Alert
            severity={success ? "success" : "error"}
            centered
            position="alternate"
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            {success ? "Proposal Registered" : "Proposal Not Registered"}
          </Alert>
        )}
        {showError && (
          <Alert
            severity="error"
            centered
            position="alternate"
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            Proposal Not Registered : {errorCode}
          </Alert>
        )}
      </Stack>
    </Box>
  );
}
