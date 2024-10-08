import { useQuery } from '@tanstack/react-query'
import companySvg from '../assets/company.svg'
import { api } from '../lib/api'
import Company from '../models/Company'
import useCompany from '../store/useCompany'
import useComponent from '../store/useComponent'

export default function Navbar() {

    const { select: selectCompany, company: selectedCompany } = useCompany();
    const { select: selectComponent } = useComponent();


    const { data: companies } = useQuery<{ data: Company[] }>({
        queryKey: ['companies'],
        queryFn: async () => await api.get('/companies'),
    })
    
    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark')
    }
    
    return (
        <div className="w-full bg-white dark:bg-[#17192D] p-4 flex flex-col gap-3 sm:flex-row justify-center sm:justify-between items-center transition duration-300">
            
            {/* Logo */}
            <svg className='fill-blue-600 dark:fill-white w-40' viewBox="317.35 452.61 1285.3 174.78" xmlns="http://www.w3.org/2000/svg">
                <path d="m317.35 494.14v-37.72h151.16v37.72h-51.56v130.81h-47.76v-130.81zm284.42 77.88c10.31-5.16 18.45-11.94 24.43-21.17 5.7-9.23 8.68-19.81 8.68-32.02 0-12.48-3.26-23.61-9.23-33.11-6.24-9.5-14.93-16.55-26.05-21.71-11.4-5.16-24.7-7.6-39.62-7.6h-77.08v37.45h74.09c9.5 0 17.1 2.17 22.25 6.51 4.89 4.34 7.6 10.58 7.6 18.18 0 7.87-2.71 13.84-7.6 18.18-5.16 4.34-12.48 6.24-22.25 6.24h-74.09v81.69h47.76v-44.78h26.05l30.67 44.78h51.02zm170.43-115.61h-46.95l-74.63 168.53h48.85l13.3-32.84 13.84-35.28 21.71-54.01 21.71 54.01 13.84 35.28 13.3 32.84h49.66zm112.08 159.85c13.84 7.6 29.85 11.13 47.76 11.13 15.47 0 29.04-2.71 41.79-8.14 12.21-5.43 22.53-13.3 30.94-23.61l-30.4-27.41c-11.13 13.3-24.43 19.81-39.62 19.81-9.23 0-17.37-1.9-24.7-5.97-7.33-3.8-12.76-9.5-16.55-16.83-3.8-7.33-5.7-15.74-5.7-25.24s1.9-17.91 5.7-24.97c3.8-7.33 9.5-13.03 16.55-17.1 7.33-3.8 15.47-5.97 24.7-5.97 15.47 0 28.77 6.78 39.62 19.81l30.4-27.41c-8.14-10.04-18.45-18.18-30.94-23.61-12.48-5.43-26.32-8.14-41.79-8.14-17.91 0-33.65 3.8-47.76 11.4-13.84 7.6-24.97 17.91-33.11 30.94-8.14 13.57-11.94 28.5-11.94 45.32s3.8 32.02 11.94 45.32c8.14 13.03 19.27 23.34 33.11 30.67zm179.66-122.12v130.81h47.76v-130.81h51.56v-37.72h-150.89v37.72zm113.71-37.73v168.53h47.76v-168.53zm179.66 0h-46.95l-74.36 168.53h48.58l13.3-32.84 13.84-35.28 21.71-54.01 21.71 54.01 13.84 35.28 13.3 32.84h49.66zm85.49 58.62 46.68 59.43-.27 50.48h-46.68zm113.17-58.62h46.68l-.27 104.76-46.68-56.45zm0 89.83 46.68 59.43v19.54h-39.35l-74.36-89.83-46.68-56.45v-22.53h39.35z"/>
            </svg>

            <div className="flex flex-row items-center">
                {/* Empresas */}
                {companies?.data.map((company) => (
                    <button 
                        key={company.id}
                        onClick={() => { selectCompany(company); selectComponent(null); }} 
                        className={`text-white ${selectedCompany?.id === company.id ? 'bg-blue-500' : 'bg-blue-900 hover:bg-blue-950'} transition rounded py-2 px-3  flex flex-row space-x-3 items-center mx-1`}>
                        <img src={companySvg} className='w-5' />
                        <b>{company.name}</b>
                    </button>
                ))}

                {/* Modo Escuro */}
                <svg onClick={toggleDarkMode} className="mx-5 dark:hidden hover:animate-spin-finite hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="25" viewBox="0 0 256 256" xmlSpace="preserve">
                    <defs></defs>
                    <g style={{ strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', opacity: 1 }} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                        <path d="M 87.823 60.7 c -0.463 -0.423 -1.142 -0.506 -1.695 -0.214 c -15.834 8.398 -35.266 2.812 -44.232 -12.718 c -8.966 -15.53 -4.09 -35.149 11.101 -44.665 c 0.531 -0.332 0.796 -0.963 0.661 -1.574 c -0.134 -0.612 -0.638 -1.074 -1.259 -1.153 c -9.843 -1.265 -19.59 0.692 -28.193 5.66 C 13.8 12.041 6.356 21.743 3.246 33.35 S 1.732 57.08 7.741 67.487 c 6.008 10.407 15.709 17.851 27.316 20.961 C 38.933 89.486 42.866 90 46.774 90 c 7.795 0 15.489 -2.044 22.42 -6.046 c 8.601 -4.966 15.171 -12.43 18.997 -21.586 C 88.433 61.79 88.285 61.123 87.823 60.7 z" style={{ strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'black', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                    </g>
                </svg>

                {/* Modo claro */}
                <svg onClick={toggleDarkMode} className="mx-5 hidden dark:block hover:animate-spin-finite hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="25" height="25" viewBox="0 0 256 256" xmlSpace="preserve">
                    <defs></defs>
                    <g style={{ strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', opacity: 1 }} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                        <path d="M 45 68 c -12.682 0 -23 -10.317 -23 -23 c 0 -12.682 10.318 -23 23 -23 c 12.683 0 23 10.318 23 23 C 68 57.683 57.683 68 45 68 z M 45 28 c -9.374 0 -17 7.626 -17 17 s 7.626 17 17 17 s 17 -7.626 17 -17 S 54.374 28 45 28 z" style={{ strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'white', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                        <rect x="42" y="0" rx="0" ry="0" width="6" height="15.79" style={{ strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'white', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) "/>
                        <rect x="42" y="74.21" rx="0" ry="0" width="6" height="15.79" style={{ strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'white', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) "/>
                        <rect x="0" y="42" rx="0" ry="0" width="15.79" height="6" style={{ strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'white', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) "/>
                        <rect x="74.21" y="42" rx="0" ry="0" width="15.79" height="6" style={{ strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'white', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) "/>
                        <rect x="63.34" y="15.76" rx="0" ry="0" width="15.79" height="6" style={{ strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'white', opacity: 1 }} transform=" matrix(0.7071 -0.7071 0.7071 0.7071 7.5969 55.8674) "/>
                        <rect x="10.87" y="68.24" rx="0" ry="0" width="15.79" height="6" style={{ strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'white', opacity: 1 }} transform=" matrix(0.7071 -0.7071 0.7071 0.7071 -44.876 34.1324) "/>
                        <rect x="15.76" y="10.87" rx="0" ry="0" width="6" height="15.79" style={{ strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'white', opacity: 1 }} transform=" matrix(0.7071 -0.7071 0.7071 0.7071 -7.7721 18.7634) "/>
                        <rect x="68.24" y="63.34" rx="0" ry="0" width="6" height="15.79" style={{ strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'white', opacity: 1 }} transform=" matrix(0.7071 -0.7071 0.7071 0.7071 -29.5071 71.2363) "/>
                    </g>
                </svg>
            </div>

        </div>
    );
}