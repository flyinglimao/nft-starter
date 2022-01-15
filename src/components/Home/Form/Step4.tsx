import React from "react";
import {
  Box,
  Card,
  CardContent,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

const StepBox = styled(Box)``;
const FieldCard = styled(Card)`
  padding: 1.5rem 1rem;
  margin-bottom: 2rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

export default function (): JSX.Element {
  return (
    <StepBox>
      <Typography variant="subtitle1" gutterBottom>
        STEP 4
      </Typography>
      <Typography variant="h4" gutterBottom>
        Sale Website Settings
      </Typography>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Sale Website
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The URL of your sale.
          </Typography>
          <TextField
            label="URL of your sale *"
            variant="standard"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">.nftstarter.one</InputAdornment>
              ),
            }}
          />
        </CardContent>
      </FieldCard>
    </StepBox>
  );
}
