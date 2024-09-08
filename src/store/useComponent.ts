import { create } from "zustand";
import Asset from "../models/Asset";

type ComponentState = {
    component: Asset | null;
    select: (component: Asset | null) => void
}

const useComponent = create<ComponentState>((set) => ({
    component: null,
    select: (component: Asset | null) => set(() => ({ component }))
}));

export default useComponent