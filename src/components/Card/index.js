import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import cn from "classnames";
import { Link, useHistory } from "react-router-dom";
import styles from "./Card.module.sass";

const Card = ({ className, item, isLoading }) => {
  const history = useHistory();

  const handleSeeDetails = () => {
    if (!isLoading) {
      history.push(`/item?address=${item?.address}&tokenId=${item?.id}`);
    }
  };

  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.preview}>
        {isLoading ? (
          <Skeleton height={150} />
        ) : (
          <img
            srcSet={`${item.image2x} 2x`}
            src={item.image}
            alt="Card"
            className={styles.image}
          />
        )}
        <div className={styles.control}>
          {isLoading ? (
            <Skeleton width={80} />
          ) : (
            <div
              className={cn(
                { "status-green": item.category === "green" },
                styles.category
              )}
            >
              {item.categoryText}
            </div>
          )}
          <button
            className={cn("button-small", styles.button)}
            onClick={handleSeeDetails}
            disabled={isLoading}
          >
            {isLoading ? <Skeleton width={50} /> : <span>See details</span>}
          </button>
        </div>
      </div>
      <Link className={styles.link} to={item?.url}>
        <div className={styles.body}>
          <div className={styles.line}>
            <div className={styles.title}>
              {isLoading ? <Skeleton width={100} /> : item.studentName}
            </div>
            <div className={styles.price}>
              {isLoading ? <Skeleton width={60} /> : item.studentID}
            </div>
          </div>
          <div className={styles.line}>
            <div className={styles.users}>
              {isLoading
                ? Array(3)
                    .fill()
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        circle
                        height={30}
                        width={30}
                        style={{ marginRight: "10px" }}
                      />
                    ))
                : item.steps.map((x, index) => (
                    <div
                      className={styles.avatar}
                      key={index}
                      style={{ backgroundColor: x.backgroundColor }}
                    >
                      {x.step}
                    </div>
                  ))}
            </div>
            <div className={styles.counter}>
              {isLoading ? (
                <Skeleton width={50} />
              ) : (
                `${item.countOfVerifiers} Verified`
              )}
            </div>
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.status}>
            {isLoading ? (
              <Skeleton width={80} />
            ) : (
              <>
                Standing <span>{item.studentCategory}</span>
              </>
            )}
          </div>
          <div className={styles.status}>
            {isLoading ? (
              <Skeleton width={40} />
            ) : (
              <>
                Grade <span>{item.studentGPA}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
