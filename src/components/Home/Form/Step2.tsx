import React, { useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  TextFieldProps,
  Tooltip,
  Typography,
} from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import styled from "@emotion/styled";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { FormContext } from "../Form";

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

export default function Step2(): JSX.Element {
  const [form, setForm] = useContext(FormContext);

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
          <SaleModeRadioGroup
            aria-label="sale-mode"
            value={form.saleMode}
            onChange={(evt) =>
              setForm((prev) => ({
                ...prev,
                saleMode: evt.target.value || "",
              }))
            }
          >
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
                    Only people who in a list can mint. You can set whitelists
                    in step 5.
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
            value={form.distributionMode}
            onChange={(evt) =>
              setForm((prev) => ({
                ...prev,
                distributionMode: evt.target.value || "",
              }))
            }
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
              value={form.saleStartAt}
              onChange={(val) =>
                setForm((prev) => ({
                  ...prev,
                  saleStartAt: val,
                }))
              }
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
              value={form.saleEndAt}
              onChange={(val) =>
                setForm((prev) => ({
                  ...prev,
                  saleEndAt: val,
                }))
              }
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
            value={form.quotaPerAddr}
            onChange={(evt) =>
              setForm((prev) => ({
                ...prev,
                quotaPerAddr: parseInt(evt.target.value) || 1,
              }))
            }
            fullWidth
          />
        </CardContent>
      </FieldCard>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <Tooltip
          title={
            form.saleEndAt < new Date()
              ? "Sale can't end before now"
              : form.saleEndAt <= form.saleStartAt
              ? "Sale can't end before start"
              : ""
          }
          placement="left"
        >
          <span>
            <Button
              variant="contained"
              onClick={() => setForm((prev) => ({ ...prev, step: 3 }))}
              disabled={
                form.saleEndAt < new Date() ||
                form.saleEndAt <= form.saleStartAt
              }
            >
              Next
            </Button>
          </span>
        </Tooltip>
        <Button
          variant="text"
          color="secondary"
          onClick={() => setForm((prev) => ({ ...prev, step: 1 }))}
        >
          Back
        </Button>
      </Box>
    </StepBox>
  );
}
