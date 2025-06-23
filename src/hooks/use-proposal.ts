import { create } from "zustand";

type ProposalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewProposalSheet = create<ProposalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const useEditProposalSheet = create<ProposalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
