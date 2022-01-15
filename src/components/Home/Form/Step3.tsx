import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
const TokenCard = styled(Card)`
  margin-bottom: 2rem;
`;
const TokenImgPreview = styled(CardMedia)`
  width: 200px;
  height: 200px;
`;
const DropzoneBox = styled(Box)`
  height: 55px;
  display: grid;
  place-items: center;
  background: #eee;
`;

export default function (): JSX.Element {
  const [tokenModalOpen, setTokenModalOpen] = useState(false);
  return (
    <StepBox>
      <Typography variant="subtitle1" gutterBottom>
        STEP 3
      </Typography>
      <Typography variant="h4" gutterBottom>
        Collection Settings
      </Typography>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Max Supply
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The maximum amount of tokens in your collection.
          </Typography>
          <TextField
            label="Max Supply *"
            variant="standard"
            type="number"
            defaultValue={1}
            fullWidth
          />
        </CardContent>
      </FieldCard>
      {/* only when blindbox */}
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Blind Box
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The setting will be applied to all tokens before revealed.
          </Typography>
          <TokenCard>
            <CardActionArea sx={{ display: "flex" }}>
              <TokenImgPreview image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NIS0v7DwAEmgIyK17SHAAAAABJRU5ErkJggg==" />
              <Box sx={{ flex: "1", height: "200px", overflow: "auto" }}>
                <CardContent
                  sx={{
                    position: "relative",
                    paddingBottom: "calc(24px + 0.75rem) !important",
                    height: "calc(100% - 40px - 0.75rem)",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Token Name
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Token description
                  </Typography>
                </CardContent>
              </Box>
            </CardActionArea>
          </TokenCard>
        </CardContent>
      </FieldCard>
      {/* only when blindbox */}
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Tokens
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The setting will be applied to all tokens before revealed.
          </Typography>
          <TokenCard>
            <CardActionArea sx={{ display: "flex" }}>
              <TokenImgPreview image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NIS0v7DwAEmgIyK17SHAAAAABJRU5ErkJggg==" />
              <Box sx={{ flex: "1", height: "200px", overflow: "auto" }}>
                <CardContent
                  sx={{
                    position: "relative",
                    paddingBottom: "calc(24px + 0.75rem) !important",
                    height: "calc(100% - 40px - 0.75rem)",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Token Name
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Token description
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ position: "absolute", bottom: "24px" }}
                  >
                    Supply: 10
                  </Typography>
                </CardContent>
              </Box>
            </CardActionArea>
          </TokenCard>
          <DropzoneBox>
            <p>
              Drop or <Button variant="text">Pick Files</Button> to add new
              tokens
            </p>
          </DropzoneBox>
        </CardContent>
      </FieldCard>
      <Modal
        open={tokenModalOpen}
        onClose={() => setTokenModalOpen(false)}
        sx={{ overflow: "auto", height: "100%" }}
      >
        <Container
          sx={{
            minHeight: "100%",
            display: "grid",
            placeItems: "center",
            padding: "4rem 0",
          }}
        >
          <Paper
            sx={{
              padding: "24px",
              maxWidth: "400px",
              width: "calc(100% - 48px)",
            }}
          >
            <Typography variant="h6">Token Settings</Typography>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NIS0v7DwAEmgIyK17SHAAAAABJRU5ErkJggg=="
              style={{ width: "calc(100% + 48px)", margin: "0 -24px" }}
            />
            <TextField label="Token Name *" variant="standard" fullWidth />
            <TextField
              label="Token Description *"
              variant="standard"
              fullWidth
              multiline
            />
            <TextField label="Token Website" variant="standard" fullWidth />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Trait</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <TextField
                        placeholder="Type"
                        variant="standard"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        placeholder="Value"
                        variant="standard"
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Modal>
    </StepBox>
  );
}
