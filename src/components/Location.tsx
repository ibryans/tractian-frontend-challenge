import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import Location from "../models/Location";
import { FiMapPin } from "react-icons/fi";
import { useState } from "react";
import useLocations from "../store/useLocations";
import useAssets from "../store/useAssets";
import AssetComponent from "./Asset";

type Props = {
    currentLocation: Location;
    locations: Location[];
}

export default function LocationComponent({ currentLocation, locations }: Props) {
    const [showSubLocations, setShowSubLocations] = useState<boolean>(false)

    const { locations: allLocations } = useLocations();
    const { assets: allAssets } = useAssets();

    const toggleShow = () => {
        if (locations.length > 0 || assets.length > 0)
            setShowSubLocations(!showSubLocations)
    }

    const assets = allAssets.filter((asset) => asset.locationId === currentLocation.id)

    return (
        <>
            <button onClick={toggleShow} className={`flex space-x-2 items-center`}>
                { (locations.length > 0 || assets.length > 0) && 
                    <>
                        { showSubLocations 
                            ? <BiChevronDown className="w-5 h-5 "/> 
                            : <BiChevronRight className="w-5 h-5 "/>
                        }
                    </>
                }
                <FiMapPin className="text-blue-500 w-5 h-5"/>    
                <span>{ currentLocation.name }</span>
            </button>
            <div className={`flex flex-col space-y-3 ml-2 pl-5 border-l border-gray-300 dark:border-gray-600 ${showSubLocations ? 'flex' : 'hidden'} `}>
                {locations.length == 0 
                    ? assets.map((a1) => (
                        <AssetComponent
                            key={a1.id}
                            currentAsset={a1}
                            assets={allAssets.filter((a2) => a2.parentId === a1.id)}
                        />
                    ))
                    : locations.map((loc) => (
                    <LocationComponent 
                        currentLocation={loc} 
                        locations={allLocations.filter((l) => l.parentId == loc.id)}
                    />
                ))}
            </div>
        </>
    )
}