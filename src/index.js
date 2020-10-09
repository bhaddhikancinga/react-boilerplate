import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import rootReducer from './Reducers';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Login from "./Pages/Login";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
});
const store = createStore(
    rootReducer,
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

ReactDOM.render(
    <Provider store={store}>
        <Router basename={'/planning'}>
             <div>
                 <Route  parent  sensitive  path="/pt" component={App} />
                 <Route exact sensitive  path="/" component={Login} />
             </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
