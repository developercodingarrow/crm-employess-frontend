"use client";
import React, { useState, useEffect } from "react";
import styles from "./fillterbar.module.css";
import LocationSearch from "../fillter_elements/LocationSearch/LocationSearch";
import FilterCheckbox from "../fillter_elements/fillter_checkbox/FilterCheckbox";
import PriceSlider from "../fillter_elements/PriceSlider/PriceSlider";
export default function FillterBar(props) {
  const {
    locationSearch,
    searchByLocation,
    filterByPropertyType,
    propertyTypeFilter,
    priceRange,
    filterByPrice,
    filterByBuilder,
    builderFilter,
    getUniqueBuilders,
    getPriceLimits,
  } = props;
  const [selectedTypes, setSelectedTypes] = useState(propertyTypeFilter || []);
  const [priceLimits, setPriceLimits] = useState({ min: 0, max: 10000000 });
  const [builders, setBuilders] = useState([]);
  const [selectedBuilders, setSelectedBuilders] = useState(builderFilter || []);

  // Get unique builders when component mounts
  useEffect(() => {
    if (getUniqueBuilders) {
      setBuilders(getUniqueBuilders());
    }
    if (getPriceLimits) {
      setPriceLimits(getPriceLimits());
    }
  }, [getUniqueBuilders, getPriceLimits]);

  // Sync with parent
  useEffect(() => {
    setSelectedTypes(propertyTypeFilter || []);
  }, [propertyTypeFilter]);

  useEffect(() => {
    setSelectedBuilders(builderFilter || []);
  }, [builderFilter]);

  const handleLocationSearch = (searchTerm) => {
    searchByLocation(searchTerm);
  };

  const handlePropertyTypeChange = (newSelectedTypes) => {
    setSelectedTypes(newSelectedTypes);
    filterByPropertyType(newSelectedTypes);
  };

  const handlePriceChange = (min, max) => {
    filterByPrice(min, max);
  };

  const handleBuilderChange = (newSelectedBuilders) => {
    setSelectedBuilders(newSelectedBuilders);
    filterByBuilder(newSelectedBuilders);
  };

  const handleClearAll = () => {
    setSelectedTypes([]);
    setSelectedBuilders([]);
    filterByPropertyType([]);
    filterByBuilder([]);
    filterByPrice(priceLimits.min, priceLimits.max);
    searchByLocation(""); // ✅ Clear location search
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.inner_container}>
        <div className={styles.fillter_header}>
          <div className={styles.fillter_title}>Filter</div>
          <div className={styles.btn_container}>
            <button onClick={handleClearAll} className={styles.clearAll_btn}>
              clear all
            </button>
          </div>
        </div>

        <LocationSearch
          onSearch={handleLocationSearch}
          initialValue={locationSearch}
        />
        {/* Property Type Section */}
        <section className={styles.fillter_section}>
          <div className={styles.section_title}>Property Type</div>
          <div className={styles.checkbox_group}>
            <FilterCheckbox
              label="Luxury"
              value="luxury"
              selectedValues={selectedTypes}
              onChange={handlePropertyTypeChange}
            />
            <FilterCheckbox
              label="Affordable"
              value="affordable"
              selectedValues={selectedTypes}
              onChange={handlePropertyTypeChange}
            />
          </div>
        </section>

        {/* ✅ Price Range Section */}
        <section className={styles.fillter_section}>
          <div className={styles.section_title}>Price Range</div>
          <PriceSlider
            min={priceLimits.min}
            max={priceLimits.max}
            value={priceRange}
            onChange={handlePriceChange}
          />
        </section>

        {/* Builder Section */}
        <section className={styles.fillter_section}>
          <div className={styles.section_title}>Builder</div>
          <div className={styles.checkbox_group}>
            {builders.map((builder) => (
              <FilterCheckbox
                key={builder}
                label={builder}
                value={builder}
                selectedValues={selectedBuilders}
                onChange={handleBuilderChange}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
