import logo from './logo.svg';
import './App.css';
import { Home } from './pages/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Subcategory } from './pages/Subcategory/Subcategory';
import { Thread } from './pages/Thread/Thread';
import { Profile } from './pages/Profile/Profile';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/:catId/:subId" element={<Subcategory/>} />
            <Route path="/:catId/:subId/:threadId" element={<Thread/>}/>
            <Route path="/profile/:userId" element={<Profile/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
