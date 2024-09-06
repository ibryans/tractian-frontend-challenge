import useCompany from "../store/useCompany";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import Asset from "../models/Asset";
import Location from "../models/Location";
import useLocations from "../store/useLocations";
import LocationComponent from "./Location";

export default function AssetsTree() {
    const company = useCompany((state) => state.company)
    const updateLocations = useLocations((state) => state.update)

    const { data: locations } = useQuery<{ data: Location[] }>({
        queryKey: ['locations', company?.id],
        queryFn: async () => {
            const response = await api.get(`/companies/${company?.id}/locations`)
            updateLocations(response.data);
            return response;
        },
    })

    const { data: assets } = useQuery<{ data: Asset[] }>({
        queryKey: ['assets', company?.id],
        queryFn: async () => await api.get(`/companies/${company?.id}/assets`)
    })

    const treeConstruction = (locations?: Location[]) => {
        if (!locations) return [];
        const rootLocations = locations.filter((loc) => !loc.parentId);
        const tree: any = rootLocations?.map((loc) => ({
            ...loc,
        }))
        return tree;
    }

    const tree = treeConstruction(locations?.data);

    console.log('~ assets: ', assets)

    return (
        <div className="flex flex-col space-y-4 border-t border-gray-300 dark:border-gray-600 p-3 overflow-auto">
            {tree?.map((item: any) => (
                <LocationComponent 
                    currentLocation={item} 
                    locations={locations 
                        ? locations.data.filter((l) => l.parentId === item.id)
                        : []
                    } 
                />
            ))}
        </div>
    )
}