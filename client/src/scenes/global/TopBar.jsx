import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import CurrentUser from "../../components/CurrentUser";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* ALYRA BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase
          disabled
          sx={{ ml: 2, flex: 1 }}
          placeholder="ALYRA SATOSHI"
        />
      </Box>

      <Box
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        display="flex"
      >
        {/* <TextField disabled sx={{ ml: 2, flex: 1 }} placeholder="Mohamed Amine EL BACHRA" /> */}
        <Typography variant="h3" component="span">
          DEV : Mohamed Amine EL BACHRA
        </Typography>
      </Box>
      {/* ICONS */}
      <Box display="flex">
        <CurrentUser/>
      </Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        
      </Box>
    </Box>
  );
};

export default Topbar;
