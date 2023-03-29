import logo from './logo.svg';
import './App.css';
import { Home } from './pages/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Subcategory } from './pages/Subcategory/Subcategory';
import { Thread } from './pages/Thread/Thread';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/:catId/:subId" element={<Subcategory/>} />
            <Route path="/:catId/:subId/:threadId" element={<Thread/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
