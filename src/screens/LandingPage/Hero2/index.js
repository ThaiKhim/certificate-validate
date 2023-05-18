import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Landing.module.sass";
import Image from "../../../components/Image";

const Hero2 = () => {
  return (
    <div className={styles.section}>
      <div className={cn("container", styles.container)}>
        <div className={styles.wrap}>
            <div className={styles.stage}>More than a piece of paper</div>
          <h1 className={cn("h1", styles.title)}>
          Ready to <br/> claim it
          </h1>
          <div className={styles.text}>
          This is a solution that converts your diploma into an exclusive and authentic NFT that you can showcase and monetize.
          </div>
          <div className={styles.btns}>
            <Link className={cn("button-stroke", styles.button)} to="/search01">
              Discover more
            </Link>
          </div>
        </div>
        <div className={styles.gallery}>
          <div className={styles.preview}>
            <Image
              srcSet="/images/content/cubes@2x.png 2x"
              srcSetDark="/images/content/cubes-dark@2x.png 2x"
              src="/images/content/cubes.png"
              srcDark="/images/content/cubes-dark.png"
              alt="Cubes"
            />
          </div>
          <div className={styles.preview}>
            <Image
              srcSet="/images/content/cube@2x.png 2x"
              srcSetDark="/images/content/cube-dark@2x.png 2x"
              src="/images/content/cube.png"
              srcDark="/images/content/cube-dark.png"
              alt="Cube"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
