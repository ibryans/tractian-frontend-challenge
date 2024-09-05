import { create } from "zustand";
import Company from "../models/Company";

type CompanyState = {
    company: Company | null;
    select: (company: Company) => void
}

const useCompany = create<CompanyState>((set) => ({
    company: null,
    select: (company: Company) => set(() => ({ company }))
}));

export default useCompany