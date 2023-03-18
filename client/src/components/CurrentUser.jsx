import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import useEth from "../contexts/EthContext/useEth";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

export default function CurrentUser() {
  const {
    state: { myself },
  } = useEth();

  return (
    <div>
      {myself && (
        <Stack direction="row" spacing={1}>
          <Avatar>
            <PersonIcon />
          </Avatar>
          <Chip label={myself.address} variant="outlined" />
        </Stack>
      )}
    </div>
  );
}
