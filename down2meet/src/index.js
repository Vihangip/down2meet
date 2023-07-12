import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import Friends from './pages/Friends';
import Groups from './pages/Groups';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import ButtonAvailable from './components/ButtonAvailable';
import SearchBar from './components/SearchBar';
import ActiveUsers from './components/ActiveUsers';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

  // using GoogleOAuthProvider tutorial from: https://blog.logrocket.com/guide-adding-google-login-react-app/
root.render(<>
  <GoogleOAuthProvider clientId="1011482531322-6d1dp35f941hr37vnn7cvjdstntunnru.apps.googleusercontent.com">
    <React.StrictMode>
      <Router>
      <Provider store={store}>
        <div className='Body'>
        <div className="Body-Left">
        <Navbar />
        </div>
        <div className='Body-Middle'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Friends" element={<Friends />} />
          <Route path="/Groups" element={<Groups />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
        </div>

        <div className="Body-Right">
        <ButtonAvailable />
          <SearchBar />
          {/* <ActiveUsers /> */}
        </div>
        </div>
      </Provider>
      </Router>
    </React.StrictMode>
  </GoogleOAuthProvider>
  </>,

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();