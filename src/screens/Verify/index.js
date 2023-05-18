import React, { useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Users from "./Users";
import Control from "./Control";
import Options from "./Options";



const categories = [
  {
    category: "black",
    content: "art",
  },
  {
    category: "purple",
    content: "unlockable",
  },
];


const Item = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.bg}>
            <div className={styles.preview}>
              <div className={styles.categories}>
                {categories.map((x, index) => (
                  <div
                    className={cn(
                      { "status-black": x.category === "black" },
                      { "status-purple": x.category === "purple" },
                      styles.category
                    )}
                    key={index}
                  >
                    {x.content}
                  </div>
                ))}
              </div>
              <img
                srcSet="images/degree/NguynThNam.jpg"
                src="images/degree/NguynThNam.jpg"
                alt="PendingCertificate"
              />
            </div>
            <Options className={styles.options} />
          </div>
          <div className={styles.details}>
            <h1 className={cn("h3", styles.title)}>Huynh Thai Khiem</h1>
            <div className={styles.cost}>
              <div className={cn("status-stroke-green", styles.price)}>
                University
              </div>
              <div className={cn("status-stroke-black", styles.price)}>
                20IT775
              </div>
              <div className={styles.counter}>10 in stock</div>
            </div>
            <Control className={styles.control} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
