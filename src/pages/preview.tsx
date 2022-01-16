import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Container,
  Box,
  Typography,
  ImageList,
  ImageListItem,
  Button,
  Tooltip,
  TextField,
  InputAdornment,
} from "@mui/material";
import styled from "@emotion/styled";
import { Token } from "components/Home/Form";
import MarkdownIt from "markdown-it";
import {
  Network,
  TransactionResponse,
  Web3Provider,
} from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { Interface } from "@ethersproject/abi";
import Yuan from "../yuan.json";

const CollectionInterface = new Interface(Yuan.abi);

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

enum WalletState {
  NOT_INSTALLED,
  NOT_CONNECTED,
  WRONG_NETWORK,
  NONE,
}

const ErrorMessage: { [key in WalletState]: string } = {
  [WalletState.NOT_INSTALLED]: "Wallet not found",
  [WalletState.NOT_CONNECTED]: "Wallet not connected",
  [WalletState.WRONG_NETWORK]: "Using wrong network",
  [WalletState.NONE]: "",
};

export default function () {
  const [nonce, setNonce] = useState(0);
  const provider = useRef<Web3Provider>(null);
  const [form, setForm] = useState<{
    collectionName: string;
    banner: string;
    introduction: string;
    saleStartAt: number;
    saleEndAt: number;
    tokens: Token[];
    address: string;
    quotaPerAddr: number;
  }>({
    collectionName: "@@Collection Name@@",
    tokens: [],
    banner: "@@Banner@@",
    introduction: "@@introduction@@",
    saleStartAt: 1,
    saleEndAt: 2147483647,
    address: "0x91f6f85525765D9C0B91C64acb793782671137c8",
    quotaPerAddr: 1,
  });

  useEffect(() => {
    const previewData = window.localStorage.getItem("preview");
    if (previewData) {
      const form = JSON.parse(previewData);
      form.saleStartAt = new Date(form.saleStartAt);
      form.saleEndAt = new Date(form.saleEndAt);
      if (!form.address)
        form.address = "0x91f6f85525765D9C0B91C64acb793782671137c8";
      setForm(form);
    }
  }, []);

  const [walletState, setWalletState] = useState<WalletState>(
    WalletState.NOT_CONNECTED
  );
  const [address, setAddress] = useState("");
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  useEffect(() => {
    if (!(window as any).ethereum) {
      setWalletState(WalletState.NOT_INSTALLED);
    } else {
      provider.current = new Web3Provider((window as any).ethereum, "any");
      provider.current.on("network", (newNetwork: Network) => {
        provider.current.listAccounts().then((accs) => {
          if (accs.length === 0) setWalletState(WalletState.NOT_CONNECTED);
          else if (newNetwork.chainId !== 80001)
            setWalletState(WalletState.WRONG_NETWORK);
          else setWalletState(WalletState.NONE);
        });
      });
      setInterval(() => {
        provider.current.listAccounts().then((accs) => {
          if (accs.length === 0) setWalletState(WalletState.NOT_CONNECTED);
          else if (accs[0] !== address) setAddress(accs[0]);
        });
      }, 1000);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    await provider.current.send("eth_requestAccounts", []);
    setWalletState(WalletState.WRONG_NETWORK);
    const { chainId } = await provider.current.getNetwork();
    if (chainId === 80001) setWalletState(WalletState.NONE);
  }, []);

  const changeNetwork = useCallback(async () => {
    try {
      await provider.current.send("wallet_switchEthereumChain", [
        { chainId: "0x" + (80001).toString(16) },
      ]);
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await provider.current.send("wallet_addEthereumChain", [
            {
              chainId: "0x" + (80001).toString(16),
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
          await provider.current.send("wallet_switchEthereumChain", [
            { chainId: "0x" + (80001).toString(16) },
          ]);
        } catch (addError) {}
      }
    }
  }, []);

  const [mintAmount, setMintAmount] = useState(1);
  const [minted, setMinted] = useState(0);
  const [isPublicMint, setIsPublicMint] = useState(false);
  useEffect(() => {
    const contract = new Contract(
      form.address,
      CollectionInterface,
      provider.current
    );
    if (address)
      Promise.all([
        contract.isWhitelist(address),
        contract.isPublicMint(),
        contract.numOfAddressMinted(address),
      ]).then(([whitelist, publicMint, minted]) => {
        setIsWhitelisted(whitelist || publicMint);
        setIsPublicMint(publicMint);
        setMinted(minted.toNumber());
      });
  }, [address, nonce]);

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
          <Tooltip
            title={
              ErrorMessage[walletState] ||
              (!isWhitelisted ? "Not in whitelist" : "")
            }
            placement="top"
          >
            <span>
              {walletState === WalletState.NOT_INSTALLED && (
                <Button variant="contained" disabled>
                  Connect Wallet
                </Button>
              )}
              {walletState === WalletState.NOT_CONNECTED && (
                <Button variant="contained" onClick={() => connectWallet()}>
                  Connect Wallet
                </Button>
              )}
              {walletState === WalletState.WRONG_NETWORK && (
                <Button variant="contained" onClick={() => changeNetwork()}>
                  Change Network
                </Button>
              )}
              {walletState === WalletState.NONE && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "center",
                  }}
                >
                  {form.quotaPerAddr - minted > 1 && (
                    <TextField
                      variant="standard"
                      label="Mint amount"
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            / {form.quotaPerAddr - minted}
                          </InputAdornment>
                        ),
                      }}
                      value={mintAmount}
                      onChange={(evt) =>
                        setMintAmount(parseInt(evt.target.value) || 1)
                      }
                      sx={{ marginRight: "12px" }}
                    />
                  )}
                  <Button
                    variant="contained"
                    onClick={() => {
                      const contract = new Contract(
                        form.address,
                        CollectionInterface,
                        provider.current.getSigner(address)
                      );
                      if (isPublicMint) {
                        contract
                          .publicMint(mintAmount)
                          .then((tx: TransactionResponse) => tx.wait())
                          .then(() => {
                            setNonce((e) => e + 1);
                            setMintAmount(1);
                          });
                      } else {
                        contract
                          .whitelistMint(mintAmount)
                          .then((tx: TransactionResponse) => tx.wait())
                          .then(() => {
                            setNonce((e) => e + 1);
                            setMintAmount(1);
                          });
                      }
                    }}
                    disabled={!isWhitelisted}
                  >
                    Mint
                  </Button>
                </Box>
              )}
            </span>
          </Tooltip>
        </Box>
      </Container>
    </>
  );
}
