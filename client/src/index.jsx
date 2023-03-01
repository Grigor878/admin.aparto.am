import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import './i18next'
import { Provider } from 'react-redux'
import store from './store/store'
import View from './view/View'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <View />
    </Provider>
);
