import React, { useState } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Card.module.sass";
import Icon from "../Icon";

const Card = ({ className, item }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.preview}>
        <img srcSet={`${item.image2x} 2x`} src={item.image} alt="Card" />
        <div className={styles.control}>
          <div
            className={cn(
              { "status-green": item.category === "green" },
              styles.category
            )}
          >
            {item.categoryText}
          </div>
          <button
            className={cn(styles.favorite, { [styles.active]: visible })}
            onClick={() => setVisible(!visible)}
          >
            <Icon name="heart" size="20" />
          </button>
          <button className={cn("button-small", styles.button)}>
            <span>See details</span>
            {/* <Icon name="scatter-up" size="16" /> */}
          </button>
        </div>
      </div>
      <Link className={styles.link} to={item.url}>
        <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title}>{item.studentName}</div>
            <div className={styles.price}>{item.studentID}</div>
          </div>
          <div className={styles.line}>
            <div className={styles.users}>
              {item.steps.map((x, index) => (
                <div
                  className={styles.avatar}
                  key={index}
                  style={{ backgroundColor: x.backgroundColor }}
                >
                  <div>{x.step}</div>
                </div>
              ))}
            </div>
            <div className={styles.counter}>{item.countOfVerifiers}</div>
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.status}>
            {/* <Icon name="candlesticks-up" size="20" /> */}
            Student <span>{item.studentCategory}</span>
          </div>
          <div>
            <div
              className={styles.bid}
              dangerouslySetInnerHTML={{ __html: item.studentGPA }}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
