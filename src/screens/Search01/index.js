import React, { useState } from "react";
import cn from "classnames";
import styles from "./Search01.module.sass";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import Dropdown from "../../components/Dropdown";

// data
import { bids } from "../../mocks/bids";

const navLinks = ["All items", "Art", "Game", "Photography", "Music", "Video"];

const dateOptions = ["Mới nhất", "Cũ nhất"];
const likesOptions = ["Tất cả", "Khóa 20", "Khóa 21","Khóa 22","Khóa 23","Khóa 24","Khóa 25",];
const colorOptions = ["Tất cả", "GIT", "GBA", "SE", "BA", "MC", "AD", "CE"];
const creatorOptions = ["Tất cả", "Bằng tốt nghiệp","Hoạt động Đoàn"];

const Search = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [date, setDate] = useState(dateOptions[0]);
  const [likes, setLikes] = useState(likesOptions[0]);
  const [color, setColor] = useState(colorOptions[0]);
  const [creator, setCreator] = useState(creatorOptions[0]);

  const [search, setSearch] = useState("");

  const [values, setValues] = useState([5]);

  const handleSubmit = (e) => {
    alert();
  };

  const STEP = 0.1;
  const MIN = 0.01;
  const MAX = 10;

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <div className={styles.title}>Nhập tìm kiếm</div>
          <form
            className={styles.search}
            action=""
            onSubmit={() => handleSubmit()}
          >
            <input
              className={styles.input}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              placeholder="Tìm kiếm"
              required
            />
            <button className={styles.result}>
              <Icon name="search" size="16" />
            </button>
          </form>
        </div>
        <div className={styles.sorting}>
          <div className={styles.dropdown}>
            <Dropdown
              className={styles.dropdown}
              value={date}
              setValue={setDate}
              options={dateOptions}
            />
          </div>
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
        </div>
        <div className={styles.row}>
          <div className={styles.filters}>
            
            <div className={styles.group}>
              <div className={styles.item}>
                <div className={styles.label}>Niên khóa</div>
                <Dropdown
                  className={styles.dropdown}
                  value={likes}
                  setValue={setLikes}
                  options={likesOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Chuyên nghành</div>
                <Dropdown
                  className={styles.dropdown}
                  value={color}
                  setValue={setColor}
                  options={colorOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Loại bằng cấp</div>
                <Dropdown
                  className={styles.dropdown}
                  value={creator}
                  setValue={setCreator}
                  options={creatorOptions}
                />
              </div>
            </div>
            <div className={styles.reset}>
              <Icon name="close-circle-fill" size="24" />
              <span>Đặt lại bội lọc</span>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.list}>
              {bids.map((x, index) => (
                <Card className={styles.card} item={x} key={index} />
              ))}
            </div>
            <div className={styles.btns}>
              <button className={cn("button-stroke", styles.button)}>
                <span>Xem thêm</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
