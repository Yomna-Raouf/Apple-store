import React from "react";
import "./CheckoutProduct.css";
import StarRatings from "react-star-ratings";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useStateValue } from "./StateProvider";

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };

  return (
    <div className="checkoutProduct leave">
      <img className="checkoutProduct__image" alt={title} src={image} />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          <StarRatings
            rating={rating}
            starRatedColor="#ffbc00"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="15px"
          />
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove From Basket </button>
        )}
      </div>
      {!hideButton && (
        <div className="checkoutProduct__amountControl">
          <strong style={{ fontSize: "20px" }}>🚫 not working yet 🚫 </strong>
          <br />
          <button>
            <strong>
              <RemoveIcon />
            </strong>
          </button>
          <p className="checkoutProduct__amount">1</p>
          <button>
            <strong>
              <AddIcon />
            </strong>
          </button>
        </div>
      )}
    </div>
  );
}

export default CheckoutProduct;
