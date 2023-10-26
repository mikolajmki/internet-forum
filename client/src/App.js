import logo from './logo.svg';
import './App.css';
import { Home } from './pages/Home/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Forum } from './pages/Forum/Forum';
import { Thread } from './pages/Thread/Thread';
import { Profile } from './pages/Profile/Profile';
import { useSelector } from 'react-redux';
import { Auth } from './pages/Auth/Auth';

function App() {

  const user = useSelector((state) => state.authReducer.authData.user);

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/:forumId" element={<Forum/>} />
            <Route path="/:forumId/:threadId" element={<Thread/>}/>
            <Route path="/profile/:userId" element={<Profile/>}/>
            <Route path="/auth" element={<Auth/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
