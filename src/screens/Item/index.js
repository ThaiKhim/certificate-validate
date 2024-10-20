import React, { useState } from "react";
import cn from "classnames";
import styles from "./Item.module.sass";
import Users from "./Users";
import Control from "./Control";
import Options from "./Options";
import TextDisplay from "../../components/TextDisplay" ;
const navLinks = ["Info", "Owners", "History", "Bids"];

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

const users = [
  {
    name: "User 1",
    position: "Phòng công tác sinh viên",
    avatar: "/images/content/avatar-2.jpg",
    reward: "/images/content/reward-1.svg",
  },
  {
    name: "User 2",
    position: "Đoàn trường",
    avatar: "/images/content/avatar-1.jpg",
  },
  {
    name: "User 3",
    position: "Cấp khoa",
    avatar: "/images/content/avatar-1.jpg",
  },
  {
    name: "User 4",
    position: "Nhà trường",
    avatar: "/images/content/avatar-1.jpg",
  },
  {
    name: "User 5",
    position: "Đoàn trường",
    avatar: "/images/content/avatar-1.jpg",
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
              <TextDisplay
                className={styles.field}
                label="Tên sinh viên"
                value="e.g., Redeemable Bitcoin Card with logo"
              />
              <TextDisplay
                className={styles.field}
                label="Xếp loại rèn luyện"
                value="e.g., Redeemable Bitcoin Card with logo"
              />
              <div className={styles.row}>
                <div className={styles.col}>
                  <TextDisplay
                  className={styles.field}
                  label="Lớp sinh hoạt"
                  value="20GIT"
                  />
                </div>
                <div className={styles.col}>
                  <TextDisplay
                  className={styles.field}
                  label="Mã sinh viên"
                  value="20IT911"
                  />
                </div>
                <div className={styles.col}>
                  <TextDisplay
                  className={styles.field}
                  label="GPA"
                  value="222"
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
