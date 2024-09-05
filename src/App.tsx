import { FaSearch } from 'react-icons/fa'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar/>
      
      <main className='h-[calc(100vh-80px)] p-4 flex flex-col items-center text-black dark:text-white'>

        {/* Conteudo */}
        <div className='flex flex-col w-full h-full bg-white dark:bg-[#17192D] p-6 rounded-md transition duration-500'>
          
            <div className="flex space-x-3 items-center">
              <h1 className='text-4xl font-bold'>
                Ativos
              </h1>
              <h2 className='text-3xl text-gray-400 dark:text-gray-300'>
                / Apex Unit
              </h2>
            </div>

            <div className="flex flex-1 flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 mt-10">

              <div className='w-full md:w-1/3 border border-gray-300 dark:border-gray-600 rounded flex flex-col flex-1 transition'>
                
                {/* Search */}
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder='Buscar Ativo ou Local' 
                    className="w-full py-3 pl-3 pr-12 rounded bg-transparent"
                  />
                  <FaSearch className='absolute top-4 right-6 text-gray-400'/>
                </div>

                {/* Arvore de assets */}
                <div className="flex flex-col border-t border-gray-300 dark:border-gray-600 p-3">
                  PRODUCTION AREA - RAW MATERIAL
                </div>

              </div>

              {/* Produto */}
              <div className='w-full md:w-2/3 border border-gray-300 dark:border-gray-600 rounded p-3'>
                dsadasd
              </div>
            </div>

        </div>
      </main>
    </>
  )
}

export default App
