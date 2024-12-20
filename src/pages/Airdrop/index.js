import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { AirdropContainer } from "../../styles/pages/airdropStyle";

import { HiOutlineInformationCircle } from "react-icons/hi";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import airDropData from "../../data/airdropData.json";
import LPModal from "./LPModal";
import MetaMaskModal from "./MetaMaskModal";
import TAndCModal from "../claim/TAndCModal";
import OsmoIModal from "./OsmoIModal";
import MantleDropClaim from "../claim/MantleDropClaim";
import { getMantleAddress } from "../claim/utils/address";
import OpenSeaSignIn from "./OpenSeaSignIn";

export default function Airdrop() {
  const { t } = useTranslation();

  const [LPModalStat, setLPModalStat] = useState(false);
  const [OsmoAddress, setOsmoAddress] = useState();

  const [KeplrCalculatedDATA, setKeplrCalculatedDATA] = useState();
  const [OsmoAllocation, setOsmoAllocation] = useState(0);
  const [OsmoTS, setOsmoTS] = useState(false);
  const [TotalCalModal, setTotalCalModal] = useState(false);
  const [TAndC, setTAndC] = useState(false);

  const [MetaMaskModalStat, setMetaMaskModalStat] = useState(false);
  const [MetaMaskAddress, setMetaMaskAddress] = useState();
  const [MetamaskAllocation, setMetamaskAllocation] = useState(0);
  const [MetamaskTS, setMetamaskTS] = useState(false);

  const [MetaMaskCalculatedDATA, setMetaMaskCalculatedDATA] = useState();

  const [OsmoIModalState, setOsmoIModalState] = useState(false);

  const [MantleDropClaimValue, setMantleDropClaimValue] = useState(0);

  const [OpenseaSignState, setOpenseaSignState] = useState(false);

  useEffect(() => {
    OsmoAddress &&
      fetch(`https://osmosis-airdrop.assetmantle.one/osmosis/${OsmoAddress}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success.toString() === "true") {
            setKeplrCalculatedDATA(data);
            setOsmoAllocation(data.receivable);
            // } else if (data.address.toString() === "undefined") {
            //   setKeplrCalculatedDATA();
            //   setOsmoAllocation(0);
          } else {
            setKeplrCalculatedDATA(false);
            setOsmoAllocation(0);
          }
        });
  }, [OsmoAddress]);

  useEffect(() => {
    MetaMaskAddress &&
      fetch(
        `${process.env.REACT_APP_claimPageClaimEndPoint}/opensea/${MetaMaskAddress}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setMetaMaskCalculatedDATA(data);
            setMetamaskAllocation(data.allocation);
          } else if (data.success.toString() === "undefined") {
            setMetamaskAllocation(0);
            setMetaMaskCalculatedDATA();
          } else {
            setMetamaskAllocation(0);
            setMetaMaskCalculatedDATA(false);
          }
        });
  }, [MetaMaskAddress]);

  console.log(MetaMaskCalculatedDATA);

  return (
    <>
      <AirdropContainer>
        <section className="section_hero">
          <div className="section_hero__element">
            <h1>{t("AIRDROP_HERO_TITLE")}</h1>
            <p>{t("AIRDROP_HERO_DESCRIPTION")}</p>
            <div className="section_hero__element_readBlog">
              <p className="section_hero__element_readBlog__text">
                {t("AIRDROP_HERO_READ_BLOG_TEXT")}
              </p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={airDropData.hero.href && airDropData.hero.href}
                className="section_hero__element_readBlog__button"
              >
                {t("AIRDROP_HERO_READ_BLOG_BUTTON_TEXT")}
              </a>
            </div>
          </div>
          <div className="section_hero__element">
            <div className="section_hero__element_image__con">
              <img
                src="/images/airdrop/coins.png"
                alt="double coin illustration"
              />
            </div>
          </div>
        </section>

        <section className="section_drop">
          <div className="section_drop__heading">
            <h3>{t("AIRDROP_REQUIRED_ELIGIBILITY_HEADING")}</h3>
            <hr />
          </div>
          <div className="section_drop__element">
            <div className="section_drop__element_details">
              <h3>{t("AIRDROP_REQUIRED_ELIGIBILITY_TITLE_1")}</h3>
              <div className="section_drop__element_details__hover">
                <p>{t("AIRDROP_REQUIRED_ELIGIBILITY_DESCRIPTION_1")}</p>
                <button onClick={() => setOsmoIModalState(true)}>
                  <HiOutlineInformationCircle />
                </button>
              </div>
            </div>
            <div className="section_drop__element_value">
              <p>{t("AIRDROP_REQUIRED_ELIGIBILITY_KEY_1")}</p>
              <h4>{t("AIRDROP_REQUIRED_ELIGIBILITY_VALUE_1")}</h4>
            </div>
            <div className="section_drop__button">
              {OsmoAddress ? (
                KeplrCalculatedDATA &&
                KeplrCalculatedDATA.receivable && (
                  <button onClick={() => setTAndC(true)}>{t("CLAIM")}</button>
                )
              ) : (
                <button onClick={() => setLPModalStat(true)}>
                  {t("CHECK")}
                </button>
              )}
            </div>
          </div>
          <div className="section_drop__data">
            {OsmoAddress ? (
              <div className="sectionDropAdd">
                <span>
                  {t("WALLET_ADDRESS")}: {OsmoAddress}
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setLPModalStat(true)}
                >
                  {t("EDIT")}
                </span>
              </div>
            ) : undefined}
            {KeplrCalculatedDATA && KeplrCalculatedDATA.receivable ? (
              <>
                <section className="section_allocation">
                  <h3>{t("AIRDROP_ALLOCATION_SINGLE_TITLE")}</h3>
                  <div className="section_allocation__element">
                    <div className="section_allocation__element_left">
                      <img
                        src="/images/airdrop/dark.png"
                        alt="coin illustration dark"
                      />
                      <h4 className="yellow-t">
                        {t("AIRDROP_ALLOCATION_KEY")}
                      </h4>
                    </div>
                    <p>{getMantleAddress(OsmoAddress)}</p>
                    <p
                      // onClick={() => setOsmoTS(!OsmoTS)}
                      style={{ cursor: "pointer" }}
                    >
                      {KeplrCalculatedDATA &&
                        KeplrCalculatedDATA.receivable &&
                        Number(KeplrCalculatedDATA.receivable).toFixed(2)}
                      {` $MNTL`}{" "}
                      {/* {OsmoTS ? <AiFillCaretUp /> : <AiFillCaretDown />} */}
                    </p>
                  </div>
                </section>
                {/* {OsmoTS && (
                  <section className="section_allocation_by_network">
                    <div className="section_allocation_by_network__element">
                      <div className="section_allocation_by_network__element_option">
                        <h4>
                          {t("AIRDROP_REQUIRED_ELIGIBILITY_TABLE_TITLE_1")}
                        </h4>
                        <p>{t("VALUE_LP")}</p>
                      </div>
                      <div className="section_allocation_by_network__element_option">
                        <h4>
                          {t("AIRDROP_REQUIRED_ELIGIBILITY_TABLE_KEY_1_1")}
                        </h4>
                        <p>
                          $
                          {KeplrCalculatedDATA &&
                            KeplrCalculatedDATA.receivable &&
                            Number(KeplrCalculatedDATA.locked).toFixed(2)}
                        </p>
                      </div>
                      <div className="section_allocation_by_network__element_option">
                        <h4>
                          {t("AIRDROP_REQUIRED_ELIGIBILITY_TABLE_KEY_2_1")}
                        </h4>
                        <p>
                          $
                          {KeplrCalculatedDATA &&
                            KeplrCalculatedDATA.receivable &&
                            Number(KeplrCalculatedDATA.unlocked).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </section>
                )} */}
              </>
            ) : KeplrCalculatedDATA === false ? (
              <section className="section_allocation">
                <h3 className="error-t">
                  {t("AIRDROP_REQUIRED_ELIGIBILITY_NOT_ELIGIBLE")}
                </h3>
              </section>
            ) : undefined}
          </div>
        </section>

        <section className="section_drop">
          <div className="section_drop__element">
            <div className="section_drop__element_details">
              <h3>{t("AIRDROP_REQUIRED_ELIGIBILITY_TITLE_2")}</h3>
            </div>
            <div className="section_drop__element_value">
              <p>{t("AIRDROP_REQUIRED_ELIGIBILITY_KEY_2")}</p>
              <h4>{t("AIRDROP_REQUIRED_ELIGIBILITY_VALUE_2")}</h4>
            </div>
            <div className="section_drop__button">
              {MetaMaskAddress ? undefined : (
                <button onClick={() => setMetaMaskModalStat(true)}>
                  {t("CHECK")}
                </button>
              )}
            </div>
          </div>
          <div className="section_drop__data">
            {MetaMaskAddress ? (
              <div className="sectionDropAdd">
                <span>
                  {t("WALLET_ADDRESS")}: {MetaMaskAddress}
                </span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setMetaMaskModalStat(true)}
                >
                  {t("EDIT")}
                </span>
              </div>
            ) : undefined}
            {MetaMaskCalculatedDATA && MetaMaskCalculatedDATA.allocation ? (
              <>
                <section className="section_allocation">
                  <h3>{t("AIRDROP_ALLOCATION_SINGLE_TITLE")}</h3>
                  <div className="section_allocation__element">
                    <div className="section_allocation__element_left">
                      <img
                        src="/images/airdrop/dark.png"
                        alt="coin illustration dark"
                      />
                      <h4 className="yellow-t">
                        {t("AIRDROP_ALLOCATION_KEY")}
                      </h4>
                    </div>
                    {MetaMaskCalculatedDATA &&
                      MetaMaskCalculatedDATA.mantleAddress &&
                      MetaMaskCalculatedDATA.mantleAddress.includes(
                        "mantle"
                      ) && (
                        <p className="yellow-t">
                          {MetaMaskCalculatedDATA.mantleAddress}
                        </p>
                      )}
                    <p
                      onClick={() => setMetamaskTS(!MetamaskTS)}
                      style={{ cursor: "pointer" }}
                    >
                      {MetaMaskCalculatedDATA &&
                        MetaMaskCalculatedDATA.allocation &&
                        Number(MetaMaskCalculatedDATA.allocation).toFixed(
                          2
                        )}{" "}
                      {MetamaskTS ? <AiFillCaretUp /> : <AiFillCaretDown />}
                    </p>
                  </div>
                </section>
                {MetamaskTS && (
                  <section className="section_allocation_by_network">
                    <div className="section_allocation_by_network__element">
                      <div className="section_allocation_by_network__element_option">
                        <h4>
                          {t("AIRDROP_REQUIRED_ELIGIBILITY_TABLE_TITLE_2")}
                        </h4>
                        <p>{t("AIRDROP_REQUIRED_ELIGIBILITY_TABLE_KEY_1_2")}</p>
                      </div>
                      <div className="section_allocation_by_network__element_option">
                        <h4>
                          {t("AIRDROP_REQUIRED_ELIGIBILITY_TABLE_VALUE_1_2")}
                        </h4>
                        <p>
                          {MetaMaskCalculatedDATA &&
                            MetaMaskCalculatedDATA.allocation &&
                            Number(MetaMaskCalculatedDATA.volumeTraded).toFixed(
                              2
                            )}
                        </p>
                      </div>
                    </div>
                  </section>
                )}
                <section className="section_drop" style={{ padding: "20px 0" }}>
                  <div className="section_drop__element">
                    <div className="section_drop__element_details"></div>
                    <div className="section_drop__element_value"></div>
                    <div className="section_drop__button">
                      <button
                        onClick={() => setOpenseaSignState(true)}
                        disabled={
                          MetaMaskCalculatedDATA.mantleAddress &&
                          MetaMaskCalculatedDATA.mantleAddress.includes(
                            "mantle"
                          )
                            ? true
                            : false
                        }
                      >
                        {MetaMaskCalculatedDATA.mantleAddress &&
                        MetaMaskCalculatedDATA.mantleAddress.includes("mantle")
                          ? t("CLAIMED")
                          : t("CLAIM")}
                      </button>
                    </div>
                  </div>
                </section>
              </>
            ) : MetaMaskCalculatedDATA === false ? (
              <section className="section_allocation">
                <h3 className="error-t">
                  {t("AIRDROP_REQUIRED_ELIGIBILITY_NOT_ELIGIBLE")}
                </h3>
              </section>
            ) : undefined}
          </div>
        </section>

        <MantleDropClaim totalValue={setMantleDropClaimValue} />

        {KeplrCalculatedDATA ||
        MetaMaskCalculatedDATA ||
        MantleDropClaimValue ? (
          <>
            <section className="section_allocation">
              <h3
                className="yellow-t"
                style={{ display: "flex", alignItems: "center", gap: "24px" }}
              >
                {t("AIRDROP_ALLOCATION_TITLE")} <hr style={{ flex: "1" }} />
              </h3>
              <div className="section_allocation__element">
                <div className="section_allocation__element_left">
                  <img
                    src="/images/airdrop/dark.png"
                    alt="coin illustration dark"
                  />
                  <h4 className="yellow-t">{t("AIRDROP_ALLOCATION_KEY")}</h4>
                </div>
                <p className="yellow-t">
                  <span
                    onClick={() => setTotalCalModal(!TotalCalModal)}
                    style={{ cursor: "pointer" }}
                  >
                    {(
                      Number(OsmoAllocation) +
                      Number(MetamaskAllocation) +
                      MantleDropClaimValue
                    ).toFixed(2)}{" "}
                    {` $MNTL`}{" "}
                    {TotalCalModal ? <AiFillCaretUp /> : <AiFillCaretDown />}
                  </span>
                </p>
              </div>
            </section>
            {TotalCalModal && (
              <section className="section_allocation_by_network">
                <div className="section_allocation_by_network__element">
                  <div className="section_allocation_by_network__element_option">
                    <h4>{t("CATEGORY")}</h4>
                    <p>$MNTL {t("ALLOCATION")}</p>
                  </div>
                  {MantleDropClaimValue !== 0 && (
                    <div className="section_allocation_by_network__element_option">
                      <h4>{t("AIRDROP_START_WITH_STAKEDROP_TITLE")}</h4>
                      <p>{Number(MantleDropClaimValue).toFixed(2)}</p>
                    </div>
                  )}
                  {KeplrCalculatedDATA && KeplrCalculatedDATA.receivable && (
                    <div className="section_allocation_by_network__element_option">
                      <h4>{t("AIRDROP_ALLOCATION_BY_NETWORK_OPTION_1_KEY")}</h4>
                      <p>
                        {KeplrCalculatedDATA &&
                          KeplrCalculatedDATA.receivable &&
                          Number(KeplrCalculatedDATA.receivable).toFixed(2)}
                      </p>
                    </div>
                  )}
                  {MetaMaskCalculatedDATA && MetaMaskCalculatedDATA.allocation && (
                    <div className="section_allocation_by_network__element_option">
                      <h4>{t("AIRDROP_ALLOCATION_BY_NETWORK_OPTION_2_KEY")}</h4>
                      <p>
                        {Number(MetaMaskCalculatedDATA.allocation).toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}
          </>
        ) : undefined}

        <section className="section_drop">
          <div className="section_drop__heading">
            <h3>{t("AIRDROP_NFT_OWNERS_HEADING")}</h3>
            <hr />
          </div>
          <div className="section_drop__element">
            <div className="section_drop__element_details">
              <h3>{t("AIRDROP_NFT_OWNERS_TITLE")}</h3>
              {/* <p>{t("AIRDROP_NFT_OWNERS_DESCRIPTION")} </p>*/}
            </div>
            <div className="section_drop__element_value">
              <p>{t("AIRDROP_NFT_OWNERS_KEY")}</p>
              <h4>{t("AIRDROP_NFT_OWNERS_VALUE")}</h4>
            </div>
            <div className="section_drop__button two"></div>
          </div>
        </section>

        {LPModalStat && (
          <LPModal
            closeModal={setLPModalStat}
            setKeplrWallet={setOsmoAddress}
          />
        )}
        {MetaMaskModalStat && (
          <MetaMaskModal
            closeModal={setMetaMaskModalStat}
            setMetaMaskWallet={setMetaMaskAddress}
          />
        )}
        {OpenseaSignState && (
          <OpenSeaSignIn
            closeModal={setOpenseaSignState}
            setMetaMaskWallet={setMetaMaskAddress}
            MetaMaskAddress={MetaMaskAddress}
          />
        )}
        {TAndC === true && <TAndCModal closeModal={setTAndC} />}
        {OsmoIModalState && <OsmoIModal closeModal={setOsmoIModalState} />}
      </AirdropContainer>
    </>
  );
}
