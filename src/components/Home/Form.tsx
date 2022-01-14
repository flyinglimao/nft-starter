import React, { useState } from "react";
import { Container, Paper } from "@mui/material";
import styled from "@emotion/styled";
import Step1 from "./Form/Step1";

const FormContainer = styled(Container)`
  padding: 1.5rem 24px;
`;
const FormBox = styled(Paper)`
  padding: 4rem;
`;

export default function (): JSX.Element {
  const [collectionImageName, setCollectionImageName] = useState<string>("");

  return (
    <FormContainer maxWidth="lg">
      <FormBox elevation={1}>
        <Step1
          collectionImageName={collectionImageName}
          setCollectionImageName={setCollectionImageName}
        />
      </FormBox>
    </FormContainer>
  );
}
