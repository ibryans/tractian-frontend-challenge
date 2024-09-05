import { BiChevronDown } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";

export default function AssetsTree() {
    return (
        <div className="flex flex-col space-y-4 border-t border-gray-300 dark:border-gray-600 p-3">
            
            <div className="flex space-x-2 items-center cursor-pointer">
                <BiChevronDown className="w-5 h-5"/>
                <FiMapPin className="text-blue-500 w-5 h-5"/> 
                <span>PRODUCTION AREA - RAW MATERIAL</span>
            </div>

            <div className="flex space-x-2 items-center cursor-pointer">
                <BiChevronDown className="w-5 h-5"/>
                <FiMapPin className="text-blue-500 w-5 h-5"/> 
                <span>PRODUCTION AREA - RAW MATERIAL</span>
            </div>

            <div className="flex space-x-2 items-center cursor-pointer">
                <BiChevronDown className="w-5 h-5"/>
                <FiMapPin className="text-blue-500 w-5 h-5"/> 
                <span>PRODUCTION AREA - RAW MATERIAL</span>
            </div>

            <div className="flex space-x-2 items-center cursor-pointer">
                <BiChevronDown className="w-5 h-5"/>
                <FiMapPin className="text-blue-500 w-5 h-5"/> 
                <span>PRODUCTION AREA - RAW MATERIAL</span>
            </div>
            
        </div>
    )
}