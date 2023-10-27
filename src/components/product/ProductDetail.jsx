import { IoMdClose } from "react-icons/io";
import { BsCart } from "react-icons/bs"
import { useContext } from "react"
import { ProductContext } from "../../context/ProductContext"
import { CartContext } from "../../context/CartContext";

function ProductDetail() {
  const { productDetail, openProductDetail, setOpenProductDetail } = useContext(ProductContext)
  const { addToCart } = useContext(CartContext)
  const { id, name, image, price, category, description } = productDetail
  
  const closeProductDetail = () => {
    setOpenProductDetail(false)
  }

  return (
    <section>
      <div className={`${openProductDetail ? "opacity-1 scale-100 bg-gray-200/90" : "opacity-0 scale-0"} 
            top-44 left-8 sm:left-auto sm:top-56 z-50 fixed border rounded-md transition-all duration-500`}>
        <div className="p-4 text-end">
          <button className='cursor-pointer' onClick={closeProductDetail}>
            <IoMdClose size={25}
              className='flex border rounded-md p-0.5 bg-rose-500 text-gray-50  
                hover:bg-gray-200/90 hover:text-rose-500 hover:border-rose-500'/>
          </button>
        </div>
        <div className='pb-10 px-10 sm:flex space-y-4 sm:space-x-4'>
          <div>
            <img src={image} alt="商品圖" className='h-60 rounded-md'/>
          </div>
          <div className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-lg">{name}</span>
                <span className="text-sm">{category}類</span>
              </div>
              <div className="text-sm flex flex-col">
                <span>建議售價</span>
                <span className="text-lg">NT. {price}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm">商品規格</span>
                <span>{description}</span>
              </div>
            </div>
            <div className="pt-8 sm:pt-0" onClick={() => { addToCart(productDetail, id) }}>
              <button className="btn-md btn-in w-full flex items-center justify-center space-x-2">
                <BsCart size={18}/>
                <span>加入購物車</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail