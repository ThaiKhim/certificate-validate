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
      "What is blockchain diploma verification",
      "How does blockchain ensure the authenticity of a diploma?",
      "Is blockchain verification secure?",
      "Who can verify a diploma using this system?",
      
    ],
  },
  {
    title: "Support",
    icon: "circlesquare",
    items: [
      "What should I do if I face issues while verifying a diploma?",
      "Is there a help center or tutorial for first-time users?",
      "What languages does the support team provide assistance in?",
      "What is Design System",
      "Can I recover my account if I lose access?",
    ],
  },
  {
    title: "Upload",
    icon: "lightning",
    items: [
      "How do I upload my diploma for verification?",
      "Are there any file requirements for diploma uploads?",
      "Is my uploaded diploma stored securely?",
      "Can I delete an uploaded diploma?",
    ],
  },
  {
    title: "Certificate",
    icon: "pen",
    items: [
      "What types of certificates can be verified?",
      "How long does it take to verify a certificate?",
      "Can I verify certificates issued by non-partnered institutions?",
      "What happens if a certificate is found invalid?",
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