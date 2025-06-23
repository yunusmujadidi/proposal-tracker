import { ProposalSheet } from "@/components/sheets/proposal-sheet";

const SheetProviderClient = () => {
  return (
    <>
      <ProposalSheet />
    </>
  );
};

const SheetProvider = () => {
  return (
    <>
      <SheetProviderClient />
    </>
  );
};

export default SheetProvider;
