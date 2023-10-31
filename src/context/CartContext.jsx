import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext()

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);  /* 產品購買數量狀態 */
  const [total, setTotal] = useState(0);

  useEffect(() => { 
    const total = cart.reduce((acc, cur) => {
      return acc + cur.price * cur.amount;
    }, 0);
    setTotal(total)

    if (cart) {
      const amount = cart.reduce((acc, cur) => {
        return acc + cur.amount
      }, 0);
      setItemAmount(amount)
    }
  }, [cart]);
  
  // 新增商品到購物車
  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    // console.log(newItem);

    // 比對查詢購物車中的商品 & 加入購物車的商品是否存在
    const cartItem = cart.find((item) => {
      return item.id === id;
    });

    // 如果購物車內有該商品，就增加數量;否則新增該商品
    if (cartItem) {
      const newCart = [...cart].map(item => { 
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // 增加商品數量
  const increaseAmount = (id) => { 
    // console.log(`Item ${id} Amount Increased`);
    const cartItem = cart.find(item => item.id === id);
    addToCart(cartItem, id);
  };

  // 減少商品數量
  const decreaseAmount = (id) => { 
    const cartItem = cart.find(item => item.id === id );
    // console.log(cartItem);
    // 第一種寫法 - 當數量小於1就直接刪除商品
    if (cartItem) {
      const newCart = [...cart].map(item => { 
        if (item.id === id) {
          return { ...item, amount: cartItem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } 
    if (cartItem.amount < 2) {
      deleteProduct(id)
    }
  };

  // 刪除購物車商品
  const deleteProduct = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart)
  };

  // 清除購物車內所有商品
  const clearCart = () => { 
    setCart([]);
  };

  const contextData = {
    cart : cart,
    setCart: setCart,
    itemAmount : itemAmount, 
    setItemAmount : setItemAmount,
    total : total,
    
    addToCart : addToCart,
    increaseAmount : increaseAmount,
    decreaseAmount : decreaseAmount,
    deleteProduct : deleteProduct,
    clearCart : clearCart,
  }

  return (
    <CartContext.Provider value={contextData }>
      { children }
    </CartContext.Provider>
  )
}

export default CartProvider