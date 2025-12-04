import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Chains = () => {
  const [vendorData, setVendorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const vendorFirmHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors?order=desc`);
      const newData = await response.json();
      setVendorData(newData);
      console.log("API DATA:", newData);
      setLoading(false);
    } catch (error) {
      alert("Failed to fetch data");
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    vendorFirmHandler();
  }, []);

  const handleScroll = (direction) => {
    const gallery = document.getElementById("chainGallery");
    const scrollAmount = 500;

    gallery.scrollTo({
      left:
        direction === "left"
          ? gallery.scrollLeft - scrollAmount
          : gallery.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mediaChainSection">

      {/* Loader */}
      {loading && (
        <div className="loaderSection">
          <div className="spinnerLoaderWrapper">
            <div className="spinnerLoader"></div>
            <p className="spinnerLoaderText">Loading…</p>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="btnSection">
        <button onClick={() => handleScroll("left")}>
          <FaRegArrowAltCircleLeft className="btnIcons" />
        </button>
        <button onClick={() => handleScroll("right")}>
          <FaRegArrowAltCircleRight className="btnIcons" />
        </button>
      </div>

      <h3 className="chainTitle">Top restaurant chains in Hyderabad</h3>

      {/* Main section */}
      <section className="chainSection" id="chainGallery">
        {vendorData?.vendors?.map((vendor) => (
          <div className="vendorBox" key={vendor._id}>
            
            {vendor?.firm?.map((item) => {
              // Choose image URL
              const imageUrl = item.image?.startsWith("http")
                ? item.image                     // Cloudinary URL
                : `${API_URL}/uploads/${item.image}`; // Local fallback

            //   console.log("IMAGE:", imageUrl);

              return (
                <Link
                  to={`/products/${item._id}/${item.firmName}`}
                  className="link"
                  key={item._id}
                >
                  <div className="firmImage">
                    <img src={imageUrl} alt={item.firmName} />
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Chains;
