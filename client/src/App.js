import './App.css';
import { BrowserRouter, Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import CreateCar from './components/Admin/CreateCar';
import UpdateCar from './components/Admin/UpdateCar';
import DeleteCar from './components/Admin/DeleteCar';
import UserProfile from './components/User/UserProfile';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Shop from './components/Home/Shop';
import CarPreview from './components/Home/CarPreview';
import Allcars from './components/Admin/Allcars';
import Allorders from './components/Admin/Allorders';
import Allcustomers from './components/Admin/Allcustomers';
import Allmails from './components/Admin/Allmails';
import OrderPreview from './components/Home/OrderPreview';
import UpdateUser from './components/User/UpdateProfile';
import NotFound from './components/Home/NotFound';
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path='/' element={<Home/>}/>
       
          <Route path='/notfound' element={<NotFound/>}/>
          <Route path='/listing' element={<Shop/>}/>
          <Route path='/listing/car/:id' element={<CarPreview/>}/>
          <Route path='/listing/car/order/:id' element={<OrderPreview/>}/>

          <Route path='/admin/allcars' element={<Allcars/>} />
          <Route path='/admin/allorders' element={<Allorders/>} />
          <Route path='/admin/allcustomers' element={<Allcustomers/>} />
          <Route path='/admin/allmails' element={<Allmails/>} />
          <Route path='/admin/addcar' element={<CreateCar/>} />
          <Route path='/admin/updatecar/:id' element={<UpdateCar/>} />
          <Route path='/admin/deletecar/:id' element={<DeleteCar/>} />
          
          <Route path='/user/profile' element={<UserProfile/>}/>
          <Route path='/user/login' element={<Login/>}/>
          <Route path='/user/register' element={<Register/>}/>
          <Route path='/user/profile/update/:id' element={<UpdateUser/>}/>
          <Route path='*' element={<NotFound/>}/>
         
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
