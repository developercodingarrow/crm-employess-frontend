"use client";
import React, { useState, useEffect } from "react";
import styles from "./priceSlider.module.css";
import { GoDash } from "react-icons/go";

export default function PriceSlider(props) {
  const { min, max, value, onChange } = props;
  const [range, setRange] = useState(
    value || { min: min || 0, max: max || 10000000 },
  );

  useEffect(() => {
    setRange(value || { min: min || 0, max: max || 10000000 });
  }, [value, min, max]);

  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value);
    if (newMin > range.max) return;

    const newRange = { min: newMin, max: range.max };
    setRange(newRange);
    onChange(newRange.min, newRange.max);
  };

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value);
    if (newMax < range.min) return;

    const newRange = { min: range.min, max: newMax };
    setRange(newRange);
    onChange(newRange.min, newRange.max);
  };

  const formatPrice = (price) => {
    if (price >= 10000000) return `${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(1)} L`;
    if (price >= 1000) return `${(price / 1000).toFixed(0)} K`;
    return `₹${price}`;
  };

  const minPercentage = ((range.min - min) / (max - min)) * 100;
  const maxPercentage = ((range.max - min) / (max - min)) * 100;

  return (
    <div className={styles.price_slider_container}>
      {/* Price Display */}
      <div className={styles.price_display}>
        <div className={styles.price_box}>
          <span className={styles.price_label}>Min</span>
          <span className={styles.price_value}>{formatPrice(range.min)}</span>
        </div>
        <GoDash className={styles.separator} />
        <div className={styles.price_box}>
          <span className={styles.price_label}>Max</span>
          <span className={styles.price_value}>{formatPrice(range.max)}</span>
        </div>
      </div>

      {/* Slider Track */}
      <div className={styles.slider_track}>
        <div
          className={styles.slider_fill}
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
          }}
        ></div>
      </div>

      {/* Range Inputs */}
      <div className={styles.range_inputs}>
        <input
          type="range"
          min={min}
          max={max}
          value={range.min}
          onChange={handleMinChange}
          className={styles.range_input}
          style={{ zIndex: range.min > max / 2 ? 2 : 1 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={range.max}
          onChange={handleMaxChange}
          className={styles.range_input}
          style={{ zIndex: range.max < max / 2 ? 2 : 1 }}
        />
      </div>
    </div>
  );
}
