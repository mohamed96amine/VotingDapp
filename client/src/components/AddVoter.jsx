import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import useEth from "../contexts/EthContext/useEth";
import { Box } from "@mui/material";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';

export default function AddVoter() {
  const {
    state: { myself, blockchainService },
  } = useEth();
  const [voterAddress, setVoterAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorCode, setErrorCode] = useState('');

  const handleInputChange = (event) => {
    setVoterAddress(event.target.value);
    if (isEthereumAddressValid()) {
      setIsValidAddress(true);
    } else {
      setIsValidAddress(false);
    }
  }

  const isEthereumAddressValid = () => {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    return regex.test(voterAddress);
  };

  const register = async () => {
    try {
      const value = await blockchainService.register(
        voterAddress,
        myself.address
      );
      setSuccess(value.status);
      setShowError(false);
      setErrorCode(null);
    } catch (err) {
        console.log(err);
        setSuccess(false);
        setShowError(true);
        const regex = /code=(\w+)/; // Regex pour extraire le texte entre les parenthèses "code=..."
        const match = regex.exec(err.message);
        setErrorCode(match[1])
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
        <Typography variant="h3" sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }} gutterBottom>
            Register Voter
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
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Enter valid ethereum address"
            inputProps={{ "aria-label": "search google maps" }}
            value={voterAddress}
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
          severity={success? "success":"error"}
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
          {success? "Voter Registered":"Voter Not Registered"}
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
              Voter Not Registered : {errorCode}
            </Alert>
        )}
      </Stack>
    </Box>
  );
}
