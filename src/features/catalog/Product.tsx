import StarRatings from 'react-star-ratings';

import { useStateValue } from '@/hooks/useStateValue';
import type { BasketItem } from '@/types/models';
import './Product.css';

type ProductProps = {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
};

export default function Product({
  id,
  title,
  image,
  price,
  rating,
}: ProductProps) {
  const [, dispatch] = useStateValue();

  const addToBasket = () => {
    const item: BasketItem = {
      id,
      title,
      image,
      price,
      rating,
    };
    dispatch({
      type: 'ADD_TO_BASKET',
      item,
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
