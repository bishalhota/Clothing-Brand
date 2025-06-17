import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import CollectionPage from './Pages/CollectionPage'
import ProductDetails from './components/Products/ProductDetails'
import Checkout from './components/Cart/Checkout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collection" element={<CollectionPage />}></Route>
          <Route path="product/:id" element={<ProductDetails />}></Route>
          <Route path="checkout" element={<Checkout />} />
        </Route>
        {/* <Route>Admin Layout</Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
