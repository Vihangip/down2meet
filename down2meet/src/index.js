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
import LoginPage from './pages/Login';
import ButtonAvailable from './components/ButtonAvailable';
import Search from './components/Search';
import store from './redux/store';
import reducer from './reducers/reducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


import userReducer from './redux/user/reducer';
import postReducer from './redux/posts/reducer';
import groupReducer from './redux/groups/reducer';
import eventReducer from './redux/event/reducer';


const root = ReactDOM.createRoot(document.getElementById('root'));

const rootReducer = combineReducers({
  users: userReducer,
  posts: postReducer,
  groups: groupReducer,
  reducer: reducer,
  event: eventReducer
});

console.log("index");
console.log(rootReducer.store);

const combinedStore =  createStore(rootReducer, applyMiddleware(thunk));


  // using GoogleOAuthProvider tutorial from: https://blog.logrocket.com/guide-adding-google-login-react-app/
root.render(<>
  <GoogleOAuthProvider clientId="1011482531322-6d1dp35f941hr37vnn7cvjdstntunnru.apps.googleusercontent.com">
    <React.StrictMode>
      <Router>
      <Provider store={combinedStore}>
        <div className='Body'>
        <div className="Body-Left">
        <Navbar />
        </div>
        <div className='Body-Middle'>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Friends" element={<Friends />} />
          <Route path="/Groups" element={<Groups />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
        </div>

        <div className="Body-Right">
        <ButtonAvailable />
          <Search />
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