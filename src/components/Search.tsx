import { FaSearch } from "react-icons/fa";

export default function Search() {
    return (
        <div className="relative">
            <input 
            type="text" 
            placeholder='Buscar Ativo ou Local' 
            className="w-full py-3 pl-3 pr-12 rounded bg-transparent"
            />
            <FaSearch className='absolute top-4 right-6 text-gray-400'/>
        </div>
    )
}