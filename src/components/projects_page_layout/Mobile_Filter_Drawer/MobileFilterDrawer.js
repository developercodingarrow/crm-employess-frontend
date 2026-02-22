"use client";
import React, { useContext } from "react";
import styles from "./mobilefilterdrawer.module.css";
import { GoX } from "react-icons/go";
import FillterBar from "../FillterBar/FillterBar";
import { AppContext } from "../../../_contextApi/AppContextProvider";

export default function MobileFilterDrawer(props) {
  const {
    locationSearch,
    searchByLocation,
    filterByPropertyType,
    propertyTypeFilter,
    filterByPrice,
    priceRange,
    filterByBuilder,
    builderFilter,
    getUniqueBuilders,
    getPriceLimits,
  } = props;
  const { isFilterOpen, setIsFilterOpen, toggleFilter, closeFilter } =
    useContext(AppContext);
  if (!isFilterOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className={styles.overlay} onClick={closeFilter}></div>

      {/* Drawer */}
      <div className={styles.drawer}>
        <div className={styles.drawer_header}>
          <h3 className={styles.drawer_title}>Filters</h3>
          <button className={styles.close_btn} onClick={closeFilter}>
            <GoX />
          </button>
        </div>
        <div className={styles.drawer_content}>
          {/* We'll add FilterBar here later */}
          <div>
            <FillterBar
              locationSearch={locationSearch}
              searchByLocation={searchByLocation}
              filterByPropertyType={filterByPropertyType}
              propertyTypeFilter={propertyTypeFilter}
              filterByPrice={filterByPrice}
              filterByBuilder={filterByBuilder}
              builderFilter={builderFilter}
              getUniqueBuilders={getUniqueBuilders}
              getPriceLimits={getPriceLimits}
            />
          </div>
        </div>
      </div>
    </>
  );
}
