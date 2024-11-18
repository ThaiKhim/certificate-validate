import React from "react";
import cn from "classnames";
import styles from "./Cards.module.sass";
import Icon from "../../../components/Icon";

const Cards = ({ className, items, onCardClick, selectedCard }) => {
  return (
    <div className={cn(className, styles.cardsContainer)}>
      <div className={styles.cards}>
        {items.map((item, index) => (
          <div
            className={cn(styles.card, {
              [styles.selected]:
                selectedCard && selectedCard.address === item.address,
            })}
            key={index}
            onClick={() => onCardClick(item)}
          >
            <div
              className={styles.plus}
              style={{ backgroundColor: item.color }}
            >
              <Icon
                name={
                  selectedCard && selectedCard.address === item.address
                    ? "check"
                    : item.isCreateNew
                    ? "plus"
                    : "check"
                }
                size="24"
              />
            </div>
            <div className={styles.subtitle}>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
