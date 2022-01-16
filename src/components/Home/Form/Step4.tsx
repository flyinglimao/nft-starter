import React, { useCallback, useContext, useState } from "react";
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
import MDEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import { FormContext } from "../Form";
import { Web3Provider } from "@ethersproject/providers";
import { ContractFactory } from "@ethersproject/contracts";
import Yuan from "../../../yuan.json";

const StepBox = styled(Box)``;
const FieldCard = styled(Card)`
  padding: 1.5rem 1rem;
  margin-bottom: 2rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const mdParser = new MarkdownIt();

export default function Step4(): JSX.Element {
  const [form, setForm] = useContext(FormContext);
  const [bannerImageName, setBannerImageName] = useState<string>("");
  const [processing, setProcessing] = useState(false);

  const deployContract = useCallback(async () => {
    if (!(window as any).ethereum) throw new Error("Wallet not detected");

    const provider = new Web3Provider((window as any).ethereum);
    await provider.send("eth_requestAccounts", []);
    const { chainId } = await provider.getNetwork();
    if (chainId !== 137 && chainId !== 80001) {
      try {
        await provider.send("wallet_switchEthereumChain", [
          { chainId: "0x89" },
        ]);
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await provider.send("wallet_addEthereumChain", [
              {
                chainId: "0x89",
                chainName: "Polygon Mainnet",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://polygonscan.com/"],
                rpcUrls: ["https://polygon-rpc.com/"],
              },
            ]);
            await provider.send("wallet_switchEthereumChain", [
              { chainId: "0x89" },
            ]);
          } catch (addError) {
            throw new Error("Change network failed");
          }
        }
        throw new Error("Change network failed");
      }
    }
    const signer = provider.getSigner();
    const contractFactory = new ContractFactory(
      Yuan.abi,
      Yuan.bytecode,
      signer
    );
    const contract = await contractFactory.deploy(
      form.collectionName,
      form.collectionSymbol,
      form.tokens.reduce((a, b) => a + b.tokenAmount, 0),
      form.quotaPerAddr,
      "",
      Math.floor(form.saleStartAt.getTime() / 1000),
      Math.floor(form.saleEndAt.getTime() / 1000),
      form.saleMode === "free",
      ""
    );
    await contract.deployTransaction.wait();
    setForm((prev) => ({ ...prev, address: contract.address }));
  }, []);

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
            value={form.saleWebsite}
            onChange={(evt) =>
              setForm((prev) => ({
                ...prev,
                saleWebsite: evt.target.value || "",
              }))
            }
          />
        </CardContent>
      </FieldCard>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Banner
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            The image is used as banner.
          </Typography>
          <TextField
            label="Enter Sale Banner Image *"
            variant="standard"
            fullWidth
            disabled
            value={bannerImageName}
            InputProps={{
              endAdornment: (
                <label htmlFor="banner-img">
                  <input
                    id="banner-img"
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(evt) => {
                      if (evt.target.files?.[0]) {
                        setBannerImageName(evt.target.files?.[0].name);
                        const fileReader = new FileReader();
                        fileReader.onloadend = (evt) => {
                          setForm((prev) => ({
                            ...prev,
                            banner: evt.target.result as string,
                          }));
                        };
                        fileReader.readAsDataURL(evt.target.files?.[0]);
                      }
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
            Sale Introduction
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            This shows in the sale page, you can use Markdown syntax.
          </Typography>
          <MDEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            value={form.introduction}
            onChange={({ text }) =>
              setForm((prev) => ({
                ...prev,
                introduction: text,
              }))
            }
          />
        </CardContent>
      </FieldCard>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Preview Website
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              window.localStorage.setItem(
                "preview",
                JSON.stringify({
                  collectionName: form.collectionName,
                  tokens: form.tokens,
                  banner: form.banner,
                  introduction: form.introduction,
                  saleStartAt: form.saleStartAt.getTime(),
                  saleEndAt: form.saleEndAt.getTime(),
                  quotaPerAddr: form.quotaPerAddr,
                })
              );
              open("/preview", "_blank");
            }}
          >
            Preview Sale Website
          </Button>
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
          onClick={async () => {
            try {
              setProcessing(true);
              await deployContract();
              setForm((prev) => ({
                ...prev,
                step: form.saleMode === "whitelist" ? 5 : 6,
              }));
            } catch (err) {
              setProcessing(false);
              console.error(err);
            }
          }}
          disabled={processing}
        >
          {processing ? "Processing" : "Deploy"}
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => setForm((prev) => ({ ...prev, step: 3 }))}
          disabled={processing}
        >
          Back
        </Button>
      </Box>
    </StepBox>
  );
}
