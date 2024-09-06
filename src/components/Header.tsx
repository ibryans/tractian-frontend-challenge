import { FaBolt } from "react-icons/fa6"
import { PiWarningCircleBold } from "react-icons/pi"
import useCompany from "../store/useCompany"

export default function Header() {

    const company = useCompany((state) => state.company)

    return (
        <div className="flex flex-col sm:flex-row justify-between">
            { company && 
                <>
                    {/* Empresa selecionada */}
                    <div className="flex space-x-3 items-center">
                        <h1 className='text-2xl font-bold'>
                            Ativos
                        </h1>
                        <h2 className='text-xl text-gray-400 dark:text-gray-300'>
                            / { company?.name }
                        </h2>
                    </div>

                    {/* Filtro de energia e critico */}
                    <div className="flex flex-row space-x-3 items-center">
                        <button className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded flex items-center space-x-2">
                            <FaBolt className="text-blue-500 w-5 h-5" />
                            <b className="text-gray-500">Sensor de Energia</b>
                        </button>
                        <button className="py-2 px-4 border border-gray-300 dark:border-gray-600 rounded flex items-center space-x-2">
                            <PiWarningCircleBold className="text-blue-500 w-6 h-6" />
                            <b className="text-gray-500">Crítico</b>
                        </button>
                    </div>
                </>
            }

        </div>
    )
}