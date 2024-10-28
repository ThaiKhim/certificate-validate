import React, { useState } from "react";
import cn from "classnames";
import styles from "./Search01.module.sass";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import Dropdown from "../../components/Dropdown";

// data
import { students } from "../../mocks/students";

const dateOptions = ["Newest", "Oldest"];
const likesOptions = [
  "All",
  "Class 20",
  "Class 21",
  "Class 22",
  "Class 23",
  "Class 24",
  "Class 25",
];
const colorOptions = ["All", "GIT", "GBA", "SE", "BA", "MC", "AD", "CE"];
const creatorOptions = ["All", "Certificate", "Team Activities"];

const Search = () => {
  const [date, setDate] = useState(dateOptions[0]);
  const [likes, setLikes] = useState(likesOptions[0]);
  const [color, setColor] = useState(colorOptions[0]);
  const [creator, setCreator] = useState(creatorOptions[0]);

  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <div className={styles.title}>Search</div>
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
              placeholder="Search"
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
        </div>
        <div className={styles.row}>
          <div className={styles.filters}>
            <div className={styles.group}>
              <div className={styles.item}>
                <div className={styles.label}>School year</div>
                <Dropdown
                  className={styles.dropdown}
                  value={likes}
                  setValue={setLikes}
                  options={likesOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Specialize in industry</div>
                <Dropdown
                  className={styles.dropdown}
                  value={color}
                  setValue={setColor}
                  options={colorOptions}
                />
              </div>
              <div className={styles.item}>
                <div className={styles.label}>Degree type</div>
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
              <span>Replace the vial</span>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.list}>
              {students.map((x, index) => (
                <Card className={styles.card} item={x} key={index} />
              ))}
            </div>
            <div className={styles.btns}>
              <button className={cn("button-stroke", styles.button)}>
                <span>See more</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
