import './Product.css';
import StarRatings from 'react-star-ratings';
import { useStateValue } from '@/hooks/useStateValue';

function Product({ id, title, image, price, rating }) {
  const [, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id,
        title,
        image,
        price,
        rating,
      },
    });
  };

  return (
    <div className='Product'>
      <img src={image} alt='' />
      <div className='Product__info'>
        <p>{title}</p>
        <p className='Product__price'>
          <small>
            <strong> $</strong>{' '}
          </small>
          <strong>{price}</strong>
        </p>

        <div className='Product__rating'>
          <StarRatings
            rating={rating}
            starRatedColor='#ffbc00'
            numberOfStars={5}
            name={`product-rating-${id}`}
            starDimension='20px'
            starSpacing='15px'
          />
        </div>
      </div>

      <button type='button' onClick={addToBasket}>
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
