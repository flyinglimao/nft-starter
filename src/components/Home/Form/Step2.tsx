import React from "react";
import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import styled from "@emotion/styled";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const StepBox = styled(Box)``;
const FieldCard = styled(Card)`
  padding: 1.5rem 1rem;
  margin-bottom: 2rem;
  &:last-child {
    margin-bottom: 0;
  }
`;
const SaleModeRadioGroup = styled(RadioGroup)`
  label {
    margin: 0.5rem 0;
  }
`;

export default function (): JSX.Element {
  return (
    <StepBox>
      <Typography variant="subtitle1" gutterBottom>
        STEP 2
      </Typography>
      <Typography variant="h4" gutterBottom>
        Sale Settings
      </Typography>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Sale Mode
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The initial offering mechanism of your NFT collection.
          </Typography>
          <SaleModeRadioGroup aria-label="sale-mode" defaultValue="free">
            <FormControlLabel
              value="free"
              control={<Radio />}
              label={
                <>
                  <Typography variant="body1">Free Mint</Typography>
                  <Typography variant="body2" style={{ color: "gray" }}>
                    People can mint tokens without any limitation.
                  </Typography>
                </>
              }
            />
            <FormControlLabel
              value="whitelist"
              control={<Radio />}
              label={
                <>
                  <Typography variant="body1">Whitelisted Mint</Typography>
                  <Typography variant="body2" style={{ color: "gray" }}>
                    Only people who in a list can mint.
                  </Typography>
                </>
              }
            />
            <FormControlLabel
              value="sell"
              control={<Radio />}
              disabled
              label={
                <>
                  <Typography variant="body1">Sell</Typography>
                  <Typography variant="body2" style={{ color: "gray" }}>
                    People who pay a certain amount can mint.
                  </Typography>
                </>
              }
            />
            <FormControlLabel
              value="auction"
              control={<Radio />}
              disabled
              label={
                <>
                  <Typography variant="body1">Auction</Typography>
                  <Typography variant="body2" style={{ color: "gray" }}>
                    People who pay the most can mint.
                  </Typography>
                </>
              }
            />
          </SaleModeRadioGroup>
        </CardContent>
      </FieldCard>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Distribution Mode
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The distribute mechanism of your NFT collection.
          </Typography>
          <SaleModeRadioGroup
            aria-label="distribution-mode"
            defaultValue="direct"
          >
            <FormControlLabel
              value="direct"
              control={<Radio />}
              label={
                <>
                  <Typography variant="body1">Direct</Typography>
                  <Typography variant="body2" style={{ color: "gray" }}>
                    All tokens are public visible.
                  </Typography>
                </>
              }
            />
            <FormControlLabel
              value="blind-box"
              control={<Radio />}
              label={
                <>
                  <Typography variant="body1">Blind Box</Typography>
                  <Typography variant="body2" style={{ color: "gray" }}>
                    Tokens are revealed after the end of the sale.
                  </Typography>
                </>
              }
            />
          </SaleModeRadioGroup>
        </CardContent>
      </FieldCard>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Start of the Sale
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The start time (in your timezone) of the sale. This is checked in
            smart contract and transactions before that time will always fail.
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props: TextFieldProps) => (
                <TextField {...props} fullWidth variant="standard" />
              )}
              label="Start of the Sale *"
              onChange={() => {}}
              value={undefined}
            />
          </LocalizationProvider>
        </CardContent>
      </FieldCard>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            End of the Sale
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The end time (in your timezone) of the sale. This is checked in
            smart contract and transactions after that time will always fail. If
            blind box mode is used, our server will also try to open boxes after
            that time.
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props: TextFieldProps) => (
                <TextField {...props} fullWidth variant="standard" />
              )}
              label="End of the Sale *"
              onChange={() => {}}
              value={undefined}
            />
          </LocalizationProvider>
        </CardContent>
      </FieldCard>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Quota for an address
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The maximum amount of tokens an user can mint. Use 0 to make it
            unlimited.
          </Typography>
          <TextField
            label="Quota for an address *"
            variant="standard"
            type="number"
            defaultValue={0}
            fullWidth
          />
        </CardContent>
      </FieldCard>
    </StepBox>
  );
}
