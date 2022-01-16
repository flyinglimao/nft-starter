import React, { createContext, useEffect, useState } from "react";
import { Container, Paper } from "@mui/material";
import styled from "@emotion/styled";
import Step1 from "./Form/Step1";
import Step2 from "./Form/Step2";
import Step3 from "./Form/Step3";
import Step4 from "./Form/Step4";
import Step5 from "./Form/Step5";
import Step6 from "./Form/Step6";

const FormContainer = styled(Container)`
  padding: 1.5rem 24px;
`;
const FormBox = styled(Paper)`
  padding: 4rem;
`;

export interface Token {
  tokenImage: string;
  tokenName: string;
  tokenDescription: string;
  tokenAttributes: Array<{ type: string; value: string }>;
  tokenAmount: number;
  tokenWebsite: string;
  tokenAnimationURL: string;
  tokenYoutubeURL: string;
}
export interface Form {
  collectionName: string;
  collectionSymbol: string;
  collectionDescription: string;
  collectionImage: string;
  collectionWebsite: string;
  collectionRoyalty: number;
  collectionRoyaltyRecipient: string;

  saleMode: string;
  distributionMode: string;
  saleStartAt: Date;
  saleEndAt: Date;
  quotaPerAddr: number;

  blindBox: Token;
  tokens: Token[];

  saleWebsite: string;
  banner: string;
  introduction: string;

  step: number;
  address: string;
  domainToken: string;
  chainId: number;
}
export const FormContext = createContext<
  [Form, React.Dispatch<React.SetStateAction<Form>>] | null
>(null);

export default function Form(): JSX.Element {
  const formState = useState<Form>({
    collectionName: "",
    collectionSymbol: "",
    collectionDescription: "",
    collectionImage: "",
    collectionWebsite: "",
    collectionRoyalty: 0,
    collectionRoyaltyRecipient: "",
    saleMode: "free",
    distributionMode: "direct",
    saleStartAt: new Date(),
    saleEndAt: new Date(new Date().getTime() + 86400 * 1000 * 7),
    quotaPerAddr: 1,
    blindBox: {
      tokenImage:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NIS0v7DwAEmgIyK17SHAAAAABJRU5ErkJggg==",
      tokenName: "Blind Box",
      tokenDescription: "Waiting to be open",
      tokenAttributes: [],
      tokenAmount: 0,
      tokenWebsite: "",
      tokenAnimationURL: "",
      tokenYoutubeURL: "",
    },
    tokens: [],
    saleWebsite: "",
    banner: "",
    introduction: "",
    step: 1,
    address: "",
    domainToken: "",
    chainId: 80001,
  });

  useEffect(() => {
    window.scrollTo({ left: 0, top: 200, behavior: "smooth" });
  }, [formState[0].step]);

  return (
    <FormContext.Provider value={formState}>
      <FormContainer maxWidth="lg">
        <FormBox elevation={1}>
          {formState[0].step === 1 && <Step1 />}
          {formState[0].step === 2 && <Step2 />}
          {formState[0].step === 3 && <Step3 />}
          {formState[0].step === 4 && <Step4 />}
          {formState[0].step === 5 && <Step5 />}
          {formState[0].step === 6 && <Step6 />}
        </FormBox>
      </FormContainer>
    </FormContext.Provider>
  );
}
