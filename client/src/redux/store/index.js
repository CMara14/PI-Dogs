import { createStore, applyMiddleware } from 'redux';

import rootReducer from '../reducer';
//IMPORTAMOS NUESTRO REDUCER QUE SERA NUESTRO ESTADO INICIAL

import { composeWithDevTools } from "redux-devtools-extension";

import  thunk  from "redux-thunk";
//USAREMOS THUNK COMO MIDDLEWARE PARA ACCIONES ASINCRONAS

//CREAMOS NUESTRO STORE
const store = createStore(
  // PASANDOLE EL REDUCER COMO 1° PARÁMETRO.
    rootReducer,
  //
    composeWithDevTools(applyMiddleware(thunk))
  );
  

export default store;