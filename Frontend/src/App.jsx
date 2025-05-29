import {BrowserRouter,Routes,Route} from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './Pages/Home'
import Login from './Pages/Login'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="profile" element={<Login />} />
        </Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
