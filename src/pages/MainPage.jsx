import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, setLoading, setError } from './../redux/actions/productActions';
import { getBasket } from '../redux/actions/basketActions';
import Loading from '../components/Loading';
import Card from '../components/Card';

const MainPage = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isError } = useSelector((state) => state.product);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        await dispatch(getProducts());
        await dispatch(getBasket());
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.message || 'Veri alımı sırasında bir hata oluştu.'));
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      {isLoading && <Loading />}
      {isError && (
        <p className="text-center my-5 fw-bold">
          Üzgünüz, verileri alırken bir hata oluştu: <br />
          {isError}
        </p>
      )}

      <div className="d-flex flex-wrap gap-5 justify-content-center my-5">
        {!isLoading && !isError && products.map((product, i) => (
          <Card product={product} key={i} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
