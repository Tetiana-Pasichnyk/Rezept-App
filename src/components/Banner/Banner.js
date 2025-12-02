import React from "react";
import "./Banner.css";

function Banner() {
    return (
        <div className="banner-wrapper mb-4">
            <img src="/images/homebild.jpg" alt="banner" className="banner-image" />
            <div className="banner-dark"></div>
            <div className="banner-text">
                <h2>Dein</h2>
                <h2>digitales</h2>
                <h2>Kochbuch</h2>
            </div>
        </div>
    );
}

export default Banner;
