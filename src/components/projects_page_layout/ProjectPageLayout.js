"use client";
import React, { useContext } from "react";
import styles from "./projectpagelayout.module.css";
import { GoPlus, GoFilter } from "react-icons/go";

import Searchbar from "../elements/searchbar/Searchbar";
import ProjectCard from "../elements/cards/ProjectCard";
import useFillters from "../../_custome_hooks/useFillters";
import FillterBar from "./FillterBar/FillterBar";
import MobileFooter from "../footer/MobileFooter";
import { AppContext } from "../../_contextApi/AppContextProvider";
import MobileFilterDrawer from "./Mobile_Filter_Drawer/MobileFilterDrawer";
export default function ProjectPageLayout(props) {
  const { apiData } = props;
  const { isFilterOpen, setIsFilterOpen, toggleFilter, closeFilter } =
    useContext(AppContext);

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
  } = useFillters(apiData?.projects);

  return (
    <div className={styles.main_container}>
      {/* Mobile Filter Drawer */}
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
      <section className={styles.pageHeader_section}>
        <div className={styles.page_topBar}>
          <div className={styles.page_title}>Projects</div>
          {/* Add container div with #f8fafc background */}
          <div className={styles.button_container}>
            <button className={styles.bar_button}>
              <GoPlus className={styles.button_icon} />
              <span className={styles.btn_text}>Create New Project</span>
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className={styles.stats_bar}>
          <div className={styles.stats_container}>
            <div className={styles.stat_box}>
              <span className={styles.stat_number}>
                {apiData?.stats?.total}
              </span>
              <span className={styles.stat_label}>Total Projects</span>
            </div>
            <div className={styles.stat_box}>
              <span className={styles.stat_number}>
                {apiData?.stats?.luxury}
              </span>
              <span className={styles.stat_label}>Luxury</span>
            </div>
            <div className={styles.stat_box}>
              <span className={styles.stat_number}>
                {apiData?.stats?.affordable}
              </span>
              <span className={styles.stat_label}>Affordable</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.inner_container}>
        <div className={styles.sidefillter_wrapper}>
          <FillterBar
            locationSearch={locationSearch}
            searchByLocation={searchByLocation}
            filterByPropertyType={filterByPropertyType}
            propertyTypeFilter={propertyTypeFilter}
            priceRange={priceRange}
            filterByPrice={filterByPrice}
            filterByBuilder={filterByBuilder}
            builderFilter={builderFilter}
            getUniqueBuilders={getUniqueBuilders}
            getPriceLimits={getPriceLimits}
          />
        </div>

        <div className={styles.project_wrapper}>
          <div className={styles.search_wrapper}>
            <div className={styles.searbar_wrapper}>
              <Searchbar onSearch={searchByPropertyName} />
            </div>
            <div className={styles.fillter_btn_container}>
              <div className={styles.fillter_btn} onClick={toggleFilter}>
                <GoFilter />
                <span className={styles.fillter_text}>Fiilter</span>
              </div>
            </div>
          </div>

          <div className={styles.projectcard_wrapper}>
            {visibleRows.map((project) => {
              return (
                <div className={styles.card_wrapper}>
                  <ProjectCard key={project._id} project={project} />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.footer_wrapper}>
        <div className={styles.dekstopfooter_Wrapper}>dekstop footer</div>
        <div className={styles.mobilefooter_wrapper}>
          <MobileFooter />
        </div>
      </section>
    </div>
  );
}
