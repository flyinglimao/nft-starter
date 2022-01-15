import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  InputAdornment,
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
  const [collectionImageName, setCollectionImageName] = useState<string>("");
  const [form, setForm] = useContext(FormContext);

  return (
    <StepBox>
      <Typography variant="subtitle1" gutterBottom>
        STEP 1
      </Typography>
      <Typography variant="h4" gutterBottom>
        Collection Information
      </Typography>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Collection Name
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The full name of your NFT collection. This will be used in the Sale
            Page and other apps (e.g. OpenSea).
          </Typography>
          <TextField
            label="Enter Collection Name *"
            variant="standard"
            fullWidth
            value={form.collectionName}
            onChange={(evt) =>
              setForm((prev) => ({
                ...prev,
                collectionName: evt.target.value || "",
              }))
            }
          />
        </CardContent>
      </FieldCard>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Collection Symbol
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The symbol of your NFT collection. This may be used in users'
            wallet.
          </Typography>
          <TextField
            label="Enter Collection Symbol *"
            variant="standard"
            fullWidth
            value={form.collectionSymbol}
            onChange={(evt) =>
              setForm((prev) => ({
                ...prev,
                collectionSymbol: evt.target.value || "",
              }))
            }
          />
        </CardContent>
      </FieldCard>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Collection Description
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The description of your NFT collection. This will be used in the
            other apps (e.g. OpenSea). If you need to provide some information
            about the sale, there is another place for this later.
          </Typography>
          <TextField
            label="Enter Collection Description *"
            variant="standard"
            fullWidth
            multiline
            value={form.collectionDescription}
            onChange={(evt) =>
              setForm((prev) => ({
                ...prev,
                collectionDescription: evt.target.value || "",
              }))
            }
          />
        </CardContent>
      </FieldCard>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Collection Image
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The image of your NFT collection. This will be used in the Sale Page
            and other apps (e.g. OpenSea).
          </Typography>
          <TextField
            label="Enter Collection Image *"
            variant="standard"
            fullWidth
            disabled
            value={collectionImageName}
            InputProps={{
              endAdornment: (
                <label htmlFor="collection-img">
                  <input
                    id="collection-img"
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(evt) => {
                      if (evt.target.files?.[0])
                        setCollectionImageName(evt.target.files?.[0].name);
                    }}
                  />
                  <Button variant="contained" component="span">
                    Upload
                  </Button>
                </label>
              ),
            }}
          />
        </CardContent>
      </FieldCard>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Collection Website
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The website of your NFT collection. This will be used in the Sale
            Page and other apps (e.g. OpenSea). Leave it blank to use the Sale
            Page.
          </Typography>
          <TextField
            label="Enter Collection Website"
            variant="standard"
            fullWidth
            value={form.collectionWebsite}
            onChange={(evt) =>
              setForm((prev) => ({
                ...prev,
                collectionWebsite: evt.target.value || "",
              }))
            }
          />
        </CardContent>
      </FieldCard>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Collection Royalty
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The royalty of your NFT collection. Note that whether you can
            receive royalty depends on the marketplace.
          </Typography>
          <TextField
            label="Enter Collection Royalty"
            variant="standard"
            type="number"
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            value={(form.collectionRoyalty / 100).toLocaleString("en", {
              maximumFractionDigits: 2,
              useGrouping: false,
            })}
            onChange={(evt) =>
              setForm((prev) => ({
                ...prev,
                collectionRoyalty: parseFloat(evt.target.value) * 100 || 0,
              }))
            }
          />
        </CardContent>
      </FieldCard>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Collection Royalty Recipient
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The royalty recipient of your NFT collection. Note that whether you
            can receive royalty depends on the marketplace.
          </Typography>
          <TextField
            label="Enter Collection Royalty Recipient"
            placeholder="0x"
            variant="standard"
            fullWidth
            value={form.collectionRoyaltyRecipient}
            onChange={(evt) =>
              setForm((prev) => ({
                ...prev,
                collectionRoyaltyRecipient: evt.target.value || "",
              }))
            }
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
          onClick={() => setForm((prev) => ({ ...prev, step: 2 }))}
        >
          Next
        </Button>
      </Box>
    </StepBox>
  );
}
