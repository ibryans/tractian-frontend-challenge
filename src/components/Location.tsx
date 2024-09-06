import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import Location from "../models/Location";
import { FiMapPin } from "react-icons/fi";
import { useState } from "react";
import useLocations from "../store/useLocations";

type Props = {
    currentLocation: Location;
    locations: Location[];
}

export default function LocationComponent({ currentLocation, locations }: Props) {
    const [showSubLocations, setShowSubLocations] = useState<boolean>(false)

    const allLocations = useLocations((state) => state.locations);

    const toggleShow = () => setShowSubLocations(!showSubLocations)

    return (
        <>
            <button onClick={toggleShow} className="flex space-x-2 items-center cursor-pointer">
                { locations.length > 0 && 
                    <>
                        { showSubLocations 
                            ? <BiChevronDown className="w-5 h-5"/> 
                            : <BiChevronRight className="w-5 h-5"/>
                        }
                    </>
                }
                <FiMapPin className="text-blue-500 w-5 h-5"/>    
                <span>{ currentLocation.name }</span>
            </button>
            <div className={`flex flex-col space-y-3 ml-2 pl-12 border-l border-gray-300 dark:border-gray-600 ${showSubLocations ? 'flex' : 'hidden'}`}>
                {locations.map((loc) => (
                    <LocationComponent 
                        currentLocation={loc} 
                        locations={allLocations.filter((l) => l.parentId == loc.id)}
                    />
                ))}
            </div>
        </>
    )
}