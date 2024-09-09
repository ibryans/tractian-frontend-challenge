import useCompany from "../store/useCompany";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import Asset from "../models/Asset";
import Location from "../models/Location";
import LocationComponent from "./Location";
import AssetComponent from "./Asset";
import { useEffect, useState } from "react";

export interface TreeNode {
    id: string;
    name: string;
    parentId: string | null;
    sensorId?: string;
    sensorType?: string;
    status?: string;
    gatewayId?: string;
    locationId?: string | null;
    children: TreeNode[];
    isAsset?: boolean;
}

export interface TreeNodeMap {
    [id: string]: TreeNode
}

export default function AssetsTree() {
    const [tree, setTree] = useState<TreeNode[]>([]);
    const company = useCompany((state) => state.company)

    const { data: locations } = useQuery<{ data: Location[] }>({
        queryKey: ['locations', company?.id],
        queryFn: async () => await api.get(`/companies/${company?.id}/locations`),
    })

    const { data: assets } = useQuery<{ data: Asset[] }>({
        queryKey: ['assets', company?.id],
        queryFn: async () =>await api.get(`/companies/${company?.id}/assets`)
    })

    const buildTree = (locations: Location[], assets: Asset[]) => {
        const locationMap: TreeNodeMap = {}
        const assetMap: TreeNodeMap = {}

        // Criando um hashmap pra otimizar a pesquisa por id
        locations.forEach(location => locationMap[location.id] = {...location, children: []})
        assets.forEach(asset => assetMap[asset.id] = {...asset, isAsset: true, children: []})

        // Associa as Sub Locations
        locations.forEach(location => {
            if (location.parentId)
                locationMap[location.parentId]?.children.push(locationMap[location.id])
        })

        // Associa os sub Assets
        assets.forEach(asset => {
            if (asset.parentId) {
                if (assetMap[asset.parentId])
                    assetMap[asset.parentId]?.children.push(assetMap[asset.id])
            } else if (asset.locationId) {
                locationMap[asset.locationId]?.children.push(assetMap[asset.id])
            }
        })

        // Locations Raiz
        const rootLocations = Object.values(locationMap).filter(location => !location.parentId);
        
        // Assets raiz
        const rootAssets = Object.values(assetMap).filter(asset => !asset.parentId && !asset.locationId);

        return [...rootLocations, ...rootAssets];
    }

    // Cria a arvore apenas quando location ou assets mudar
    useEffect(() => setTree(
        buildTree(
            locations ? locations.data : [],
            assets ? assets.data : []
        )
    ), [locations, assets])

    return (
        <div className="flex flex-col space-y-4 border-t border-gray-300 dark:border-gray-600 p-3 overflow-auto">
            {tree?.map((item) => (
                item.isAsset 
                    ? <AssetComponent key={item.id} item={item}/>
                    : <LocationComponent key={item.id} item={item}/>
            ))}
        </div>
    )
}