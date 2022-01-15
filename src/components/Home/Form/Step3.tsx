import React, { useContext, useState } from "react";
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
import { FormContext } from "../Form";

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
  const [form, setForm] = useContext(FormContext);
  const [editingIndex, setEditingIndex] = useState(-2); // -1: blind box

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
            value={form.maxSupply}
            onChange={(evt) =>
              setForm((prev) => ({
                ...prev,
                maxSupply: parseInt(evt.target.value) || 1,
              }))
            }
            fullWidth
          />
        </CardContent>
      </FieldCard>
      {form.distributionMode === "blind-box" && (
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
                <TokenImgPreview image={form.blindBox.tokenImage} />
                <Box sx={{ flex: "1", height: "200px", overflow: "auto" }}>
                  <CardContent
                    sx={{
                      position: "relative",
                      paddingBottom: "calc(24px + 0.75rem) !important",
                      height: "calc(100% - 40px - 0.75rem)",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {form.blindBox.tokenName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {form.blindBox.tokenDescription}
                    </Typography>
                  </CardContent>
                </Box>
              </CardActionArea>
            </TokenCard>
          </CardContent>
        </FieldCard>
      )}
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Tokens
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The setting will be applied to all tokens before revealed.
          </Typography>
          {form.tokens.map((token, id) => (
            <TokenCard key={"token-" + id}>
              <CardActionArea sx={{ display: "flex" }}>
                <TokenImgPreview image={token.tokenImage} />
                <Box sx={{ flex: "1", height: "200px", overflow: "auto" }}>
                  <CardContent
                    sx={{
                      position: "relative",
                      paddingBottom: "calc(24px + 0.75rem) !important",
                      height: "calc(100% - 40px - 0.75rem)",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {token.tokenName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {token.tokenDescription}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ position: "absolute", bottom: "24px" }}
                    >
                      Supply: {token.tokenAmount}
                    </Typography>
                  </CardContent>
                </Box>
              </CardActionArea>
            </TokenCard>
          ))}
          <DropzoneBox>
            <p>
              Drop or <Button variant="text">Pick Files</Button> to add new
              tokens
            </p>
          </DropzoneBox>
        </CardContent>
      </FieldCard>
      <Modal
        open={editingIndex >= -1}
        onClose={() => setEditingIndex(-2)}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          onClick={() => setForm((prev) => ({ ...prev, step: 4 }))}
        >
          Next
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => setForm((prev) => ({ ...prev, step: 2 }))}
        >
          Back
        </Button>
      </Box>
    </StepBox>
  );
}
