import { create } from "zustand";
import Location from "../models/Location";

type LocationsState = {
    locations: Location[];
    update: (locations: Location[]) => void
}

const useLocations = create<LocationsState>((set) => ({
    locations: [],
    update: (locations: Location[]) => set(() => ({ locations }))
}));

export default useLocations