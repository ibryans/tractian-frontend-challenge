import { create } from "zustand";
import Asset from "../models/Asset";

type AssetsState = {
    assets: Asset[];
    update: (assets: Asset[]) => void
}

const useAssets = create<AssetsState>((set) => ({
    assets: [],
    update: (assets: Asset[]) => set(() => ({ assets }))
}));

export default useAssets