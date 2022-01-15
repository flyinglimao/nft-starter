import React, { useCallback, useContext, useEffect, useState } from "react";
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
import { useDropzone } from "react-dropzone";

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

function AttributesTable(props: {
  attributes: Array<{ type: string; value: string }>;
  setAttributes: React.Dispatch<
    React.SetStateAction<Array<{ type: string; value: string }>>
  >;
}) {
  const [newType, setNewType] = useState("");
  const [newValue, setNewValue] = useState("");

  const onNewType = useCallback(() => {
    if (newType.length + newValue.length > 0) {
      props.setAttributes((prev) => [
        ...prev,
        { type: newType, value: newValue },
      ]);
      setNewType("");
      setNewValue("");
    }
  }, [newType, newValue]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Trait</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.attributes
            .filter(
              (attribute) => attribute.type.length + attribute.value.length > 0
            )
            .map((attribute, id) => (
              <TableRow key={"attribute" + id}>
                <TableCell>
                  <TextField
                    placeholder="Type"
                    variant="standard"
                    fullWidth
                    value={attribute.type}
                    onChange={(evt) => {
                      if (
                        evt.target.value.length + attribute.value.length >
                        0
                      ) {
                        props.setAttributes((prev) => [
                          ...prev.slice(0, id),
                          {
                            type: evt.target.value,
                            value: attribute.value,
                          },
                          ...prev.slice(id + 1),
                        ]);
                      } else {
                        props.setAttributes((prev) => [
                          ...prev.slice(0, id),
                          ...prev.slice(id + 1),
                        ]);
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    placeholder="Value"
                    variant="standard"
                    fullWidth
                    value={attribute.value}
                    onChange={(evt) => {
                      if (
                        evt.target.value.length + attribute.value.length >
                        0
                      ) {
                        props.setAttributes((prev) => [
                          ...prev.slice(0, id),
                          {
                            type: attribute.type,
                            value: evt.target.value,
                          },
                          ...prev.slice(id + 1),
                        ]);
                      } else {
                        props.setAttributes((prev) => [
                          ...prev.slice(0, id),
                          ...prev.slice(id + 1),
                        ]);
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell>
              <TextField
                placeholder="Type"
                variant="standard"
                fullWidth
                value={newType}
                onChange={(evt) => setNewType(evt.target.value)}
                onBlur={onNewType}
              />
            </TableCell>
            <TableCell>
              <TextField
                placeholder="Value"
                variant="standard"
                fullWidth
                value={newValue}
                onChange={(evt) => setNewValue(evt.target.value)}
                onBlur={onNewType}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function (): JSX.Element {
  const [form, setForm] = useContext(FormContext);
  const [editingIndex, setEditingIndex] = useState(-2); // -1: blind box
  const [attributes, setAttributes] = useState<
    Array<{ type: string; value: string }>
  >([]);

  useEffect(() => {
    if (editingIndex === -1) {
      setForm((prev) => ({
        ...prev,
        blindBox: {
          ...prev.blindBox,
          tokenAttributes: attributes,
        },
      }));
    } else if (editingIndex >= 0) {
      setForm((prev) => ({
        ...prev,
        tokens: [
          ...prev.tokens.slice(0, editingIndex),
          {
            ...prev.tokens[editingIndex],
            tokenAttributes: attributes,
          },
          ...prev.tokens.slice(editingIndex + 1),
        ],
      }));
    }
  }, [attributes]);

  const handleFiles = useCallback((files: File[]) => {
    files.forEach((file) => {
      const fileReader = new FileReader();
      fileReader.onloadend = (evt) => {
        setForm((prev) => ({
          ...prev,
          tokens: [
            ...prev.tokens,
            {
              tokenImage: evt.target.result as string,
              tokenName: file.name,
              tokenDescription: "",
              tokenAttributes: [],
              tokenAmount: 1,
              tokenWebsite: "",
            },
          ],
        }));
      };
      fileReader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDropAccepted: handleFiles,
  });

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
              <CardActionArea
                sx={{ display: "flex" }}
                onClick={() => {
                  setEditingIndex(-1);
                  setAttributes(form.blindBox.tokenAttributes);
                }}
              >
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
              <CardActionArea
                sx={{ display: "flex" }}
                onClick={() => {
                  setEditingIndex(id);
                  setAttributes(form.tokens[id].tokenAttributes);
                }}
              >
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
          <DropzoneBox {...getRootProps()}>
            <input {...getInputProps()} />
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
              src={
                editingIndex === -1
                  ? form.blindBox.tokenImage
                  : form.tokens[editingIndex]?.tokenImage
              }
              style={{ width: "calc(100% + 48px)", margin: "0 -24px" }}
            />
            <TextField
              label="Token Name *"
              variant="standard"
              fullWidth
              value={
                editingIndex === -1
                  ? form.blindBox.tokenName
                  : form.tokens[editingIndex]?.tokenName
              }
              onChange={(evt) => {
                if (editingIndex === -1) {
                  setForm((prev) => ({
                    ...prev,
                    blindBox: {
                      ...prev.blindBox,
                      tokenName: evt.target.value,
                    },
                  }));
                } else {
                  setForm((prev) => ({
                    ...prev,
                    tokens: [
                      ...prev.tokens.slice(0, editingIndex),
                      {
                        ...prev.tokens[editingIndex],
                        tokenName: evt.target.value,
                      },
                      ...prev.tokens.slice(editingIndex + 1),
                    ],
                  }));
                }
              }}
            />
            <TextField
              label="Token Description *"
              variant="standard"
              fullWidth
              multiline
              value={
                editingIndex === -1
                  ? form.blindBox.tokenDescription
                  : form.tokens[editingIndex]?.tokenDescription
              }
              onChange={(evt) => {
                if (editingIndex === -1) {
                  setForm((prev) => ({
                    ...prev,
                    blindBox: {
                      ...prev.blindBox,
                      tokenDescription: evt.target.value,
                    },
                  }));
                } else {
                  setForm((prev) => ({
                    ...prev,
                    tokens: [
                      ...prev.tokens.slice(0, editingIndex),
                      {
                        ...prev.tokens[editingIndex],
                        tokenDescription: evt.target.value,
                      },
                      ...prev.tokens.slice(editingIndex + 1),
                    ],
                  }));
                }
              }}
            />
            <TextField
              label="Token Website"
              variant="standard"
              fullWidth
              value={
                editingIndex === -1
                  ? form.blindBox.tokenWebsite
                  : form.tokens[editingIndex]?.tokenWebsite
              }
              onChange={(evt) => {
                if (editingIndex === -1) {
                  setForm((prev) => ({
                    ...prev,
                    blindBox: {
                      ...prev.blindBox,
                      tokenWebsite: evt.target.value,
                    },
                  }));
                } else {
                  setForm((prev) => ({
                    ...prev,
                    tokens: [
                      ...prev.tokens.slice(0, editingIndex),
                      {
                        ...prev.tokens[editingIndex],
                        tokenWebsite: evt.target.value,
                      },
                      ...prev.tokens.slice(editingIndex + 1),
                    ],
                  }));
                }
              }}
            />
            <AttributesTable
              attributes={attributes}
              setAttributes={setAttributes}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              <Button variant="contained" onClick={() => setEditingIndex(-2)}>
                FINISH
              </Button>
              {editingIndex >= 0 && (
                <Button
                  variant="text"
                  onClick={() => {
                    setForm((prev) => ({
                      ...prev,
                      tokens: form.tokens.filter(
                        (_, id) => id !== editingIndex
                      ),
                    }));
                    setEditingIndex(-2);
                  }}
                >
                  DELETE
                </Button>
              )}
            </Box>
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
