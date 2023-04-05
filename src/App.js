import logo from './logo.svg';
import './App.css';
import { Home } from './pages/Home/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Subcategory } from './pages/Subcategory/Subcategory';
import { Thread } from './pages/Thread/Thread';
import { Profile } from './pages/Profile/Profile';
import { useSelector } from 'react-redux';

function App() {

  const user = useSelector((state) => state.authReducer.authData.user);

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/:catId/:subId" element={<Subcategory/>} />
            <Route path="/:catId/:subId/:threadId" element={<Thread/>}/>
            <Route path="/profile/:userId" element={user ? <Profile/> : <Navigate to={'/'}/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
