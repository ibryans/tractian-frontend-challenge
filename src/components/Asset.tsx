import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { useState } from "react";
import useAssets from "../store/useAssets";
import Asset from "../models/Asset";
import { GrCube } from "react-icons/gr";
import { PiCubeFocusBold } from "react-icons/pi";
import { FaCircle } from "react-icons/fa";
import useProduct from "../store/useProduct";
import { FaBolt } from "react-icons/fa6";

type Props = {
    currentAsset: Asset;
    assets: Asset[];
}

export default function AssetComponent({ currentAsset, assets }: Props) {
    const [showSubAssets, setShowSubAssets] = useState<boolean>(false)

    const { assets: allAssets} = useAssets();
    const { product, select: selectProduct } = useProduct();

    const handleClick = () => {
        if (assets.length > 0)
            setShowSubAssets(!showSubAssets)
        else if (currentAsset.sensorType) {
            selectProduct(currentAsset)
        }
    }

    return (
        <>
            <button onClick={handleClick} className={`flex space-x-2 items-center ${product?.id === currentAsset.id ? 'bg-blue-500 text-white p-1' : ''} rounded`}>
                { assets.length > 0 && 
                    <>
                        { showSubAssets 
                            ? <BiChevronDown className="w-5 h-5 "/> 
                            : <BiChevronRight className="w-5 h-5 "/>
                        }
                    </>
                }
                { currentAsset.sensorType 
                    ? <PiCubeFocusBold className={`${product?.id === currentAsset.id ? 'text-white' : 'text-blue-500'} w-5 h-5`}/>
                    : <GrCube className="text-blue-500 w-5 h-5"/>
                }    
                <span>{ currentAsset.name }</span>
                { currentAsset.sensorType === 'energy' && <FaBolt className="text-green-500 w-4 h-4"/> }
                { currentAsset.status === 'operating' && <FaCircle className="text-green-500 w-2.5 h-2.5"/> }
                { currentAsset.status === 'alert' && <FaCircle className="text-red-500 w-2.5 h-2.5"/> }
            </button>
            { assets.length > 0 &&
                <div className={`flex flex-col space-y-3 ml-2 pl-5 border-l border-gray-300 dark:border-gray-600 ${showSubAssets ? 'flex' : 'hidden'} `}>
                    {assets.map((asset) => (
                        <AssetComponent
                            key={asset.id}
                            currentAsset={asset} 
                            assets={allAssets.filter((a) => a.parentId == asset.id)}
                        />
                    ))}
                </div>
            }
        </>
    )
}