import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import { useState } from "react";
import AssetComponent from "./Asset";
import { TreeNode } from "./AssetsTree";

type Props = {
    item: TreeNode
}

export default function LocationComponent({ item }: Props) {
    const [showSubLocations, setShowSubLocations] = useState<boolean>(false)

    const toggleShow = () => {
        if (item.children.length > 0)
            setShowSubLocations(!showSubLocations)
    }

    return (
        <>
            <button onClick={toggleShow} className={`flex space-x-2 items-center`}>
                {item.children.length > 0 && 
                    <>
                        { showSubLocations 
                            ? <BiChevronDown className="w-5 h-5 "/> 
                            : <BiChevronRight className="w-5 h-5 "/>
                        }
                    </>
                }
                <FiMapPin className="text-blue-500 w-5 h-5"/>    
                <span className="truncate">{ item.name }</span>
            </button>
            { showSubLocations && 
                <div className={`flex flex-col space-y-3 ml-2 pl-5 border-l border-gray-300 dark:border-gray-600`}>
                    {item.children.map((item) => (
                        item.isAsset 
                            ? <AssetComponent key={item.id} item={item} />
                            : <LocationComponent key={item.id} item={item} />
                    ))}
                </div>
            }
        </>
    )
}