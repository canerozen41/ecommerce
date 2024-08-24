import axios from 'axios';
import { ActionTypes } from './../actionTypes';

// Senkron Aksiyon
// Tek görevi basit bir obje oluşturmak

export const setLoading = () => ({
  type: ActionTypes.SET_LOADING,
});

export const setError = (payload) => ({
  type: ActionTypes.SET_ERROR,
  payload,
});

export const setProducts = (payload) => ({
  type: ActionTypes.SET_PRODUCTS,
  payload,
});

// Asenkron Aksiyon
// Api isteği atıp edle ettiği cevabag göre
// reducer'ı bilgilerndiren kapsamlı aksiyon
// klasik redux'ta aksiyonlarımız asenkron olmaz
// ama bu srounu redux thunk middleware'i kullanark çözebilir
// redux thunk sayesinde aksiyonalrımız api istekleri atabilir

/*
 * Redux Thunk
 * Asenkron Akisyon - Thunk Aksiyonu
 
 * Redux Thunk, redux kütüphaneisi genişleten bir
 * middleware(arayazılım). Redux kendisi senkron işlemeleri 
 * desteklerken, asenkron eylemleri doğrudan deteklemez.
 * İşte redux thunk bu durumda devreye girer
  
 * Redux thunk, redux eylermlerinin(askyionlarının) asenkron
 * olmasını sağlar. Bu özellikle api isteği gibi asenkron 
 * işlemleri aksiyon içerisinde gerçekleştirebiliyoruz.
 
 * Thunk, bir fonksiyonun içerisnde farklı bir fonksiyonun 
 * çağrıldığı anlamına gelir  
*/

export const getProducts = () => (dispatch) => {
  dispatch(setLoading());

  axios
    .get('http://localhost:3050/products')
    .then((res) => dispatch(setProducts(res.data)))
    .catch((err) => dispatch(setError(err)));
};

// Örenk thunk aksiyonu
function ornkFonksiyon() {
  return async function (dispatch) {
    const data = await axios.get('...');

    dispatch({ type: 'SET_VERI' });
  };
}

// ok fonksiyonu yazımı
const ornekFonk = () => async (dispatch) => {
  const data = await axios.get('...');

  dispatch({ type: 'SET_VERI' });
};
