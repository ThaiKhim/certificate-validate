import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import Image from "../../../components/Image";
import styles from "./Hero.module.sass";

const Hero = () => {
    return (
        <div className={cn("section", styles.section)}>
            <div className={cn("container", styles.container)}>
                <div className={styles.head}>
                    <div className={styles.stage}>
                        The new age of degree.
                    </div>
                    <h2 className={cn("h3", styles.title)}>
                        Building a secure for certificates.
                    </h2>
                    <div className={styles.p}>
                        Our NFT certificates leverage blockchain technology to provide a tamper-proof record of your achievements that's easy to verify.
                    </div>
                    
                    {/*<Link className={cn("button-stroke", styles.button)} to="/search01">*/}
                    {/*    Start your search*/}
                    {/*</Link>*/}
                    
                </div>
                <Image className={styles.image}
                    //                                      srcSet="/images/content/cubes@2x.png 2x"
                    //                                  srcSetDark="/images/content/cubes-dark@2x.png 2x"
                    src="/images/content/degreevip.jpg"
                    srcDark="/images/content/degreevip.jpg"
                    alt="Degree"
                />    
            </div>
        </div>    
                
    );
};

export default Hero;