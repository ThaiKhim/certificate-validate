import React from "react";
import cn from "classnames";
import styles from "./HowItWorks.module.sass";
import ScrollParallax from "../../../components/ScrollParallax";

const items = [
  {
    title: "Login your school email",
    color: "#3772FF",
    svg: (<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" color="#ffffff" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
   <path d="M20 12h-13l3 -3m0 6l-3 -3"></path>
 </svg>),
    content:
      "Verify your identity and eligibility as a graduate by logging in with your school gmail account.",
  },
  {
    title: "Create a wallet.",
    color: "#9757D7",
    svg: (<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wallet" color="#ffffff" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12"></path>
    <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4"></path>
 </svg>),
    content:
      "Create a digital wallet that supports NFT tokens. Choose from MetaMask, Trust Wallet, or Coinbase Wallet.",
  },
  {
    title: "Mint your NFT diploma",
    color: "#EF466F",
    svg: (<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-check" color="#ffffff" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
    <path d="M9 15l2 2l4 -4"></path>
 </svg>),
    content:
      "Your nft degree certificate will be minted on the blockchain and sent to your wallet as an image file.",
  },
  {
    title: "Share your certificates",
    color: "#45B26B",
    svg: (<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-share" color="#ffffff" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
    <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
    <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
    <path d="M8.7 10.7l6.6 -3.4"></path>
    <path d="M8.7 13.3l6.6 3.4"></path>
 </svg>),
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
                {/* <img src={x.images} alt={`Step ${index}`} /> */}
                <div alt={`Step ${index}`}>{x.svg}</div>
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