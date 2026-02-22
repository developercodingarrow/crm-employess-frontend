"use client";

import { useState, useEffect, useContext } from "react";
import { FillterContext } from "../_contextApi/FillterContextProvider";

export default function useFillters(initialRows, initialRowsPerPage = 10) {
  const { visibleRows, setvisibleRows } = useContext(FillterContext);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [propertyTypeFilter, setPropertyTypeFilter] = useState([]);
  const [builderFilter, setBuilderFilter] = useState([]); // ✅ New builder filter
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 }); // ✅ Default range
  const [locationSearch, setLocationSearch] = useState(""); // ✅ New location search
  const [propertyNameSearch, setPropertyNameSearch] = useState(""); // ✅ New property name search
  const [originalData, setOriginalData] = useState([]);

  // Store original data
  useEffect(() => {
    if (initialRows?.length > 0) {
      setOriginalData(initialRows);

      // Set initial price range from data
      const prices = initialRows.map((item) => item.minPrice);
      const maxPrice = Math.max(...prices, 10000000);
      const initialPriceRange = { min: 0, max: maxPrice };
      setPriceRange(initialPriceRange);

      // Initial visible rows
      setvisibleRows(initialRows.slice(0, rowsPerPage));
    }
  }, [initialRows, setvisibleRows, rowsPerPage]);

  // Apply filters whenever filter changes
  useEffect(() => {
    if (originalData?.length > 0) {
      applyFilters();
    }
  }, [
    propertyTypeFilter,
    builderFilter,
    priceRange,
    locationSearch,
    propertyNameSearch,
    rowsPerPage,
  ]);

  const applyFilters = () => {
    let filteredData = [...originalData];

    // Apply property type filter
    if (propertyTypeFilter.length > 0) {
      filteredData = filteredData.filter((item) =>
        propertyTypeFilter.includes(item.propertyType),
      );
    }

    // ✅ Apply builder filter
    if (builderFilter.length > 0) {
      filteredData = filteredData.filter((item) =>
        builderFilter.includes(item.builder),
      );
    }

    // ✅ FIXED: Price range filter
    filteredData = filteredData.filter((item) => {
      // Property price is BETWEEN min and max slider values
      // return item.minPrice >= priceRange.min && item.minPrice <= priceRange.max;
      // Check if the property's price range OVERLAPS with the selected filter range
      return item.minPrice <= priceRange.max && item.maxPrice >= priceRange.min;
    });

    // ✅ Apply location search (city + state)
    if (locationSearch.trim()) {
      const searchTerm = locationSearch.toLowerCase().trim();
      filteredData = filteredData.filter((item) => {
        const city = item.city?.toLowerCase() || "";
        const state = item.state?.toLowerCase() || "";
        const fullLocation = `${city} ${state}`;

        return (
          city.includes(searchTerm) ||
          state.includes(searchTerm) ||
          fullLocation.includes(searchTerm)
        );
      });
    }

    // ✅ Apply property name search
    if (propertyNameSearch.trim()) {
      const searchTerm = propertyNameSearch.toLowerCase().trim();
      filteredData = filteredData.filter((item) => {
        const propertyName = item.propertyName?.toLowerCase() || "";
        return propertyName.includes(searchTerm);
      });
    }

    // Apply pagination
    const slicedData = filteredData.slice(0, rowsPerPage);
    setvisibleRows(slicedData);
  };

  const filterByPropertyType = (types) => {
    setPropertyTypeFilter(types);
  };

  // ✅ New function for builder filter
  const filterByBuilder = (builders) => {
    setBuilderFilter(builders);
  };

  // ✅ New function for price range
  const filterByPrice = (min, max) => {
    setPriceRange({ min, max });
  };

  // ✅ New function for location search
  const searchByLocation = (searchTerm) => {
    setLocationSearch(searchTerm);
  };

  // ✅ Get unique builders from data
  const getUniqueBuilders = () => {
    if (!originalData.length) return [];
    const builders = [...new Set(originalData.map((item) => item.builder))];
    return builders.filter(Boolean); // Remove null/undefined
  };

  // ✅ New function for property name search
  const searchByPropertyName = (searchTerm) => {
    setPropertyNameSearch(searchTerm);
  };

  // ✅ Get min and max price from data
  const getPriceLimits = () => {
    if (!originalData.length) return { min: 0, max: 10000000 };

    // Find the highest maxPrice
    const maxPriceValue = Math.max(
      ...originalData.map((item) => item.maxPrice),
    );

    return {
      min: 0,
      max: maxPriceValue,
    };
  };

  return {
    visibleRows,
    rowsPerPage,
    setRowsPerPage,
    filterByPropertyType,
    propertyTypeFilter,
    filterByBuilder, // ✅ Export builder filter
    builderFilter, // ✅ Export builder filter state
    filterByPrice, // ✅ Export price filter
    priceRange, // ✅ Export current price range
    searchByLocation, // ✅ Export location search
    locationSearch, // ✅ Export current search term
    searchByPropertyName, // ✅ Export property name search
    propertyNameSearch, // ✅ Export current search term
    getUniqueBuilders, // ✅ Helper to get builders list
    getPriceLimits,
  };
}
