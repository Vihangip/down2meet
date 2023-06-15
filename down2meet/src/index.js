import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/reducer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import Friends from './pages/Friends';
import Groups from './pages/Groups';
import SocialGroups from './components/SocialGroups';

const store = createStore(reducer);

  // using GoogleOAuthProvider tutorial from: https://blog.logrocket.com/guide-adding-google-login-react-app/
ReactDOM.render(<>
  <GoogleOAuthProvider clientId="1011482531322-6d1dp35f941hr37vnn7cvjdstntunnru.apps.googleusercontent.com">
    <React.StrictMode>
      <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Friends" element={<Friends />} />
          <Route path="/Groups" element={<Groups />} />
          <Route path="/Events" element={<Events />} />
        </Routes>
      </Provider>
      </Router>
    </React.StrictMode>
  </GoogleOAuthProvider>
  </>,

  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();