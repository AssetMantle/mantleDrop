import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import HeaderContainer, { NavIcon } from "../styles/layout/HeaderContainer";
import Nav from "./Nav";

export default function Header() {
  const [navToggler, setNavToggler] = useState(false);

  const [padding, setPadding] = useState("padding_1");
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY !== 0 ? setPadding("padding_2") : setPadding("padding_1");
    });
  }, []);

  return (
    <HeaderContainer>
      <div className={`container ${padding}`}>
        <div className="header__left airdrop">
          <a href="/">
            <img
              src="/images/icons/logo.svg"
              alt="AssetMantle"
              className="AssetMantle.one"
            />
          </a>
          <h2 className="airdrop_text">
            {window.location.pathname === "/"
              ? "Airdrop"
              : window.location.href.includes("stakedrop")
              ? "StakeDrop"
              : undefined}
          </h2>
        </div>
        <div className="header__right ">
          <div className="header__right_one">
            {/* <a href="assetmantle.one">assetmantle.one</a> */}
            <NavIcon
              className="toggler"
              tabIndex="0"
              role="button"
              onClick={() => setNavToggler(!navToggler)}
              onKeyPress={(e) =>
                e.key === "Enter" && setNavToggler(!navToggler)
              }
            >
              {navToggler ? (
                <img src="/images/icons/close.png" alt="close" />
              ) : (
                <img src="/images/icons/hm_menu.png" alt="hamburger" />
              )}
            </NavIcon>
          </div>
        </div>
      </div>
      {navToggler && <Nav />}
    </HeaderContainer>
  );
}
