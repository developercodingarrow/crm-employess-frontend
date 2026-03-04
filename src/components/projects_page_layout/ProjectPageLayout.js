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
import PageHeader from "../elements/page_header/PageHeader";
import HeaderTopBar from "../elements/header_top_bar/HeaderTopBar";
import StatTab from "../elements/stat_tab/StatTab";
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
      <div className={styles.page_header}>
        <HeaderTopBar
          pageTitle="Projects"
          pageSubtitle=" Manage system Projects and Details"
        />
        <div className={styles.stats_bar}>
          <div className={styles.stats_container}>
            <StatTab
              statNumber={apiData?.stats?.total}
              statLabel="Total Projects"
            />
            <StatTab statNumber={apiData?.stats?.luxury} statLabel="Luxury" />
            <StatTab
              statNumber={apiData?.stats?.affordable}
              statLabel="Affordable"
            />
          </div>
        </div>
      </div>

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
        <MobileFooter />
      </section>
    </div>
  );
}
