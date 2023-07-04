import React from 'react'
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FaRegCircleDot } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import hs from "../assets/hp.png";
const UpperSec = () => {
  return (
    <>
    <div className="product-upper-section">
        <div className="photos-slider">
          <img src={hs} alt="hp" className="photos-slider__photo" />
        </div>
        <div className="product-info">
          <div className="product-info__name">
            SAMSUNG Galaxy Buds Pro, Bluetooth Earbuds, True Wireless, Noise
            Cancelling, Charging Case, Quality Sound, Water Resistant, Phantom
            Black (US Version)
          </div>
          <Link className="product-info__provider-website">
            visit the SAMSUNG Store
          </Link>
          <div className="product-info__rating">
            4.4{" "}
            <span className="star">
              {" "}
              <AiFillStar />
            </span>
          </div>
          <hr />
          <div className="product-info__price">
            <span className="discount">-27%</span> $145.00
          </div>
          <div className="product-info__VAT">
            $202.78 Shipping & Import Fees Deposit to Egypt 🥲
          </div>
          <hr />
          <div className="product-info__description">
            <h2>About this product</h2>
            <p>
              Intelligent Active Noise Cancellation: Escape and tune in to your
              own moment of Zen — all with a single tap; Answer calls and
              instantly switch to talking with voice detection and let in the
              sounds that matter most with 4 ambient levels.Note : If the size
              of the earbud tips does not match the size of your ear canals or
              the headset is not worn properly in your ears, you may not obtain
              the correct sound qualities or call performance. Change the earbud
              tips to ones that fit more snugly in your ear High Quality
              ewSound: Relive the memories of every beat of your favorite song
              with an 11-mm woofer and 6.5-mm tweeter built into every ear bud.
              Earbud Dimension (W x H x D)-0.81 x 0.77 x 0.82 inches. Case
              Dimension (W x H x D)-1.97 x 1.98 x 1.09 inches Water Resistant
              Workouts: Water won’t ruin your workout; Your IPX7 water-resistant
              Galaxy Buds Pro can keep the beat going even with a little rain;
              They’re even protected for immersion up to 3 feet deep for a
              half-hour Crystal Clear Calls: No matter where you are, stay
              connected whether you’re owning that virtual meeting or catching
              up with a friend; Our new design reduces background noise, so your
              voice comes through loud and clear. Long Lasting Battery Life: Get
              the juice you need to jam for hours; Wireless charging case is
              included, and you can also share your phone’s battery by placing
              your earbuds on the back of your compatible Galaxy device for
              on-the-go charging Touch Music Control: Control your playlist
              without reaching in your pocket; Skip songs, launch music and
              answer calls simply by tapping your buds, so you can stay in the
              moment Note: Products with electrical plugs are designed for use
              in the US. Outlets and voltage differ internationally and this
              product may require an adapter or converter for use in your
              destination. Please check compatibility before purchasing.
            </p>
          </div>
        </div>
        <hr className='hello-im-under'/>
        <div className="purchase-controls">
          <div className="purchase-controls__header">
            <div className="purchase-controls__header-icon-container">
              <h2>Buy Now :</h2>
              <div className="purchase-controls__header-icon">
                <FaRegCircleDot />
              </div>
            </div>
            <p className="purchase-controls__header-price">$145.00</p>
            <p className="purchase-controls__header-price-VAT">
              $202.78 Shipping & Import Fees Deposit to Egypt🥲
            </p>
          </div>
          <div className="purchase-controls__location">
            <span>
              <HiOutlineLocationMarker />
            </span>
            Deliver to Egypt
          </div>
          <h2 className="stoke">In Stoke</h2>

          <button className="purchase-controls__add-to-cart">
            Add to cart
          </button>
          <button className="purchase-controls__buy-now">Buy Now</button>
        </div>
      </div>
    </>
  )
}

export default UpperSec