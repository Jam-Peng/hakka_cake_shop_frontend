import { IoMdClose, IoMdRemove, IoMdAdd } from "react-icons/io";
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { ProductContext } from "../../context/ProductContext";

function CheckOrderItem({item}) {
  const { increaseAmount, decreaseAmount, deleteProduct } = useContext(CartContext)
  const { seeProductDetail} = useContext(ProductContext)
  const { id, name, price, amount, category, image } = item

  return (
    <section className='py-2 px-2 sm:px-4 border-gray-200 w-full text-gray-500 '>
      <div className='w-full flex items-center gap-x-4 border-b pb-2'>
        <div onClick={()=>{seeProductDetail(id)}}>
          <button >
            <img src={ image } alt={`${name}圖片`} className='h-14 rounded-md'/>
          </button>
        </div>
        
        <div className='w-full flex justify-between'>
          <div className='flex flex-col justify-between'>
            <div className='sm:flex items-center sm:space-x-4 space-y-2 sm:space-y-0'>
              <span className='font-medium tracking-wide'>{name}</span>
              <div className='flex items-center space-x-2 px-2 border rounded-md border-teal-500 text-teal-500'>
                <button onClick={() => decreaseAmount(id)}
                  className='flex-1 flex justify-center items-center px-1'>
                  <IoMdRemove size={20}/>
                </button>
                <div className='flex justify-center items-center px-2 text-[1rem]'>{ amount }</div>
                <button onClick={() => increaseAmount(id)}
                  className='flex-1 flex justify-center items-center px-1'>
                  <IoMdAdd size={20}/>
                </button>
              </div>
            </div>
            <div className='text-sm hidden sm:block'>
              <span>{ category }</span>
            </div>
          </div>

          <div className='flex flex-col items-end justify-between space-y-2'>
            <div className='cursor-pointer' onClick={()=>{deleteProduct(id)}}>
              <IoMdClose size={25}
                className='flex border rounded-md p-0.5 bg-rose-500 text-gray-50  
                  hover:bg-gray-100 hover:text-rose-500 hover:border-rose-500 transition' />
            </div>
            <div className=''>NT. {`${parseInt(price * amount).toFixed(0)}`}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckOrderItem