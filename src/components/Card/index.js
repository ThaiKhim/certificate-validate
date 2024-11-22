import React from "react";
import cn from "classnames";
import { Link, useHistory } from "react-router-dom";
import styles from "./Card.module.sass";

const Card = ({ className, item }) => {
  const history = useHistory();

  // Hàm xử lý khi nhấn nút
  const handleSeeDetails = () => {
    console.log(item);

    history.push(`/item?address=${item.address}&tokenId=${item.id}`);
  };

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
          {/* Button chuyển hướng */}
          <button
            className={cn("button-small", styles.button)}
            onClick={handleSeeDetails}
          >
            <span>See details</span>
          </button>
        </div>
      </div>
      {/* Link cho phần khác */}
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
