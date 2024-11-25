import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Search01.module.sass";
import Icon from "../../components/Icon";
import Card from "../../components/Card";
import Dropdown from "../../components/Dropdown";
import { getAllNFTsPaginated } from "../../apis/web3";

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
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStudents = async (pageToFetch = page, reset = false) => {
    if (isLoading || (!hasMore && !reset)) return;

    setIsLoading(true);

    try {
      const response = await getAllNFTsPaginated(pageToFetch, 10);

      const newStudents = response.items.map((item) => ({
        id: item.id,
        address: item.token.address,
        studentName: item.metadata?.name || "Unknown",
        studentID:
          item.metadata?.attributes?.find(
            (attr) => attr.trait_type === "Student ID"
          )?.value || "N/A",
        studentCategory:
          item.metadata?.attributes?.find(
            (attr) => attr.trait_type === "Classification of Training"
          )?.value || "N/A",
        countOfVerifiers: item.verifers.length,
        studentGPA:
          item.metadata?.attributes?.find((attr) => attr.trait_type === "GPA")
            ?.value || "N/A",
        image: item.image_url || "/images/default.png",
        image2x: item.image_url || "/images/default.png",
        category: "green",
        categoryText: `${item.verifers.length} Verified`,
        url: "/",
        steps: [
          {
            step: <Icon name="check" size="14" fill="#FFFFFF" />,
            backgroundColor: "#9757D7",
          },
          {
            step: <Icon name="check" size="14" fill="#FFFFFF" />,
            backgroundColor: "#EF466F",
          },
          {
            step: <Icon name="check" size="14" fill="#FFFFFF" />,
            backgroundColor: "#45B26B",
          },
        ],
      }));

      const keyedStudents = reset
        ? Object.fromEntries(newStudents.map((s) => [s.id, s]))
        : {
            ...Object.fromEntries(students.map((s) => [s.id, s])),
            ...Object.fromEntries(newStudents.map((s) => [s.id, s])),
          };

      setStudents(Object.values(keyedStudents));
      setHasMore(response.pagination.hasMore);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setStudents([]);
    setHasMore(true);
    fetchStudents(1, true);
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className={cn("section-pt80", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <div className={styles.title}>Search</div>
          <form className={styles.search} onSubmit={handleSearchSubmit}>
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
              {isLoading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <Card className={styles.card} isLoading key={index} />
                  ))
                : students.map((x, index) => (
                    <Card className={styles.card} item={x} key={index} />
                  ))}
            </div>
            {hasMore && (
              <div className={styles.btns}>
                <button
                  className={cn("button-stroke", styles.button)}
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  <span>{isLoading ? "Loading..." : "See more"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
