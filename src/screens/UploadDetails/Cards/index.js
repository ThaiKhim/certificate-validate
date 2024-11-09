import React from "react";
import cn from "classnames";
import styles from "./Cards.module.sass";
import Icon from "../../../components/Icon";

const Cards = ({ className, items, onCardClick }) => {
  return (
    <div className={cn(className, styles.cards)}>
      {items.map((item, index) => (
        <div
          className={styles.card}
          key={index}
          onClick={() => onCardClick(item)}
        >
          <div className={styles.plus} style={{ backgroundColor: item.color }}>
            <Icon name={item.isCreateNew ? "plus" : "circle"} size="24" />
          </div>
          <div className={styles.subtitle}>{item.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
