import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; //Provider store to all the components
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import './firebase/firebase';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';


const store = configureStore();
const jsx = (
    <div>
        <Provider store={store}>
            <AppRouter />
        </Provider>
    </div>
)

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx,document.getElementById('appRoot'))
        hasRendered = true;
    }
}
ReactDOM.render(<LoadingPage />,document.getElementById('appRoot'))

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        console.log(user)
        store.dispatch(login(user.uid));
        renderApp();
        if(history.location.pathname === '/') {
            history.push('/dashboard');
        }
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
})