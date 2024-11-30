import React, { useState, useEffect } from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Profile.module.sass";
import Icon from "../../components/Icon";
import User from "./User";
import Card from "../../components/Card";
import { getAllNFTsPaginated } from "../../apis/web3";

const navLinks = ["All", "Verified", "Awaiting for verification"];

const socials = [
  {
    title: "twitter",
    url: "https://twitter.com/",
  },
  {
    title: "instagram",
    url: "https://www.instagram.com/",
  },
  {
    title: "facebook",
    url: "https://www.facebook.com/",
  },
];

const Profile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStudents = async (pageToFetch = page, reset = false) => {
    if (isLoading || (!hasMore && !reset)) return;

    const owner = localStorage.getItem("ADDRESS");
    const isVerified =
      activeIndex === 1 ? true : activeIndex === 2 ? false : null;

    setIsLoading(true);

    try {
      const response = await getAllNFTsPaginated(
        pageToFetch,
        10,
        owner,
        isVerified
      );

      const newStudents = response.items.map((item) => {
        const maxSteps = 5;
        const greenSteps = Math.min(item.verifiers, maxSteps);
        const steps = Array.from({ length: maxSteps }, (_, index) => ({
          step: <Icon name="check" fill="#FFFFFF" />,
          backgroundColor: index < greenSteps ? "#4CAF50" : "#BDBDBD",
        }));

        return {
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
          countOfVerifiers: item.verifiers,
          studentGPA:
            item.metadata?.attributes?.find((attr) => attr.trait_type === "GPA")
              ?.value || "N/A",
          image: item.image_url || "/images/default.png",
          image2x: item.image_url || "/images/default.png",
          category: "green",
          categoryText: `${item.verifiers} Verified`,
          url: "/",
          steps,
        };
      });

      setStudents((prevStudents) =>
        reset ? newStudents : [...prevStudents, ...newStudents]
      );
      setHasMore(response.pagination.hasMore);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(1, true);
  }, [activeIndex]);

  useEffect(() => {
    if (page > 1) {
      fetchStudents(page);
    }
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.profile}>
      <div
        className={cn(styles.head)}
        style={{
          backgroundImage: "url(/images/content/bg-profile.jpg)",
        }}
      >
        <div className={cn("container", styles.container)}>
          <div className={styles.btns}>
            <button
              className={cn("button-stroke button-small", styles.button)}
              onClick={() => console.log("Edit Cover Photo")}
            >
              <span>Edit cover photo</span>
              <Icon name="edit" size="16" />
            </button>
            <Link
              className={cn("button-stroke button-small", styles.button)}
              to="profile-edit"
            >
              <span>Edit profile</span>
              <Icon name="image" size="16" />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={cn("container", styles.container)}>
          <User className={styles.user} item={socials} />
          <div className={styles.wrapper}>
            <div className={styles.nav}>
              {navLinks.map((x, index) => (
                <button
                  className={cn(styles.link, {
                    [styles.active]: index === activeIndex,
                  })}
                  key={index}
                  onClick={() => setActiveIndex(index)}
                >
                  {x}
                </button>
              ))}
            </div>
            <div className={styles.list}>
              {isLoading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <Card className={styles.card} isLoading key={index} />
                  ))
                : students.map((student) => (
                    <Card
                      className={styles.card}
                      item={student}
                      key={student.id}
                    />
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

export default Profile;
