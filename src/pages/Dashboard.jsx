import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import ProductDetail from '../components/product/ProductDetail'

function Dashboard() {
  return (
    <section className='flex flex-wrap h-screen text-gray-800 text-base'>
      <div className='w-full'>
        <Header />
        <div className='sm:flex justify-center'>
          <ProductDetail/>
        </div>

        <div>
          <Outlet/>
        </div>  
      </div>

      <div className='fixed bottom-0 w-full bg-gray-200'>
        <Footer/>
      </div>
    </section>
  )
}

export default Dashboard