import { EditProposalSheet } from "@/components/sheets/edit-proposal-sheet";
import { NewProposalSheet } from "@/components/sheets/new-proposal-sheet";

const SheetProviderClient = () => {
  return (
    <>
      <NewProposalSheet />
      <EditProposalSheet />
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
