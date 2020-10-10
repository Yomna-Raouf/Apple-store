import React from "react";
import "./Checkout.css";
import { useStateValue } from "./StateProvider";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
  const [{ basket, user }] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="chechout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.JPG"
          alt=""
        />
        <div>
          {basket.length ? (
            <>
              <h2 className="checkout__title">
                {" "}
                your shopping Basket, {user?.email}
              </h2>

              {basket.map((item, index) => (
                <CheckoutProduct
                  key={index}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </>
          ) : (
            <div className="checkout__emptyState">
              <h2 className="checkout__title">
                your shopping Basket is empty, {user?.email}
              </h2>
              <img src={require("./emptystate.svg")} alt="empty Basket" />
            </div>
          )}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
