import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { FormContext } from "../Form";

const StepBox = styled(Box)``;

export default function (): JSX.Element {
  const [form] = useContext(FormContext);

  return (
    <StepBox>
      <Typography variant="subtitle1" gutterBottom>
        FINISHED!
      </Typography>
      <Typography variant="h4" gutterBottom>
        Congration! Your collection and sale just finished.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sale Page:
        <a
          href={`https://${form.saleWebsite}.nftstarter.one/`}
          target="_blank"
          rel="noreferrer noopener"
        >
          https://{form.saleWebsite}.nftstarter.one/
        </a>
      </Typography>
    </StepBox>
  );
}
