import React, { useCallback, useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { FormContext } from "../Form";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { Interface } from "@ethersproject/abi";
import Yuan from "../../../yuan.json";

const StepBox = styled(Box)``;
const FieldCard = styled(Card)`
  padding: 1.5rem 1rem;
  margin-bottom: 2rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const CollectionInterface = new Interface(Yuan.abi);

export default function Step5(): JSX.Element {
  const [form, setForm] = useContext(FormContext);
  const [addresses, setAddresses] = useState("");
  const [processing, setProcessing] = useState(false);

  const processWhitelists = useCallback(async () => {
    setProcessing(true);

    const provider = new Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    const { chainId } = await provider.getNetwork();
    if (chainId !== 137 && chainId !== 80001) {
      try {
        await provider.send("wallet_switchEthereumChain", [{ chainId: 137 }]);
        return true;
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await provider.send("wallet_addEthereumChain", [
              {
                chainId: 137,
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
              { chainId: 137 },
            ]);
            return true;
          } catch (addError) {
            throw new Error("Change network failed");
          }
        }
        throw new Error("Change network failed");
      }
    }
    const contract = new Contract(form.address, CollectionInterface, signer);

    const validAddresses = addresses
      .split("\n")
      .filter((e) => e.match(/0x[a-fA-F0-9]{40}/));
    const tx = await contract.setWhitelist(validAddresses);
    const receipt = await tx.wait();
    console.log(receipt);
    setForm((prev) => ({ ...prev, step: 6 }));
  }, [addresses]);
  return (
    <StepBox>
      <Typography variant="subtitle1" gutterBottom>
        STEP 5
      </Typography>
      <Typography variant="h4" gutterBottom>
        Add Addresses to Whitelist, it may need more than one transaction if the
        list is too long.
      </Typography>
      <FieldCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Whitelist
          </Typography>
          <Typography variant="body2" gutterBottom style={{ color: "gray" }}>
            A line for an address.
          </Typography>
          <TextField
            label="Addresses *"
            variant="standard"
            fullWidth
            multiline
            value={addresses}
            onChange={(evt) => setAddresses(evt.target.value)}
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
          onClick={() => {
            processWhitelists();
          }}
          disabled={processing}
        >
          {processing ? "Processing" : "Finish"}
        </Button>
      </Box>
    </StepBox>
  );
}
