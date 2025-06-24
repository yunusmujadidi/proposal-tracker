import { create } from "zustand";
import { Proposal } from "../../generated/prisma";

type NewProposalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

type EditProposalState = {
  isOpen: boolean;
  onOpen: (proposal: Proposal) => void;
  onClose: () => void;
  proposal: Proposal | null;
};

export const useNewProposalSheet = create<NewProposalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useEditProposalSheet = create<EditProposalState>((set) => ({
  isOpen: false,
  proposal: null,
  onOpen: (proposal) => set({ isOpen: true, proposal }),
  onClose: () => set({ isOpen: false }),
}));
