import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { Link } from "react-router-dom";

const FirmCollections = () => {
  const [firmData, setFirmData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch vendor + firm data
  const firmDataHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/vendor/all-vendors`);
      const newFirmData = await response.json();
      setFirmData(newFirmData.vendors || []);
    } catch (error) {
      console.error("Firm data not fetched", error);
      alert("Firm data not fetched");
    }
  };

  useEffect(() => {
    firmDataHandler();
  }, []);

  // Handle region filtering
  const filterHandler = (region, category) => {
    setSelectedRegion(category.toLowerCase());
    setActiveCategory(category);
  };

  return (
    <>
      <h3>Restaurants with online food delivery in Hyderabad</h3>

      {/* Filter Buttons */}
      <div className="filterButtons">
        <button
          onClick={() => filterHandler("All", "all")}
          className={activeCategory === "all" ? "activeButton" : ""}
        >
          All
        </button>

        <button
          onClick={() => filterHandler("South-Indian", "south-indian")}
          className={activeCategory === "south-indian" ? "activeButton" : ""}
        >
          South-Indian
        </button>

        <button
          onClick={() => filterHandler("North-Indian", "north-indian")}
          className={activeCategory === "north-indian" ? "activeButton" : ""}
        >
          North-Indian
        </button>

        <button
          onClick={() => filterHandler("Chinese", "chinese")}
          className={activeCategory === "chinese" ? "activeButton" : ""}
        >
          Chinese
        </button>

        <button
          onClick={() => filterHandler("Bakery", "bakery")}
          className={activeCategory === "bakery" ? "activeButton" : ""}
        >
          Bakery
        </button>
      </div>

      {/* Firm List */}
      <section className="firmSection">
        {firmData.map((vendor) =>
          vendor?.firm?.map((item) => {
            // Match category filter
            const categoryMatch =
              selectedRegion === "all" ||
              item.region.includes(selectedRegion);

            if (!categoryMatch) return null;

            const imageUrl = item.image || "/images/default-food.png";

            return (
              <Link
                to={`/products/${item._id}/${item.firmName}`}
                className="link"
                key={item._id}
              >
                <div className="zoomEffect">
                  <div className="firmGroupBox">
                    <div className="firmGroup">
                      <img src={imageUrl} alt={item.firmName} />
                      <div className="firmOffer">{item.offer}</div>
                    </div>

                    <div className="firmDetails">
                      <strong>{item.firmName}</strong>
                      <div className="firmArea">{item.region.join(", ")}</div>
                      <div className="firmArea">{item.area}</div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </section>
    </>
  );
};

export default FirmCollections;
