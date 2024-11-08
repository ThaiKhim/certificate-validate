import React from "react";
import cn from "classnames";
import styles from "./Filters.module.sass";
import Checkbox from "../../../components/Checkbox";

const Filters = ({
  className,
  filters,
  selectedFilters,
  setSelectedFilters,
}) => {
  const handleChange = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((x) => x !== filter));
    } else {
      setSelectedFilters((selectedFilters) => [...selectedFilters, filter]);
    }
  };

  return (
    <div className={cn(styles.filters, className)}>
      <div className={styles.info}>Bộ lọc</div>
      <div className={styles.group}>
        {filters.map((x, index) => (
          <Checkbox
            className={styles.checkbox}
            content={x}
            value={selectedFilters.includes(x)}
            onChange={() => handleChange(x)}
            key={index}
          />
        ))}
      </div>
      <div className={styles.btns}>
        <button className={cn("button-stroke button-small", styles.button)}>
          Chọn tất cả
        </button>
        <button className={cn("button-stroke button-small", styles.button)}>
          Bỏ chọn tất cả
        </button>
      </div>
    </div>
  );
};

export default Filters;
