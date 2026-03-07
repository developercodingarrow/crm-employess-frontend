"use client";
import React, { useContext, useState } from "react";
import styles from "./adminprojectlayout.module.css";
import useFillters from "../../_custome_hooks/useFillters";
import { FillterContext } from "../../_contextApi/FillterContextProvider";
import MobileFilterDrawer from "../projects_page_layout/Mobile_Filter_Drawer/MobileFilterDrawer";
import HeaderTopBar from "../elements/header_top_bar/HeaderTopBar";
import FillterBar from "../projects_page_layout/FillterBar/FillterBar";
import Searchbar from "../elements/searchbar/Searchbar";
import { CiFilter } from "react-icons/ci";
import AdminProjectCard from "./AdminProjectCard";
import { AppContext } from "../../_contextApi/AppContextProvider";
export default function AdminProjectLayout(props) {
  const { apiData } = props;
  const { toggleFilter } = useContext(AppContext);

  console.log("apiData", apiData);
  const {
    visibleRows,
    filterByPropertyType,
    propertyTypeFilter,
    filterByBuilder,
    builderFilter,
    filterByPrice,
    priceRange,
    searchByLocation,
    locationSearch,
    searchByPropertyName, // ✅ Get property name search function
    propertyNameSearch,

    getUniqueBuilders,
    getPriceLimits,
  } = useFillters(apiData);
  const { handelopenFillter } = useContext(FillterContext);

  return (
    <div className={styles.main_container}>
      <MobileFilterDrawer
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
      <section className={styles.page_header}>
        <HeaderTopBar
          pageTitle="Project Management"
          pageSubtitle=" Manage and track your Project efficiently"
        />
      </section>
      <div className={styles.inner_container}>
        <div className={styles.sidefillter_wrapper}>
          <FillterBar
            filterByPropertyType={filterByPropertyType}
            propertyTypeFilter={propertyTypeFilter}
            filterByBuilder={filterByBuilder}
            builderFilter={builderFilter}
            filterByPrice={filterByPrice}
            priceRange={priceRange}
            searchByLocation={searchByLocation}
            locationSearch={locationSearch}
            getUniqueBuilders={getUniqueBuilders}
            getPriceLimits={getPriceLimits}
          />
        </div>
        <div className={styles.project_wrapper}>
          <div className={styles.search_wrapper}>
            <div className={styles.searbar_wrapper}>
              <Searchbar onSearch={searchByPropertyName} />
            </div>
            <div className={styles.filtter_btn} onClick={toggleFilter}>
              <CiFilter />
            </div>
          </div>

          <div className={styles.project_card_wrapper}>
            {visibleRows.map((item, index) => {
              return (
                <div className={styles.card_wrapper} key={index}>
                  <AdminProjectCard key={index} item={item} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
