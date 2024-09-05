import './App.css'
import Navbar from './components/Navbar'
import Search from './components/Search'
import AssetsTree from './components/AssetsTree'
import Header from './components/Header'
import Product from './components/Product'

function App() {
  return (
    <>
      <Navbar/>
      <main className='h-[calc(100vh-64px)] p-4 flex flex-col items-center text-black dark:text-white'>
        <div className='flex flex-col w-full h-full bg-white dark:bg-[#17192D] p-6 rounded-md transition'>
            <Header/>
            <div className="flex flex-1 flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 mt-5">
              <div className='w-full md:w-1/3 border border-gray-300 dark:border-gray-600 rounded flex flex-col flex-1 transition'>  
                <Search/>
                <AssetsTree/>
              </div>
              <Product/>
            </div>
        </div>
      </main>
    </>
  )
}

export default App
