import { createContext, useCallback, useContext, useState } from "react"
import { AuthContext } from "./AuthContext"

export const ProductContext = createContext()

function ProductProvider({ children }) {
  const { logoutUser } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([]); 
  const [isOpenList, setIsOpsenList] = useState(false)
  const [productDetail, setProductDetail] = useState({})
  const [openProductDetail, setOpenProductDetail] = useState(false)

  const apiurl = "http://127.0.0.1:8000/api/v1"

  // 取得全部產品
  const getProducts = useCallback(async () => {
    const response = await fetch(`${apiurl}/front_products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setProducts(data)
      setAllProducts(data)
    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }, [logoutUser, setProducts]) 


  // 依照類別篩選全部商品
  const categoryByProducts = (category) => {
    if (category === '') {
      setProducts(allProducts);
    } else {
      let filterProduct = allProducts.filter((item) => {
        return item.category === category
      })
      setProducts(filterProduct)
    }
  }

  // 側邊欄產品隱藏選項功能
  const openProductList = () => {
    setIsOpsenList(!isOpenList)
  } 

  // 開啟商品細節圖
  const seeProductDetail = (id) => {
    const productInfo = products.find(item => {
      return item.id === id
    })
    setProductDetail(productInfo)
    setOpenProductDetail(true)
  }

  const contextData = {
    products : products,
    setProducts : setProducts,
    isOpenList : isOpenList,
    setIsOpsenlist : setIsOpsenList,
    productDetail : productDetail,
    openProductDetail : openProductDetail,
    setOpenProductDetail : setOpenProductDetail,

    allProducts : allProducts,
    getProducts : getProducts,
    categoryByProducts: categoryByProducts,
    openProductList : openProductList,
    seeProductDetail : seeProductDetail,
  }

  return (
    <ProductContext.Provider value={ contextData }>
      { children }
    </ProductContext.Provider>
  )
}

export default ProductProvider