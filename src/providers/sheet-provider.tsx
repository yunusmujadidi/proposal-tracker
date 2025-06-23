import { NewProposalSheet } from "@/components/sheets/new-proposal-sheet";

const SheetProviderClient = () => {
  return (
    <>
      <NewProposalSheet />
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
