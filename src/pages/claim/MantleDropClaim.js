import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { HiOutlineInformationCircle } from "react-icons/hi";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { initializeKeplr } from "./utils/keplr";
const stakeDropAPI = process.env.REACT_APP_claimPageClaimEndPoint;

export default function MantleDropClaim({ totalValue }) {
  const { t } = useTranslation();

  const [InputError, setInputError] = useState();

  const [Modal, setModal] = useState(false);

  const [ShowTable, setShowTable] = useState(false);

  //   address
  const [MNTLAddress, setMNTLAddress] = useState("");
  const [APIResponse, setAPIResponse] = useState({
    success: false,
    cosmos: {
      address: "",
      amount: 0,
    },
    juno: {
      address: "",
      amount: 0,
    },
    comdex: {
      address: "",
      amount: 0,
    },
    stargaze: {
      address: "",
      amount: 0,
    },
    terra: {
      address: "",
      amount: 0,
    },
    persistence: {
      address: "",
      amount: 0,
    },
  });

  // connect keplr
  const [KeplrConnectionState, setKeplrConnectionState] = useState(0);

  const handleKeplrConnect = async () => {
    if (!MNTLAddress) {
      if (window.keplr) {
        setKeplrConnectionState(1);

        // adding MNTL wallet
        try {
          await initializeKeplr();
        } catch (e) {
          console.log(e);
        }
        let mantleOfflineSigner = window.keplr.getOfflineSigner(
          process.env.REACT_APP_mainNetChainID
        );
        let mntlAccounts = await mantleOfflineSigner.getAccounts();
        let mntlAddress = mntlAccounts[0].address;
        setMNTLAddress(mntlAddress);

        // fetching address and rewards
        fetch(`${stakeDropAPI}/stakeDrop/${mntlAddress}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success === true) {
              setAPIResponse(data);
            } else if (data.success === false) {
              setAPIResponse({
                success: false,
                cosmos: {
                  address: "",
                  amount: 0,
                },
                juno: {
                  address: "",
                  amount: 0,
                },
                comdex: {
                  address: "",
                  amount: 0,
                },
                stargaze: {
                  address: "",
                  amount: 0,
                },
                terra: {
                  address: "",
                  amount: 0,
                },
                persistence: {
                  address: "",
                  amount: 0,
                },
              });
            }
          })
          .catch((err) => console.log(err));

        // took necessary addresses

        setKeplrConnectionState(2);
        setModal(false);
      } else {
        window.alert("Please install Keplr to move forward with the task.");
      }
    } else {
      setKeplrConnectionState(0);
      setMNTLAddress("");
      setAPIResponse({
        success: false,
        cosmos: {
          address: "",
          amount: 0,
        },
        juno: {
          address: "",
          amount: 0,
        },
        comdex: {
          address: "",
          amount: 0,
        },
        stargaze: {
          address: "",
          amount: 0,
        },
        terra: {
          address: "",
          amount: 0,
        },
        persistence: {
          address: "",
          amount: 0,
        },
      });
    }
  };

  const InputCalculate = () => {
    fetch(`${stakeDropAPI}/stakeDrop/${MNTLAddress}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setAPIResponse(data);
        } else if (data.success === false) {
          setAPIResponse({
            success: false,
            cosmos: {
              address: "",
              amount: 0,
            },
            juno: {
              address: "",
              amount: 0,
            },
            comdex: {
              address: "",
              amount: 0,
            },
            stargaze: {
              address: "",
              amount: 0,
            },
            terra: {
              address: "",
              amount: 0,
            },
            persistence: {
              address: "",
              amount: 0,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);

        setAPIResponse({
          success: false,
          cosmos: {
            address: "",
            amount: 0,
          },
          juno: {
            address: "",
            amount: 0,
          },
          comdex: {
            address: "",
            amount: 0,
          },
          stargaze: {
            address: "",
            amount: 0,
          },
          terra: {
            address: "",
            amount: 0,
          },
          persistence: {
            address: "",
            amount: 0,
          },
        });
        setInputError(
          "Please enter a valid $MNTL address to calculate your rewards."
        );
      });
    setModal(false);
  };

  const handleInputChange = (e) => {
    if (e.target.value.includes("mantle")) {
      setAPIResponse({
        success: false,
        cosmos: {
          address: "",
          amount: 0,
        },
        juno: {
          address: "",
          amount: 0,
        },
        comdex: {
          address: "",
          amount: 0,
        },
        stargaze: {
          address: "",
          amount: 0,
        },
        terra: {
          address: "",
          amount: 0,
        },
        persistence: {
          address: "",
          amount: 0,
        },
      });
      setMNTLAddress(e.target.value);
      setInputError();
    } else {
      setInputError(
        "Please enter a valid $MNTL address to calculate your rewards."
      );
      setAPIResponse({
        success: false,
        cosmos: {
          address: "",
          amount: 0,
        },
        juno: {
          address: "",
          amount: 0,
        },
        comdex: {
          address: "",
          amount: 0,
        },
        stargaze: {
          address: "",
          amount: 0,
        },
        terra: {
          address: "",
          amount: 0,
        },
        persistence: {
          address: "",
          amount: 0,
        },
      });
      setMNTLAddress(e.target.value);
    }
  };

  useEffect(() => {
    totalValue(
      APIResponse.cosmos.amount +
        APIResponse.comdex.amount +
        APIResponse.persistence.amount +
        APIResponse.juno.amount +
        APIResponse.stargaze.amount +
        APIResponse.terra.amount
    );
  }, [APIResponse]);

  return (
    <>
      <section className="section_drop">
        <div className="section_drop__heading">
          <h3>{t("COMPLETED")}</h3>
          <hr />
        </div>
        <div className="section_drop__element">
          <div className="section_drop__element_details">
            <h3>{t("AIRDROP_START_WITH_STAKEDROP_TITLE")}</h3>
            <div className="section_drop__element_details__hover">
              <p>{t("AIRDROP_START_WITH_STAKEDROP_DESCRIPTION")}</p>
              <button>
                <HiOutlineInformationCircle />
              </button>
              <span>{t("AIRDROP_START_WITH_STAKEDROP_DESCRIPTION")}</span>
            </div>
          </div>
          <div className="section_drop__element_value">
            <p>{t("AIRDROP_START_WITH_STAKEDROP_KEY")}</p>
            <h4>{t("AIRDROP_START_WITH_STAKEDROP_VALUE")}</h4>
          </div>
          <div className="section_drop__button">
            {MNTLAddress ? (
              <button className="button_2" onClick={() => setModal(true)}>
                {t("Edit")}
              </button>
            ) : (
              <button onClick={() => setModal(true)}>{t("CHECK")}</button>
            )}
          </div>
        </div>
      </section>

      <>
        {MNTLAddress
          ? MNTLAddress.includes("mantle")
            ? APIResponse.success === false && (
                <section className="section_allocation">
                  <h3 className="error-t">
                    {t("AIRDROP_REQUIRED_ELIGIBILITY_NOT_ELIGIBLE")}
                  </h3>
                </section>
              )
            : ""
          : ""}
      </>

      <Container>
        {Modal && (
          <div className="section_calculation__modal">
            <div
              className="section_calculation__modal___fo_bg"
              onClick={() => setModal(false)}
            ></div>
            <div className="section_calculation__modal__sc">
              <div className="section_calculation__modal_container">
                <section className="section_calculation lighter_bg">
                  <>
                    <div
                      className="section_calculation__modal__sc_close"
                      onClick={() => setModal(false)}
                      onKeyPress={(e) => e.key === "Enter" && setModal(false)}
                    >
                      <img src="/images/icons/close.png" alt="close" />
                    </div>
                  </>
                  <h2>{t("PARTICIPATED_QUESTION")}</h2>
                  <h3>{t("PARTICIPATED_YES_CHECK")}</h3>
                  <div className="section_calculation__connect">
                    <button
                      className="section_calculation__connect_button"
                      onClick={handleKeplrConnect}
                    >
                      <img src="/images/airdrop/Kepler.png" alt="Keplr icon" />
                      <span>{`${
                        {
                          0: t("CONNECT"),
                          1: t("CONNECTING"),
                          2: `${t("DISCONNECT")} ${MNTLAddress.substring(
                            0,
                            8
                          )}...${MNTLAddress.substring(
                            MNTLAddress.length - 4
                          )}`,
                        }[KeplrConnectionState]
                      }`}</span>
                    </button>
                  </div>
                  <div className="section_calculation__or">{t("OR")}</div>
                  <div className="section_calculation__from">
                    <label
                      htmlFor="walletAddress"
                      className="section_calculation__from_label"
                    >
                      {t("ENTER_YOUR_WALLET_ADDRESS")}
                    </label>
                    <div className="section_calculation__from_line2">
                      <input
                        type="text"
                        name="walletAddress"
                        value={MNTLAddress}
                        className="section_calculation__from_line2_input"
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Enter your mntl address"
                      />
                      <button
                        onClick={InputCalculate}
                        className="section_calculation__from_line2_button"
                        disabled={
                          MNTLAddress !== null &&
                          MNTLAddress !== "" &&
                          MNTLAddress !== undefined
                            ? InputError !== null &&
                              InputError !== "" &&
                              InputError !== undefined
                              ? true
                              : false
                            : true
                        }
                      >
                        {t("CALCULATE")}
                      </button>
                    </div>
                  </div>

                  {MNTLAddress && InputError && (
                    <div className="section_calculation__error">
                      <div className="section_calculation__error_element__line1">
                        <img src="/images/stakedrop/info.svg" alt="info icon" />
                        <h3>{InputError}</h3>
                      </div>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        )}

        {/*{APIResponse.success === true && KeplrConnectionState ===2 ? (*/}
        {APIResponse.success === true ? (
          <section className="section_reward_table">
            <div className="section_reward_table__element">
              {ShowTable && (
                <>
                  <>
                    {APIResponse ? (
                      <div className="section_reward_table__element_option">
                        <h4>{t("CAMPAIGN")}</h4>
                        <h4>{t("ADDRESS")}</h4>
                        <p>{t("REWARDS")} ($MNTL)</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                  {APIResponse.cosmos.address && (
                    <div className="section_reward_table__element_option">
                      <h4>Cosmos</h4>
                      <h4>{APIResponse.cosmos.address}</h4>
                      <p>
                        {APIResponse.cosmos.amount
                          ? APIResponse.cosmos.amount.toLocaleString("en-US", {
                              maximumFractionDigits: 2,
                            })
                          : "0"}
                      </p>
                    </div>
                  )}
                  {APIResponse.persistence.address && (
                    <div className="section_reward_table__element_option">
                      <h4>Persistence</h4>
                      <h4>{APIResponse.persistence.address}</h4>

                      <p>
                        {APIResponse.persistence.amount
                          ? APIResponse.persistence.amount.toLocaleString(
                              "en-US",
                              {
                                maximumFractionDigits: 2,
                              }
                            )
                          : "0"}
                      </p>
                    </div>
                  )}
                  {APIResponse.terra.address && (
                    <div className="section_reward_table__element_option">
                      <h4>Terra</h4>
                      <h4>{APIResponse.terra.address}</h4>

                      <p>
                        {APIResponse.terra.amount
                          ? APIResponse.terra.amount.toLocaleString("en-US", {
                              maximumFractionDigits: 2,
                            })
                          : "0"}
                      </p>
                    </div>
                  )}
                  {APIResponse.comdex.address && (
                    <div className="section_reward_table__element_option">
                      <h4>Comdex</h4>
                      <h4>{APIResponse.comdex.address}</h4>

                      <p>
                        {APIResponse.comdex.amount
                          ? APIResponse.comdex.amount.toLocaleString("en-US", {
                              maximumFractionDigits: 2,
                            })
                          : "0"}
                      </p>
                    </div>
                  )}
                  {APIResponse.juno.address && (
                    <div className="section_reward_table__element_option">
                      <h4>Juno</h4>
                      <h4>{APIResponse.juno.address}</h4>

                      <p>
                        {APIResponse.juno.amount
                          ? APIResponse.juno.amount.toLocaleString("en-US", {
                              maximumFractionDigits: 2,
                            })
                          : "0"}
                      </p>
                    </div>
                  )}
                  {APIResponse.stargaze.address && (
                    <div className="section_reward_table__element_option">
                      <h4>Stargaze</h4>
                      <h4>{APIResponse.stargaze.address}</h4>

                      <p>
                        {APIResponse.stargaze.amount
                          ? APIResponse.stargaze.amount.toLocaleString(
                              "en-US",
                              {
                                maximumFractionDigits: 2,
                              }
                            )
                          : "0"}
                      </p>
                    </div>
                  )}
                </>
              )}
              <>
                {APIResponse ? (
                  <div className="section_reward_table__element_option">
                    <h4>{t("TOTAL_REWARDS")}:</h4>
                    {/* <span></span> */}
                    <h4>{MNTLAddress && MNTLAddress}</h4>
                    <span onClick={() => setShowTable(!ShowTable)}>
                      <p>
                        <img
                          src="/images/airdrop/dark.png"
                          alt="coin illustration dark"
                        />{" "}
                        {(
                          APIResponse.success === true &&
                          APIResponse.cosmos.amount +
                            APIResponse.comdex.amount +
                            APIResponse.persistence.amount +
                            APIResponse.juno.amount +
                            APIResponse.stargaze.amount +
                            APIResponse.terra.amount
                        ).toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })}
                        {` $MNTL`}
                      </p>{" "}
                      {ShowTable ? <AiFillCaretUp /> : <AiFillCaretDown />}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </>
            </div>
          </section>
        ) : (
          ""
        )}
      </Container>
      {MNTLAddress ? (
        <section
          className="section_drop"
          style={{ paddingTop: "20px", paddingBottom: "20px" }}
        >
          <div className="section_drop__element">
            <div className="section_drop__element_details">
              <h3>{false}</h3>
              <div className="section_drop__element_details__hover">
                <p></p>
              </div>
            </div>
            <div className="section_drop__element_value">
              <p></p>
              <h4>{false}</h4>
            </div>
            <div className="section_drop__button">
              <a href="/stakedrop">{t("CLAIM")}</a>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}

const Container = styled.main`
  max-width: 1440px;
  scroll-behavior: smooth;
  margin: 0 auto;
  background-image: url("/images/bg/bg_assets.svg");
  background-size: 100vw auto;
  background-repeat: no-repeat;
  z-index: 1;
  padding: 0px 92px;
  @media (max-width: 768px) {
    background-image: url("/images/bg/tab_bg_assets.svg");
    padding: 0px 40px;
  }
  @media (max-width: 548px) {
    background-image: url("/images/bg/m_bg_assets.svg");
    padding: 0px 20px;
  }
  .lighter_bg {
    background: #2c2c2c;
    border-radius: 12px;
  }
  .section {
    &_calculation__modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100vh;
      width: 100vw;
      z-index: 500;
      background-color: hsla(0, 0%, 6%, 0.5);
      backdrop-filter: blur(20px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 25px;
      &___fo_bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      &__sc {
        width: min(100%, 1216px);
        position: relative;
        z-index: 3;
        padding: 40px;
        border-radius: 20px;
        height: 100%;
        @media (max-width: 548px) {
          padding: 20px;
        }
        &_close {
          font: var(--h2);
          color: var(--yellow);
          position: absolute;
          top: 20px;
          right: 30px;
          @media (max-width: 548px) {
            top: 10px;
            right: 20px;
          }
          img {
            width: 16px;
            height: 16px;
          }
        }
      }
      &_container {
        z-index: 7;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 24px;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    &_calculation {
      position: relative;
      padding: 40px;
      width: 100%;
      @media (min-width: 768px) {
        background-image: url("/images/airdrop/tokens-s.png");
        background-size: auto 300px;
        background-repeat: no-repeat;
        background-position: top right;
      }
      @media (max-width: 548px) {
        padding: 20px;
      }
      h2 {
        color: var(--gray);
        padding-bottom: 12px;
      }
      h3 {
        color: var(--gray);
        padding-bottom: 40px;
      }
      &__connect {
        display: flex;
        align-items: center;
        gap: 24px;
        /* justify-content: space-between; */
        @media (max-width: 768px) {
          flex-wrap: wrap;
        }
        &_text {
          font-family: "Lato";
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          line-height: 24px;
          color: #c2c2c2;
        }
        &_button {
          min-width: 296px;
          border-radius: 12px;
          background: var(--yellow-gradient-bg);
          box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25),
            inset -4px -4px 8px rgba(0, 0, 0, 0.25), inset 4px 4px 8px #ffc942;
          padding: 10px 22px 9px;
          display: flex;
          gap: 8px;
          align-items: center;
          justify-content: center;
          font: 600 var(--p-m);
          color: var(--dark-m);
          cursor: pointer;
          border: none;
          outline: none;
          img {
            height: 26.25px;
          }
          &:disabled {
            // background: none;
            // background-color: var(--yellow-disabled) !important;
            box-shadow: none;
            opacity: 0.5;
            cursor: not-allowed;
            &:hover,
            &:focus {
              box-shadow: none;
            }
          }
          @media (max-width: 548px) {
            width: 100%;
          }
        }
      }
      &__or {
        text-transform: capitalize;
        font-family: "Lato";
        font-style: normal;
        font-weight: 400;
        font-size: 36px;
        line-height: 120%;
        color: #9d9d9d;
        padding: 36px 0;
      }
      &__from {
        display: flex;
        flex-direction: column;
        padding-bottom: 24px;
        &_label {
          font-family: "Lato";
          font-style: normal;
          font-weight: 400;
          font-size: 24px;
          line-height: 120%;
          color: #9d9d9d;
          padding-bottom: 8px;
        }
        &_line2 {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-direction: row;
          justify-content: flex-end;
          @media (max-width: 768px) {
            flex-wrap: wrap;
          }
          &_input {
            flex: 1;
            border: 1px solid var(--gray);
            border-radius: 12px;
            padding: 12px 16px;
            font: var(--input);
            background: transparent;
            outline: none;
            color: var(--gray);
            width: 100%;
            &:read-only {
              border-color: var(--gray-deep);
              color: var(--gray-deep);
              cursor: not-allowed;
              opacity: 0.4;
            }
            &::placeholder {
              color: var(--gray-deep);
            }
          }
          &_button {
            font: 600 var(--p-m);
            color: var(--yellow);
            background: transparent;
            border: 2px solid var(--yellow);
            border-radius: 12px;
            padding: 8px 83px 10px;

            cursor: pointer;
            color: var(--yellow);
            text-decoration: none;
            box-shadow: none;
            &:hover,
            &:focus {
              box-shadow: 0px 0px 5px 3px rgba(255, 201, 66, 0.4);
            }
            @media (max-width: 768px) {
              width: 100%;
            }
            &:disabled {
              color: var(--yellow-disabled);
              border: 2px solid var(--yellow-disabled);
              /* background: var(--yellow-disabled); */
              cursor: not-allowed;
              &:hover,
              &:focus {
                box-shadow: none;
              }
            }
          }
        }
      }
      &__error {
        margin-top: 40px;
        padding: 24px;
        background-color: #1e1e1e;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        &_element {
          &__line1 {
            display: flex;
            align-items: center;
            gap: 16px;
            h3 {
              color: var(--gray);
              padding: 0;
            }
          }
          &__line2 {
            font-family: "Lato";
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 120%;
            color: #9d9d9d;
            width: 95%;
            span {
              cursor: pointer;
              color: var(--yellow);
              text-decoration: none;
            }
          }
          &__button {
            padding: 10px 22.5px 12px;
            display: inline;
            font: 600 var(--p-m);
            color: var(--dark-m);
            text-transform: capitalize;
            background: var(--yellow-gradient-bg);
            box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.25),
              inset -4px -4px 8px rgba(0, 0, 0, 0.25), inset 4px 4px 8px #ffc942;
            border-radius: 12px;
            transition: all ease-in-out 100ms;
            cursor: pointer;
            color: var(--dark-m);
            text-decoration: none;
            border: none;
            outline: none;
            &:hover,
            &:focus {
              box-shadow: 0px 0px 5px 3px rgba(255, 201, 66, 0.4);
            }
            @media (max-width: 548px) {
              width: 100%;
            }
            &:disabled {
              background: none;
              background-color: var(--yellow-disabled) !important;
              box-shadow: none;
              &:hover,
              &:focus {
                box-shadow: none;
              }
            }
          }
          &:first-child {
            flex: 1;
            /* max-width: 712px; */
          }
          &:last-child {
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            width: 100%;
          }
        }
      }
    }
  }
  .section_calculation__address {
    font: var(--p-m);
    color: var(--gray-deep);
    word-break: break-word;
  }
`;
