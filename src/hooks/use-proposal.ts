import { create } from "zustand";

type ProposalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewProposal = create<ProposalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useEditProposal = create<ProposalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
