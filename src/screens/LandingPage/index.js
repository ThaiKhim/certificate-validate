import React from "react";
import Hero from "./Hero";
import Hero2 from "./Hero2";
import Discover from "../Home/Discover/index.js";
import ValueProps from "../../components/ValueProps";
import HowItWorks from "./HowItWorks";
import About from "./About";

const Landing = () => {
    return (
        <>
        <Hero />
        <ValueProps />
        <HowItWorks />
        <About />
        <Discover />
        <Hero2 />
        </>
        );
};

export default Landing;
