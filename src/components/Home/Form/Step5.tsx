import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { FormContext } from "../Form";

const StepBox = styled(Box)``;
const FieldCard = styled(Card)`
  padding: 1.5rem 1rem;
  margin-bottom: 2rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

export default function (): JSX.Element {
  const [_, setForm] = useContext(FormContext);
  const [addresses, setAddresses] = useState("");

  return (
    <StepBox>
      <Typography variant="subtitle1" gutterBottom>
        STEP 5
      </Typography>
      <Typography variant="h4" gutterBottom>
        Add Addresses to Whitelist, it may need more than one transaction if the
        list is too long.
      </Typography>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Whitelist
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            A line for an address.
          </Typography>
          <TextField
            label="Addresses *"
            variant="standard"
            fullWidth
            multiline
            value={addresses}
            onChange={(evt) => setAddresses(evt.target.value)}
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
        <Button
          variant="contained"
          onClick={() => setForm((prev) => ({ ...prev, step: 6 }))}
        >
          Finish
        </Button>
      </Box>
    </StepBox>
  );
}
