import React from "react";
import { Container, Box } from "@mui/material";
import styled from "@emotion/styled";

const LogoImg = styled.img`
  height: 75px;
  max-width: 100%;
  object-fit: contain;
  vertical-align: middle;
`;
const IntroContainer = styled(Container)`
  padding: 1.2rem 0;
  background: linear-gradient(
      rgba(0, 0, 0, 0.35) 100%,
      rgba(0, 0, 0, 0.35) 100%
    ),
    url(/banner.png);
  background-size: cover;
  background-position: center;
  color: white;
`;
const IntroBox = styled(Box)`
  min-height: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: end;
  column-gap: 80px;
`;

export default function (): JSX.Element {
  return (
    <IntroContainer maxWidth={false} disableGutters>
      <Container maxWidth="lg">
        <IntroBox>
          <LogoImg src="/logo.svg" alt="LOGO" />
          <p style={{ paddingBottom: "0.75rem" }}>
            Create your NFT collection with a minting page without coding.
          </p>
        </IntroBox>
      </Container>
    </IntroContainer>
  );
}
