import React from "react";
import Product from "./Product";
import "./Home.css";

function Home() {
  return (
    <div className="Home">
      <div className="Home__imageContainer">
        <div className="Home__imageDescription">
          <p>
            Get More With{" "}
            <span>
              {" "}
              <strong> Apple! </strong>{" "}
            </span>
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
        <img className="Home__image" src={require("./mac2.png")} alt="" />
      </div>

      <div className="Home__row">
        <Product
          id="5464651"
          title="Iphone 11 Pro"
          price={1500}
          rating={4.5}
          image="https://tradelinestores.s3.amazonaws.com/media/product_images/f0c70287-25a6-4f75-9345-ce4274bb892e.png"
        />

        <Product
          id="547141"
          title="iPhone 11"
          price={1200}
          rating={5}
          image="https://tradelinestores.s3.amazonaws.com/media/product_images/69e95fc4-4cce-4653-a695-d1457cdeb377.png"
        />
        <Product
          id="68787187"
          title="IPhone 11 Pro Max"
          price={2000}
          rating={4}
          image="https://tradelinestores.s3.amazonaws.com/media/product_images/c143869e-8678-4e1e-a9ad-240c99c166f4.png"
        />
      </div>

      <div className="Home__row">
        <Product
          id="54662252"
          title="Baseus 3-in-1 Smart Qi Wireless Charger"
          price={35}
          rating={4.5}
          image="https://tradelinestores.s3.amazonaws.com/media/product_images/fcddf72f-a556-43da-9b6a-73b89c7dd72e.png"
        />

        <Product
          id="2545124"
          title="Baseus Simple 2in1 Wireless Charger"
          price={10}
          rating={4.5}
          image="https://tradelinestores.s3.amazonaws.com/media/product_images/4e390379-e0a2-413d-a452-ebe7f610366f.png"
        />

        <Product
          id="5454154"
          title="Bang & Olufsen BeoPlay A9 Black"
          price={3000}
          rating={4}
          image="https://tradelinestores.s3.amazonaws.com/media/product_images/d34c8772-673c-4fcb-82f7-f8bab7f306f6.png"
        />
      </div>

      <div className="Home__row">
        <Product
          id="415415"
          title="Apple MacBook Pro 16-inch 2.6GHZ 512GB"
          price={3000}
          rating={5}
          image="https://szifon.com/wp-content/uploads/2019/11/Apple_16-inch-MacBook-Pro_111319.png"
        />

        <Product
          id="415415"
          title="AirPods"
          price={830}
          rating={4.5}
          image="https://staticshop.o2.co.uk/product/images/apple-airpods-sku-header.png?cb=03527ef494b0f14e27ae29a937aca48a"
        />

        <Product
          id="415415"
          title="iwatch"
          price={800}
          rating={5}
          image="https://pisces.bbystatic.com/image2/BestBuy_US/Gallery/appleWatch-BrandStore-Fall2018_v2-42205.png"
        />
      </div>

      <div className="Home__row">
        <Product
          id="51541515"
          title="The new MacbookAir"
          price={2000}
          rating={3.5}
          image="https://www.humac.dk/sites/default/files/product-images/2019-07/MBA-PFOpen-SpcGry-WW-EN.tif-PRINT.png"
        />

        <Product
          id="516515616"
          title="IPad"
          price={1000}
          rating={4}
          image="https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP784/ipad-pro-11-2018.png"
        />

        <Product
          id="516515616"
          title="imac"
          price={5000}
          rating={5}
          image="https://media.idownloadblog.com/wp-content/uploads/2017/06/macOS-High-Sierra-Wallpaper-Hero-with-iMac-Pro-iDownloadBlog-splash.png"
        />
      </div>
    </div>
  );
}

export default Home;
