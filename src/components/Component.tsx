import { FaCircle, FaInbox } from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";
import { AiOutlineInbox } from "react-icons/ai";
import { MdOutlineRouter, MdWifiTethering } from "react-icons/md";
import useComponent from "../store/useComponent";

export default function Product() {

    const { component } = useComponent();

    return (
        <div className='flex flex-col w-full md:w-2/3 border border-gray-300 dark:border-gray-600 rounded'>
            { component
                ? 
                    <>
                        {/* Header do Produto  */}
                        <div className="flex items-center space-x-3 border-b border-gray-300 dark:border-gray-600 p-4">
                            <h3 className="text-xl font-bold">
                                { component.name }
                            </h3>
                            { component.sensorType && 
                                <>
                                    { component.sensorType === 'energy'
                                        ? <FaBolt className={`${component.status === 'operating' ? 'text-green-500' : 'text-red-500'} w-4 h-4`}/>
                                        : <FaCircle className={`${component.status === 'operating' ? 'text-green-500' : 'text-red-500'} w-2.5 h-2.5`}/>
                                    }
                                </>
                            }    
                        </div>

                        <div className="flex items-center space-x-5 xl:space-x-10 m-5 pb-5 border-b-2 border-gray-200 dark:border-gray-600">
                            {/* Imagem */}
                            <div className="w-1/2 lg:w-1/2 2xl:w-1/4 h-48 flex flex-col space-y-2 justify-center items-center text-sm text-blue-500 bg-blue-50 border-2 border-dashed border-blue-500">
                                <AiOutlineInbox className="w-8 h-8"/>
                                <span>Adicionar imagem do Ativo</span>
                            </div>

                            {/* Informacoes principais */}
                            <div className="w-1/2 lg:w-2/3 xl:w-3/4 flex flex-col gap-2">
                                <div className="flex flex-col gap-2 pb-4 border-b-2 border-gray-200 dark:border-gray-600">
                                    <b>Tipo de Equipamento</b>
                                    <span className="text-gray-500 dark:text-gray-300">
                                        Motor Elétrico (Trifásico)
                                    </span>
                                </div>
                                <div className="flex flex-col pt-4 gap-2">
                                    <b>Responsáveis</b>
                                    <div className="flex space-x-2 items-center">
                                        <div className="w-6 h-6 bg-blue-500 text-white flex items-center justify-center uppercase rounded-full text-xs">
                                            M
                                        </div>
                                        <span className="text-gray-500 dark:text-gray-300">
                                            Mecânica
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sensor e receptor */}
                        <div className="flex flex-row items-center mx-5 mb-5">
                            <div className="flex flex-col gap-2 w-1/2 xl:w-1/3">
                                <b>Sensor</b>
                                <div className="flex space-x-2 items-center">
                                    <MdWifiTethering className="text-blue-500 w-6 h-6"/>
                                    <span className="text-gray-500 dark:text-gray-300">
                                        { component.sensorId }
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-1/2 xl:w-1/3">
                                <b>Receptor</b>
                                <div className="flex space-x-2 items-center">
                                    <MdOutlineRouter className="text-blue-500 w-6 h-6"/>
                                    <span className="text-gray-500 dark:text-gray-300">
                                        { component.gatewayId }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </>
                : 
                    <div className="w-full h-full p-10 flex flex-col justify-center items-center text-gray-300 dark:text-gray-500">
                        <FaInbox className="w-10 h-10"/>
                        <span>Nenhum componente selecionado</span>
                    </div>
            }

        </div>
    )
}