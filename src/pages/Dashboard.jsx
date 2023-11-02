import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import ProductDetail from '../components/product/ProductDetail'
import Footer from '../components/Footer'
import MobileFooter from '../components/MobileFooter'

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

      <div className='hidden sm:block sm:fixed bottom-0'>
        <Footer/>
      </div>
      <div className='sm:hidden fixed bottom-0'>
        <MobileFooter/>
      </div>
    </section>
  )
}

export default Dashboard