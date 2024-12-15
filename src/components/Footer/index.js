import React, { useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./Footer.module.sass";
import Group from "./Group";
import Image from "../Image";
import Form from "../Form";
import Theme from "../Theme";

const items = [
  {
    title: "Platform",
    menu: [
      {
        title: "Certificates",
        url: "/search01",
      },
      {
        title: "Verify",
        url: "/connect-wallet",
      },
    ],
  },
  {
    title: "Info",
    menu: [
      {
        title: "FAQ",
        url: "/faq",
      },
      {
        title: "Create item",
        url: "/upload-variants",
      },
    ],
  },
];

const Footers = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    alert();
  };

  return (
    <footer className={styles.footer}>
      <div className={cn("container", styles.container)}>
        <div className={styles.row}>
          <div className={styles.col}>
            <Link className={styles.logo} to="/">
              <Image
                className={styles.pic}
                src="/images/logo-dark.png"
                srcDark="/images/logo-light.png"
                alt="Fitness Pro"
              />
            </Link>
            <div className={styles.info}>The New Secure Certificate.</div>
            <div className={styles.version}>
              <div className={styles.details}>Dark theme</div>
              <Theme className="theme-big" />
            </div>
          </div>
          <div className={styles.col}>
            {items.map((x, index) => (
              <Group className={styles.group} item={x} key={index} />
            ))}
          </div>
          <div className={styles.col}>
            <div className={styles.category}>Credit</div>
            <div className={styles.text}>
            Secured with Blockchain Technology for Authentic and Verifiable Digital Certificates.
            </div>
          </div>
        </div>
        <div className={styles.foot}>
          <div className={styles.copyright}>
            Copyright © 2024 VKU Certificate. All rights reserved
          </div>
          <div className={styles.note}>
            We use cookies for better service. <a href="/#">Accept</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footers;
