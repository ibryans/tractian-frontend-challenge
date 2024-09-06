import { BiChevronDown } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import useCompany from "../store/useCompany";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
// import Asset from "../models/Asset";
import Location from "../models/Location";

export default function AssetsTree() {
    const company = useCompany((state) => state.company)

    const { data: locations } = useQuery<{ data: Location[] }>({
        queryKey: ['locations', company?.id],
        queryFn: async () => await api.get(`/companies/${company?.id}/locations`),
    })

    // const { data: assets } = useQuery<{ data: Asset[] }>({
    //     queryKey: ['assets', company?.id],
    //     queryFn: async () => await api.get(`/companies/${company?.id}/assets`)
    // })

    const rootLocations = locations?.data.filter((loc) => !loc.parentId);

    const tree = rootLocations?.map((loc) => ({
        ...loc,
        children: locations?.data.filter((l) => l.parentId === loc.id)
    }))


    return (
        <div className="flex flex-col space-y-4 border-t border-gray-300 dark:border-gray-600 p-3 overflow-auto">
            
            {tree?.map((location) => (
                <div className="flex space-x-2 items-center cursor-pointer">
                    <BiChevronDown className="w-5 h-5"/>
                    <FiMapPin className="text-blue-500 w-5 h-5"/> 
                    <span>{ location.name }</span>
                </div>
            ))}
            
        </div>
    )
}