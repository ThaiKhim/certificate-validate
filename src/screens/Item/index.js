import React, { useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Users from "./Users";
import Control from "./Control";
import Options from "./Options";
import TextDisplay from "../../components/TextDisplay" ;

// const navLinks = ["Info", "Owners", "History", "Bids"];


const categories = [
  {
    category: "black",
    content: "Engineering degree",
  },
  {
    category: "purple",
    content: "Global IT",
  },
];

const users = [
  {
    name: "User 1",
    position: "Student Affairs Department",
    avatar: "/images/content/avatar-2.jpg",
    reward: "/images/content/reward-1.svg",
    verified: true,
  },
  {
    name: "User 2",
    position: "Training department",
    avatar: "/images/content/avatar-1.jpg",
    verified: true,
  },
  {
    name: "User 3",
    position: "School Youth Union",
    avatar: "/images/content/avatar-1.jpg",
    verified: true,
  },
  {
    name: "User 4",
    position: "Cấp khoa",
    avatar: "/images/content/avatar-1.jpg",
    verified: false,
  },
  {
    name: "User 5",
    position: "School presidency",
    avatar: "/images/content/avatar-1.jpg",
    verified: false,
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
                srcSet="/images/certificate/huynh-thai-khiem.png"
                src="/images/certificate/huynh-thai-khiem.png"
                alt="Item"
              />
            </div>
            {/* <Options className={styles.options} /> */}
            <div className={styles.item}>
              <div className={styles.fieldset}>
              <h2 className={cn("h4", styles.title)}>Detailed information</h2>
              <TextDisplay
                className={styles.field}
                label="Student's name"
                value="Huỳnh Thái Khiêm"
              />
              <TextDisplay
                className={styles.field}
                label="Training Classification"
                value="Good"
              />
              <div className={styles.row}>
                <div className={styles.col}>
                  <TextDisplay
                  className={styles.field}
                  label="Class"
                  value="20GIT"
                  />
                </div>
                <div className={styles.col}>
                  <TextDisplay
                  className={styles.field}
                  label="Student's ID"
                  value="20IT911"
                  />
                </div>
                <div className={styles.col}>
                  <TextDisplay
                  className={styles.field}
                  label="GPA"
                  value="3.4"
                  />
                </div>
              </div>

              </div>
                
            </div>

          </div>
          <div className={styles.details}>
            <h1 className={cn("h3", styles.title)}>Huynh Thai Khiem</h1>
            <div className={styles.cost}>
              <div className={cn("status-stroke-green", styles.price)}>
                20IT911
              </div>
              <div className={cn("status-stroke-black", styles.price)}>
                20GIT
              </div>
              {/* <div className={styles.counter}>10 in stock</div> */}
            </div>
            <div className={styles.info}>
            Sinh viên hoàn thành tất cả tín chỉ{" "}
            </div>
            {/* <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={cn(
                    { [styles.active]: index === activeIndex },
                    styles.link
                  )}
                  onClick={() => setActiveIndex(index)}
                  key={index}
                >
                  {x}
                </button>
              ))}
            </div> */}
            <Users className={styles.users} items={users} />
            <Control className={styles.control} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
