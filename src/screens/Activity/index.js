import React, { useState } from "react";
import cn from "classnames";
import styles from "./Activity.module.sass";
import Control from "../../components/Control";
import Loader from "../../components/Loader";
import Icon from "../../components/Icon";
import Filters from "./Filters";

const breadcrumbs = [
  {
    title: "Profile",
    url: "/",
  },
  {
    title: "Activity",
  },
];

const items = [
  {
    title: "Huynh Thai Khiem",
    description: "Verified",
    date: "2 days ago",
    image: "/images/degree/NguynQToan.jpg",
    color: "#EF466F",
  },
  {
    title: "Mai The Son",
    description: "Verified",
    date: "2 days ago",
    image: "/images/degree/NguynQToan.jpg",
    color: "#141416",
  },
  {
    title: "Nguyen Hung Vinh",
    description: "Verified",
    date: "2 days ago",
    image: "/images/degree/NguynHVinh.jpg",
    color: "#141416",
  },
  {
    title: "Nguyen Quoc Toan",
    description: "Verified",
    date: "2 days ago",
    image: "/images/degree/NguynQToan.jpg",
    color: "#141416",
  },
  {
    title: "Dao Xuan Hai",
    description: "Rejected",
    date: "2 days ago",
    image: "/images/degree/DaoXuanHai.jpg",
    color: "#141416",
  },
  {
    title: "Nguyen Thanh Nam",
    description: "Rejected",
    date: "2 days ago",
    image: "/images/degree/NguynThNam.jpg",
    color: "#141416",
  },
];

const filters = [
  "Verified",
  "Rejected",
];

const navLinks = ["My activity", "Following", "All activity"];

const Activity = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [visible, setVisible] = useState(0);

  return (
    <div className={styles.page}>
      <Control className={styles.control} item={breadcrumbs} />
      <div className={cn("section-pt80", styles.body)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.top}>
            <h1 className={cn("h2", styles.title)}>Activity</h1>
            <button
              className={cn(
                "button-stroke button-small mobile-hide",
                styles.button
              )}
            >
              Mark all as read
            </button>
            <button
              className={cn(
                "button-circle-stroke button-small tablet-show",
                styles.toggle,
                { [styles.active]: visible }
              )}
              onClick={() => setVisible(!visible)}
            >
              <Icon name="filter" size="24" />
              <Icon name="close" size="14" />
            </button>
          </div>
          <div className={styles.row}>
            <div className={styles.wrapper}>
              <div className={styles.nav}>
                {navLinks.map((x, index) => (
                  <button
                    className={cn(styles.link, {
                      [styles.active]: index === activeIndex,
                    })}
                    onClick={() => setActiveIndex(index)}
                    key={index}
                  >
                    {x}
                  </button>
                ))}
              </div>
              <div className={styles.list}>
                {items.map((x, index) => (
                  <div className={styles.item} key={index}>
                    <div className={styles.preview}>
                      <img src={x.image} alt="Notification" />
                      {/* <div
                        className={styles.icon}
                        style={{ backgroundColor: x.color }}
                      >
                        <img src={x.icon} alt="Icon notification" />
                      </div> */}
                    </div>
                    <div className={styles.details}>
                      <div className={styles.subtitle}>{x.title}</div>
                      <div className={styles.description}>{x.description}</div>
                      <div className={styles.date}>{x.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Loader className={styles.loader} />
            </div>
            <button
              className={cn(
                "button-stroke button-small mobile-show",
                styles.button
              )}
            >
              Mark all as read
            </button>
            <Filters
              className={cn(styles.filters, { [styles.active]: visible })}
              filters={filters}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
