import React from "react";
import cn from "classnames";
import styles from "./HowItWorks.module.sass";
import ScrollParallax from "../../../components/ScrollParallax";

const items = [
  {
    title: "Login with school gmail",
    color: "#3772FF",
    images: "#",
    content:
      "Verify your identity and eligibility as a graduate by logging in with your school gmail account.",
  },
  {
    title: "Get your wallet",
    color: "#9757D7",
    images: "#",
    content:
      "Create a digital wallet that supports NFT tokens. Choose from MetaMask, Trust Wallet, or Coinbase Wallet.",
  },
  {
    title: "Get your NFT Degree",
    color: "#EF466F",
    images: "#",
    content:
      "Your nft degree certificate will be minted on the blockchain and sent to your wallet as an image file.",
  },
  {
    title: "Share your degree",
    color: "#45B26B",
    images: "#",
    content:
      "Display the image file, or the link on social media where everyone can view the details of your NFT",
  },
];

const HowItWorks = ({ scrollToRef }) => {
  return (
    <div className={cn("section", styles.section)} ref={scrollToRef}>
      <div className={cn("container", styles.container)}>
        <div className={styles.head}>
          <h2 className={cn("h2", styles.title)}>How it works</h2>
          <div className={styles.info}>
          They are unique, secure, and verifiable on the blockchain. Here’s how you can get yours:
          </div>
        </div>
        <div className={styles.list}>
          {items.map((x, index) => (
            <ScrollParallax className={styles.item} key={index}>
              <div
                className={styles.preview}
                style={{ backgroundColor: x.color }}
              >
                <img src={x.images} alt={`Step ${index}`} />
              </div>
              <div className={styles.number}>Step {index + 1}</div>
              <div className={styles.subtitle}>{x.title}</div>
              <div className={styles.content}>{x.content}</div>
            </ScrollParallax>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
