import React from "react";
import cn from "classnames";
import styles from "./About.module.sass";
import Icon from "../../../components/Icon";
import ScrollParallax from "../../../components/ScrollParallax";

const items = [
  {
    title: "Secure Preservation",
    content:
      "Safely store your diplomas on the blockchain, ensuring they are protected from loss or damage.",
    color: "#9757D7",
  },
  {
    title: "Environmental Sustainability",
    content:
      "Contribute to sustainability by eliminating paper waste and embracing an eco-friendly digital solution.",
    color: "#EF466F",
  },
  {
    title: "Future-Proof Credentials",
    content:
      "Adapt to the digital era with NFT diploma certificates that remain relevant and accessible as technology advances.",
    color: "#45B26B",
  },
];

const About = () => {
  return (
    <div className={cn("section-border-top", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={cn("stage", styles.stage)}>VKU DEGREE</div>
          </div>
          <div className={styles.col}>
            <h2 className={cn("h2", styles.title)}>
              Simple, powerful, <br></br>succinct benefits
            </h2>
            <div className={styles.info}>
            Quickly grasp the advantages of NFT diploma certificates in terms of secure preservation, future-proofing, and environmental impact.
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <div className={styles.list}>
              {items.map((x, index) => (
                <ScrollParallax className={styles.item} key={index}>
                  <div
                    className={styles.number}
                    style={{ backgroundColor: x.color }}
                  >
                    0{index + 1}
                  </div>
                  <div className={styles.subtitle}>{x.title}</div>
                  <div className={styles.content}>{x.content}</div>
                </ScrollParallax>
              ))}
            </div>
          </div>
          <div className={styles.col}>
            <div className={styles.bg}>
              <img
                srcSet="images\content\Online-Learning.webp"
                src="images\content\Online-Learning.webp"
                
                alt="About pic"
              />
              <ScrollParallax className={styles.preview} animateIn="fadeInUp">
                <img
                  srcSet="images\content\Certificate.webp"
                  src="images\content\Certificate.webp"
                  alt="Icon"
                />
              </ScrollParallax>
              {/* <button className={cn("play", styles.play)}>
                <Icon name="play" size="21" />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
