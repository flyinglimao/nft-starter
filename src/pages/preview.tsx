import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Button,
} from "@mui/material";
import styled from "@emotion/styled";
import { Token } from "components/Home/Form";
import MarkdownIt from "markdown-it";

const IntroContainer = styled(Container)<{ banner: string }>`
  padding: 1.2rem 0;
  background: linear-gradient(
      rgba(0, 0, 0, 0.35) 100%,
      rgba(0, 0, 0, 0.35) 100%
    ),
    url(${({ banner }) => banner});
  background-size: cover;
  background-position: center;
  color: white;
`;
const IntroBox = styled(Box)`
  min-height: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: end;
  column-gap: 80px;
`;
const mdParser = new MarkdownIt();

export default function () {
  const [form, setForm] = useState<{
    collectionName: string;
    banner: string;
    introduction: string;
    tokens: Token[];
  }>({
    collectionName: "{{ Collection Name }}",
    tokens: [],
    banner: "/banner.png",
    introduction: "# Hello World\n\nI'm so handsome",
  });

  useEffect(() => {
    const previewData = window.localStorage.getItem("preview");
    if (previewData) {
      setForm(JSON.parse(previewData));
    }
  }, []);
  return (
    <>
      <IntroContainer maxWidth={false} disableGutters banner={form.banner}>
        <Container maxWidth="lg">
          <IntroBox>
            <Typography variant="h4" component="h1">
              {form.collectionName}
            </Typography>
          </IntroBox>
        </Container>
      </IntroContainer>
      <Container maxWidth="md">
        <Box
          className="introduction custom-html-style"
          sx={{ padding: "3rem 0" }}
          dangerouslySetInnerHTML={{
            __html: mdParser.render(form.introduction),
          }}
        />
        <ImageList variant="masonry" cols={3} gap={8}>
          {form.tokens.map((token, id) => (
            <ImageListItem key={"token-" + id}>
              <img src={token.tokenImage} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
        <Box
          sx={{
            padding: "3rem",
            textAlign: "center",
          }}
        >
          <Button variant="contained">Mint</Button>
        </Box>
      </Container>
    </>
  );
}
