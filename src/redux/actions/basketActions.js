import axios from 'axios';
import { ActionTypes } from '../actionTypes';

// Asenkron Thunk Aksiyonu
// Verileri Sepet verilerini çekip aşama aşama reducer'a bildirir
export const getBasket = () => (dispatch) => {
  // reducer'a verinin yüklendiğini haber verdik
  dispatch({ type: ActionTypes.SET_BASKET_LOADING });

  // verileri çek
  axios
    .get('http://localhost:3050/basket')
    // istek başarılı olursa: verileri reducer'a aktar
    .then((res) =>
      dispatch({ type: ActionTypes.SET_BASKET, payload: res.data })
    )
    // istek başarısız olursa : hatayı reducer'a aktar
    .catch((err) =>
      dispatch({ type: ActionTypes.SET_BASKET_ERROR, payload: err })
    );
};

// Sepete yeni eleman ekler
// Hem api'i günceller hemde store'u
export const addToBasket = (product) => (dispatch) => {
  // 1) yeni bir obje oluşturup miktarı 1 olarak ekle
  const newProduct = { ...product, amount: 1 };

  // 2) objeden gereksiz verileri kaldır
  delete newProduct.specs;
  delete newProduct.color;
  delete newProduct.title;

  // 3) api'a ürünü kaydet
  axios
    .post('http://localhost:3050/basket', newProduct)
    // 4) store'a yeni ürünü ekle
    .then(() => {
      // todo > aksiyonu tammala
      dispatch({
        type: ActionTypes.ADD_TO_BASKET,
        payload: newProduct,
      });
    });
};

// septte olan elemanın miktarını 1 arttırır
export const updateItem = (product) => (dispatch) => {
  axios
    .patch(`http://localhost:3050/basket/${product.id}`, {
      amount: product.amount + 1,
    })
    .then(() => {
      dispatch({
        type: ActionTypes.UPDATE_ITEM,
        payload: product.id,
      });
    });
};

// sepetteki elemanı siler
export const deleteItem = (id) => (dispatch) => {
  axios
    .delete(`http://localhost:3050/basket/${id}`)
    // api isteği başarılı olursa store'dan kaldır
    .then(() => {
      dispatch({
        type: ActionTypes.REMOVE_ITEM,
        payload: id,
      });
    });
};
