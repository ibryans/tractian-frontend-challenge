import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { useState } from "react";
import { GrCube } from "react-icons/gr";
import { PiCubeFocusBold } from "react-icons/pi";
import { FaCircle } from "react-icons/fa";
import useComponent from "../store/useComponent";
import { FaBolt } from "react-icons/fa6";
import { TreeNode } from "./AssetsTree";
import Asset from "../models/Asset";

type Props = {
    item: TreeNode;
}

export default function AssetComponent({ item }: Props) {
    const [showSubAssets, setShowSubAssets] = useState<boolean>(false)
    const { component, select: selectComponent } = useComponent();

    const handleClick = () => {
        if (item.children.length > 0)
            setShowSubAssets(!showSubAssets)
        else if (item.sensorType) {
            selectComponent(item as Asset)
        }
    }

    return (
        <>
            <button onClick={handleClick} className={`flex space-x-2 items-center ${component?.id === item.id ? 'bg-blue-500 text-white p-1' : ''} rounded`}>
                { item.children.length > 0 && 
                    <>
                        { showSubAssets 
                            ? <BiChevronDown className="w-5 h-5 "/> 
                            : <BiChevronRight className="w-5 h-5 "/>
                        }
                    </>
                }

                { item.sensorType 
                    ? <PiCubeFocusBold className={`${component?.id === item.id ? 'text-white' : 'text-blue-500'} w-5 h-5`}/>
                    : <GrCube className="text-blue-500 w-5 h-5"/>
                }

                <span className="truncate">
                    { item.name }
                </span>
                
                { item.sensorType && 
                    <>
                        { item.sensorType === 'energy'
                            ? <FaBolt className={`${item.status === 'operating' ? 'text-green-500' : 'text-red-500'} w-4 h-4`}/>
                            : <FaCircle className={`${item.status === 'operating' ? 'text-green-500' : 'text-red-500'} w-2.5 h-2.5`}/>
                        }
                    </>
                }
            </button>
            
            { item.children.length > 0 && showSubAssets &&
                <div className={`flex flex-col space-y-3 ml-2 pl-5 border-l border-gray-300 dark:border-gray-600`}>
                    {item.children.map((asset) => (
                        <AssetComponent
                            key={asset.id}
                            item={asset}
                        />
                    ))}
                </div>
            }
        </>
    )
}