import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

function CheckDoneList({ item }) {
  const { products } = useContext(ProductContext)

  // 取回訂單內的商品
  const orderProduct = products.find(product => {
    return product.id === item.product
  })
  const { quantity } = item

  return (
    <section>
      <div className='py-2 sm:px-4 flex items-center space-x-4' key={item.id}>
        <div className='w-3/12 sm:w-1/12'>
          <img src={orderProduct.image} alt={`${orderProduct.name}`} className='h-14 rounded-md' />
        </div>
        <div className='w-11/12'>
          <div className='flex justify-between'>
            <span>{orderProduct.name}</span>
            <span className='text-end'>數量：{quantity}</span>
          </div>
          <div className='flex justify-between'>
            <span>單價 NT. { item.price }</span>
            <span className='text-end'>NT. {`${(parseInt(orderProduct.price) * quantity).toFixed(0)}`}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckDoneList