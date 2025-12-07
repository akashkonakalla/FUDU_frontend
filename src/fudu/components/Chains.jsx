import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Chains = () => {
  const [vendorData, setVendorData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vendors + firms
  const vendorFirmHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors?order=desc`);
      const newData = await response.json();
      setVendorData(newData?.vendors || []);
      setLoading(false);
    } catch (error) {
      console.error("Vendor fetch failed:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    vendorFirmHandler();
  }, []);

  // Scroll buttons
  const handleScroll = (direction) => {
    const gallery = document.getElementById("chainGallery");
    if (!gallery) return;

    const scrollAmount = 500;
    gallery.scrollTo({
      left: direction === "left"
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

      {/* Scroll Buttons */}
      <div className="btnSection">
        <button onClick={() => handleScroll("left")}>
          <FaRegArrowAltCircleLeft className="btnIcons" />
        </button>
        <button onClick={() => handleScroll("right")}>
          <FaRegArrowAltCircleRight className="btnIcons" />
        </button>
      </div>

      <h3 className="chainTitle">Top restaurant chains in Hyderabad</h3>

      {/* Firm display section */}
      <section className="chainSection" id="chainGallery">
        {vendorData.map((vendor) => (
          <div className="vendorBox" key={vendor._id}>
            {vendor?.firm?.length > 0 ? (
              vendor.firm.map((item) => {
                const imageUrl = item.image || "/images/default-food.png"; // fallback

                return (
                  <Link
                    to={`/products/${item._id}/${item.firmName}`}
                    className="link"
                    key={item._id}
                  >
                    <div className="firmImage">
                      <strong
                        style={{
                          textAlign: "center",
                          display: "block",
                          fontSize: "16px",
                          marginBottom: "5px",
                        }}
                      >
                        {item.firmName}
                      </strong>
                      <img src={imageUrl} alt={item.firmName} />
                    </div>
                  </Link>
                );
              })
            ) : (
              <p className="noFirmText" key={vendor._id + "-nofirm"}>
                No firm added
              </p>
            )}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Chains;
