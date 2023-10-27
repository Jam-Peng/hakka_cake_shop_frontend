import { BsCart } from "react-icons/bs"
import { FiSearch } from "react-icons/fi"
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { ProductContext } from "../../context/ProductContext";

function ProductList({ product }) {
  const [openProductView, setOpenProductView] = useState(null);
  const [openViewText, setOpenViewText] = useState(false);
  const [openBuyText, setOpenBuyText] = useState(false);
  const { addToCart } = useContext(CartContext)
  const { seeProductDetail } = useContext(ProductContext)

  const { id, name, price, image } = product;

  const openProductList = (id) => {
    if (openProductView === id) {
      setOpenProductView(null);     // 如果當前列表已經開啟，則關閉它
    } else {
      setOpenProductView(id);       // 否則開啟該列表
    }
  }

  return (
    <section>
      <div className='flex flex-col items-center space-y-2'>
        <div className="relative cursor-pointer">
          <img src={image} alt={`${name} 產品圖`} className='h-40 rounded-md' onMouseEnter={() => { openProductList(id) }}/>

          {openProductView === id && (
            <div className={`${openProductView} bg-gray-200/70 w-full h-full absolute top-0`} onMouseLeave={() => { openProductList(id) }} >
              <div className="h-full grid grid-cols-2 place-content-center">
                <div className="flex flex-col items-center space-y-2 relative" onClick={() => { seeProductDetail(id) }}>
                  <div className="p-2 border rounded-md border-teal-600" onMouseLeave={() => { setOpenViewText(false) }}>
                    <FiSearch size={24} color="#0d9488" onMouseEnter={()=>{ setOpenViewText(true) }}/>
                  </div>
                  <span className={`${openViewText ? 'block' : 'hidden'} text-sm absolute top-9`}>查看商品</span>
                </div>
                <div className="flex flex-col items-center space-y-2 relative" onClick={() => { addToCart(product, id) }}>
                  <div className="p-2 border rounded-md border-indigo-600" onMouseLeave={()=>{ setOpenBuyText(false) }}>
                    <BsCart size={24} color="#4f46e5" onMouseEnter={() => { setOpenBuyText(true) }}/>
                  </div>
                  <span className={`${openBuyText ? 'block' : 'hidden'} text-sm absolute top-9`}>加入購物車</span>
                </div>
              </div>
            </div>
          )} 
        </div>

        <div>
          <div>{name}</div>
          <div>
            <span>NT. {price}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductList