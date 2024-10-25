import React from "react";
import cn from "classnames";
import styles from "./ValueProps.module.sass";
import ScrollParallax from "../ScrollParallax";

const items = [
  {
    title: "Secure",
    content:
      "Your diploma is stored on the blockchain and can't be lost or destroyed.",
    icon:
      (<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="50" height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"></path>
      <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
      <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path>
   </svg>),
  },
  {
    title: "Available",
    content:
      "Access and share your diplomas from any device with an internet connection, Easy to stay connected and in control",
    icon:
      (<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cloud-check" width="50" height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M11 18.004h-4.343c-2.572 -.004 -4.657 -2.011 -4.657 -4.487c0 -2.475 2.085 -4.482 4.657 -4.482c.393 -1.762 1.794 -3.2 3.675 -3.773c1.88 -.572 3.956 -.193 5.444 1c1.488 1.19 2.162 3.007 1.77 4.769h.99c1.388 0 2.585 .82 3.138 2.007"></path>
      <path d="M15 19l2 2l4 -4"></path>
   </svg>),
  },
  {
    title: "Portable",
    content:
      "You can easily share your diploma with anyone you want. Your diploma is compatible with any platform or device.",
    icon:
      (<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-award" width="50" height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 9m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0"></path>
      <path d="M12 15l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889"></path>
      <path d="M6.802 12l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889"></path>
   </svg>)
  },
];

const ValueProps = ({ className }) => {
  return (
    <div className={cn(className, styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.head}>
          <div className={cn("stage-small", styles.stage)}>
          EMPOWERING CERTIFICATES
          </div>
          <div className={cn("h2", styles.title)}>
          Building a secure for certificates
          </div>
        </div>
        <div className={styles.list}>
          {items.map((x, index) => (
            <ScrollParallax className={styles.item} key={index}>
              <div
                className={styles.icon}
                
              >{x.icon}</div>
              <div className={styles.category}>{x.title}</div>
              <div className={styles.content}>{x.content}</div>
            </ScrollParallax>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValueProps;