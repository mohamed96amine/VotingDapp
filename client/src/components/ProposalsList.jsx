import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import useEth from "../contexts/EthContext/useEth";

export default function ErrorRadios() {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("Vote wisely");
  const {
    state: { proposals, myself, blockchainService },
  } = useEth();

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === "") {
      setHelperText("You have to choose");
      setError(false);
    } else {
      try {
        const result = blockchainService.setVote(value, myself.address);
        console.log(result);
        if (result.status) {
          setError(false);
          setHelperText("Congrats ! You voted !");
          window.location.reload(false);
        } else {
          const errorMessage =  {  message : "You already voted!" };
          throw errorMessage;
        }
      } catch (err) {
        setHelperText("You did not vote !" + err.message);
        setError(true);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
        <FormLabel id="demo-error-radios">Check All Proposals</FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          {proposals &&
            proposals.map((proposal, id) => (
              <FormControlLabel
                value={id}
                control={<Radio />}
                label={proposal.description}
              />
            ))}
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button
          sx={{ mt: 1, mr: 1 }}
          type="submit"
          variant="contained"
          color="success"
        >
          Vote
        </Button>
      </FormControl>
    </form>
  );
}
