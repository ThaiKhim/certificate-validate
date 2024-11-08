import React, { useState } from "react";
import cn from "classnames";
import styles from "./Hero.module.sass";
import Dropdown from "../../../components/Dropdown";
import Icon from "../../../components/Icon";
import Item from "./Item";

const items = [
  {
    title: "General",
    icon: "home",
    items: [
      "How does it work",
      "How to start",
      "Dose it suppport Dark Mode",
      "Does it support Auto-Layout",
      
    ],
  },
  {
    title: "Support",
    icon: "circle-and-square",
    items: [
      "How to start",
      "Dose it suppport Dark Mode",
      "Does it support Auto-Layout",
      "What is Design System",
      "How does it work",
    ],
  },
  {
    title: "Upload",
    icon: "lightning",
    items: [
      "How does it work",
      "How to start",
      "Dose it suppport Dark Mode",
      "What is Design System",
    ],
  },
  {
    title: "Certificate",
    icon: "pen",
    items: [
      "How does it work",
      "How to start",
      "Dose it suppport Dark Mode",
      "Does it support Auto-Layout",
      "What is Design System",
    ],
  },
];

const Hero = () => {
  const options = [];
  items.map((x) => options.push(x.title));

  const [direction, setDirection] = useState(options[0]);

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <div className={styles.stage}>learn how to get started</div>
          <h1 className={cn("h2", styles.title)}>Frequently asked questions</h1>
          <div className={styles.info}>
          A list of questions and answers relating to a particular subject, especially one giving basic information for users of a website. If you can not find your question, feel free to{" "}
            <a href="/#" rel="noopener noreferrer">
              Contact Support
            </a>
          </div>
          <Dropdown
            className={cn("mobile-show", styles.dropdown)}
            value={direction}
            setValue={setDirection}
            options={options}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.nav}>
              {items.map((x, index) => (
                <div
                  className={cn(styles.link, {
                    [styles.active]: x.title === direction,
                  })}
                  onClick={() => setDirection(x.title)}
                  key={index}
                >
                  <Icon name={x.icon} size="16" />
                  <span>{x.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.col}>
            {items
              .find((x) => x.title === direction)
              .items.map((x, index) => (
                <Item className={styles.item} item={x} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;