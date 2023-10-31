import { IoIosArrowDown } from "react-icons/io";
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductList from '../components/product/ProductList'
import { AuthContext } from '../context/AuthContext'
import { ProductContext } from '../context/ProductContext'

function Product() {
  document.title = '客家糕粿店 | 所有商品'
  const { authToken } = useContext(AuthContext)
  const { products, allProducts, getProducts, categoryByProducts, openProductList,
    isOpenList } = useContext(ProductContext)
  
  const categorys = []

  useEffect(() => {
      getProducts()
  },[authToken, getProducts])

  // 取得不重複類別
  allProducts.forEach(item => {
    const productCategory = item.category;
    if (!categorys.includes(productCategory)) {
      categorys.push(productCategory)
    }
  })

  return (
    <section>
      <div className="container mx-auto px-4 py-6">
        <div className='sm:hidden'>
          <div className="space-x-4 whitespace-nowrap overflow-x-auto py-4">
            <button className="btn-category" onClick={getProducts}>
              <span>所有商品</span>
            </button>
            {categorys.map(category => {
              return (
                <button className="btn-category" key={category} onClick={() => { categoryByProducts(category) }}>
                  <span>{category}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className='flex'>
          <div className='hidden sm:block sm:w-3/12 overflow-y-auto'>
            <div className="flex flex-col space-y-2 p-4">
              <div className="flex items-center space-x-12">
                <span className="cursor-pointer hover:text-gray-500" onClick={getProducts}>所有商品</span>
                <div onClick={ openProductList }>
                  <IoIosArrowDown size={20} className={`transform ${isOpenList ? 'rotate-180' : ''} hover:text-rose-500 cursor-pointer`}/>
                </div>
              </div>
              
              <div className={`${isOpenList ? 'h-full' : 'h-0'} overflow-hidden transition-all duration-75 z-20 space-y-2 px-4`}>
                {categorys.map(category => {
                  return (
                    <div key={category} onClick={() => { categoryByProducts(category) }}>
                      <span className="cursor-pointer hover:text-gray-500">{category}</span>
                    </div>
                  )
                })}
              </div>

              <div>
                <Link to={'/product'} rel="noopener noreferrer">
                  <span className="hover:text-gray-500">最新動態</span>
                </Link>
              </div>
            </div>
          </div>

          <div className='w-full sm:w-9/12 grid grid-cols-2 sm:grid-cols-4 gap-4 h-[640px] sm:h-[670px] overflow-y-auto p-4'>
            {products.map(product => {
              return (
                <ProductList key={product.id} product={product} />
              )
            })}
          </div>
        </div>
      </div>
      
    </section>
  )
}

export default Product