import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import "../../styles/pages/campaignTable.css";
import { BsInfoCircle } from "react-icons/bs";

import campaignDATA from "../../data/campaignData.json";

import { initializeKeplrForTera } from "./utils/terraKeplr";
import { initializeKeplrForComdex } from "./utils/comdexKeplr";

export default function CalculationPage() {
  const path = useParams();
  const { t } = useTranslation();

  const [Address, setAddress] = useState();

  const [CampaignStat, setCampaignStat] = useState();

  const [IsMagicTransaction, setIsMagicTransaction] = useState();

  useEffect(() => {
    fetch(`https://${path.id}-stakedrop.assetmantle.one/status`)
      .then((res) => res.json())
      .then((res) => setCampaignStat(res))
      .catch((err) => console.log(err));
  }, [path.id]);

  // connect keplr
  const [KeplrConnectionState, setKeplrConnectionState] = useState(0);
  const chainID = {
    cosmos: "cosmoshub-4",
    persistence: "core-1",
    terra: "columbus-5",
    comdex: "comdex-1",
    juno: "juno-1",
    stargaze: "stargaze-1",
  }[path.id];

  const handleKeplrConnect = async () => {
    if (path.id === "terra") {
      if (window.keplr) {
        setKeplrConnectionState(1);
        try {
          await initializeKeplrForTera();
        } catch (e) {
          console.log(e);
        }
        let offlineSigner = window.keplr.getOfflineSigner(chainID);
        let accounts = await offlineSigner.getAccounts();
        const account = accounts[0].address;
        setAddress(account);
        setKeplrConnectionState(2);
        setIsMagicTransaction();
      } else {
        window.alert("Please install Keplr to move forward with the task.");
      }
    } else if (path.id === "comdex") {
      if (window.keplr) {
        setKeplrConnectionState(1);
        try {
          await initializeKeplrForComdex();
        } catch (e) {
          console.log(e);
        }
        let offlineSigner = window.keplr.getOfflineSigner(chainID);
        let accounts = await offlineSigner.getAccounts();
        const account = accounts[0].address;
        setAddress(account);
        setKeplrConnectionState(2);
        setIsMagicTransaction();
      } else {
        window.alert("Please install Keplr to move forward with the task.");
      }
    } else {
      if (window.keplr) {
        setKeplrConnectionState(1);
        let offlineSigner = window.keplr.getOfflineSigner(chainID);
        let accounts = await offlineSigner.getAccounts();
        const account = accounts[0].address;
        setAddress(account);
        setKeplrConnectionState(2);
        setIsMagicTransaction();
      } else {
        window.alert("Please install Keplr to move forward with the task.");
      }
    }
  };

  // calculate rewards
  const [StakeAddress, setStakeAddress] = useState();
  const [TotalStaked, setTotalStaked] = useState("0.00");
  const [TotalReward, setTotaReward] = useState("0.00");
  const [TotalCorrect, setTotalCorrect] = useState("--");
  const [TotalEstimated, setTotalEstimated] = useState(0);

  const TotalStakedN = Number(TotalStaked);
  const TotalRewardN = Number(TotalReward);
  const TotalEstimatedN = Number(TotalEstimated);

  function countAnswer(data) {
    var counter = 0;
    data.forEach((dd) => {
      if (dd.correct) {
        counter++;
      }
    });

    return counter;
  }

  const handleCalculate = () => {
    fetch(`https://${path.id}-stakedrop.assetmantle.one/delegator/${Address}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success.toString() === "true") {
          setStakeAddress(data.mantleAddress);
          setTotalStaked(data.globalDelegation);
          setTotaReward(data.received);
          setTotalEstimated(data.estimated);
          setIsMagicTransaction(true);
          fetch(`https://${path.id}-stakedrop.assetmantle.one/qna/${Address}`)
            .then((res) => res.json())
            .then((data) => {
              setTotalCorrect(countAnswer(data.qaData));
            });
        } else if (data.success.toString() === "false") {
          setIsMagicTransaction(false);
          setStakeAddress();
          setTotalStaked("0.00");
          setTotaReward("0.00");
          setTotalEstimated("0.00");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <section
        className="section_goBack"
        onClick={() => window.open("/stakedrop", "_self")}
      >
        <img src="/images/stakedrop/back_arrow.svg" alt="back arrow" />
        <h2>{t("MANTLEDROP_CAMPAIGN_BACK")}</h2>
      </section>
      {path.id === "cosmos" ||
      path.id === "persistence" ||
      path.id === "terra" ||
      path.id === "comdex" ||
      path.id === "juno" ||
      path.id === "stargaze" ? (
        <div className="calculate_grid">
          <div className="left">
            <section className="section__overview">
              <div>
                <div className="section__overview_campaign lighter_bg">
                  <h3 className="section__overview_campaign__title">
                    {`${path.id} ${t("MANTLEDROP_CAMPAIGN_TITLE")}`}
                  </h3>
                  <div className="section__overview_campaign__option">
                    <p className="section__overview_campaign__option_label                                                                                                                        ">
                      {t("STAKEDROP_MODAL_CAMPAIGN_OPTION_2_TITLE")}
                    </p>
                    <h3 className="section__overview_campaign__option_value">
                      {
                        {
                          cosmos: Number(
                            campaignDATA.cosmos.dataTable1.op1Value
                          ).toLocaleString("en-US", {
                            maximumFractionDigits: 4,
                          }),
                          persistence: Number(
                            campaignDATA.persistance.dataTable1.op1Value
                          ).toLocaleString("en-US", {
                            maximumFractionDigits: 4,
                          }),
                          terra: Number(
                            campaignDATA.terra.dataTable1.op1Value
                          ).toLocaleString("en-US", {
                            maximumFractionDigits: 4,
                          }),
                          comdex: Number(
                            campaignDATA.comdex.dataTable1.op1Value
                          ).toLocaleString("en-US", {
                            maximumFractionDigits: 4,
                          }),
                          juno: Number(
                            campaignDATA.juno.dataTable1.op1Value
                          ).toLocaleString("en-US", {
                            maximumFractionDigits: 4,
                          }),
                          stargaze: Number(
                            campaignDATA.stargaze.dataTable1.op1Value
                          ).toLocaleString("en-US", {
                            maximumFractionDigits: 4,
                          }),
                        }[path.id]
                      }
                    </h3>
                  </div>
                  <div className="section__overview_campaign__option">
                    <p className="section__overview_campaign__option_label                                                                                                                        ">
                      {t("STAKEDROP_MODAL_CAMPAIGN_OPTION_3_TITLE")}
                    </p>
                    <h3 className="section__overview_campaign__option_value">
                      {
                        {
                          cosmos: campaignDATA.cosmos.dataTable1.op2Value,
                          persistence:
                            campaignDATA.persistance.dataTable1.op2Value,
                          terra: campaignDATA.terra.dataTable1.op2Value,
                          comdex: campaignDATA.comdex.dataTable1.op2Value,
                          juno: campaignDATA.juno.dataTable1.op2Value,
                          stargaze: campaignDATA.stargaze.dataTable1.op2Value,
                        }[path.id]
                      }
                    </h3>
                    <p className="section__overview_campaign__option_details">
                      {t("BLOCK_HEIGHT")}:{" "}
                      {
                        {
                          cosmos: campaignDATA.cosmos.dataTable1.op2Description,
                          persistence:
                            campaignDATA.persistance.dataTable1.op2Description,
                          terra: campaignDATA.terra.dataTable1.op2Description,
                          comdex: campaignDATA.comdex.dataTable1.op2Description,
                          juno: campaignDATA.juno.dataTable1.op2Description,
                          stargaze:
                            campaignDATA.stargaze.dataTable1.op2Description,
                        }[path.id]
                      }
                    </p>
                  </div>
                  <div className="section__overview_campaign__option">
                    <p className="section__overview_campaign__option_label                                                                                                                        ">
                      {t("STAKEDROP_MODAL_CAMPAIGNSTAT_OPTION_3I_TITLE")}
                    </p>
                    <h3 className="section__overview_campaign__option_value">
                      {
                        {
                          cosmos: campaignDATA.cosmos.dataTable1.op3Value,
                          persistence:
                            campaignDATA.persistance.dataTable1.op3Value,
                          terra: campaignDATA.terra.dataTable1.op3Value,
                          comdex: campaignDATA.comdex.dataTable1.op3Value,
                          juno: campaignDATA.juno.dataTable1.op3Value,
                          stargaze: campaignDATA.stargaze.dataTable1.op3Value,
                        }[path.id]
                      }
                    </h3>
                    <p className="section__overview_campaign__option_details">
                      {t("BLOCK_HEIGHT")}:{" "}
                      {
                        {
                          cosmos: campaignDATA.cosmos.dataTable1.op3Description,
                          persistence:
                            campaignDATA.persistance.dataTable1.op3Description,
                          terra: campaignDATA.terra.dataTable1.op3Description,
                          comdex: campaignDATA.comdex.dataTable1.op3Description,
                          juno: campaignDATA.juno.dataTable1.op3Description,
                          stargaze:
                            campaignDATA.stargaze.dataTable1.op3Description,
                        }[path.id]
                      }
                    </p>
                  </div>
                  <div className="section__overview_campaign__option">
                    <p className="section__overview_campaign__option_label                                                                                                                        ">
                      {t("STAKEDROP_MODAL_CAMPAIGN_OPTION_4_TITLE")}
                    </p>
                    <h3 className="section__overview_campaign__option_value">
                      {
                        {
                          cosmos: campaignDATA.cosmos.dataTable1.op4Value,
                          persistence:
                            campaignDATA.persistance.dataTable1.op4Value,
                          terra: campaignDATA.terra.dataTable1.op4Value,
                          comdex: campaignDATA.comdex.dataTable1.op4Value,
                          juno: campaignDATA.juno.dataTable1.op4Value,
                          stargaze: campaignDATA.stargaze.dataTable1.op4Value,
                        }[path.id]
                      }
                    </h3>
                    <p className="section__overview_campaign__option_details">
                      {t("BLOCK_HEIGHT")}:{" "}
                      {
                        {
                          cosmos: campaignDATA.cosmos.dataTable1.op4Description,
                          persistence:
                            campaignDATA.persistance.dataTable1.op4Description,
                          terra: campaignDATA.terra.dataTable1.op4Description,
                          comdex: campaignDATA.comdex.dataTable1.op4Description,
                          juno: campaignDATA.juno.dataTable1.op4Description,
                          stargaze:
                            campaignDATA.stargaze.dataTable1.op4Description,
                        }[path.id]
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="section__overview_campaignStat lighter_bg">
                  <h3 className="section__overview_campaignStat__title">
                    {t("STAKEDROP_MODAL_CAMPAIGNSTAT_TITLE")}
                  </h3>
                  <div className="section__overview_campaignStat__option">
                    <p className="section__overview_campaignStat__option_label">
                      {t("STAKEDROP_MODAL_CAMPAIGNSTAT_OPTION_1_TITLE")}
                    </p>
                    <h3 className="section__overview_campaignStat__option_value">
                      0{` $MNTL`}
                    </h3>
                  </div>
                  <div className="section__overview_campaignStat__option">
                    <p className="section__overview_campaignStat__option_label">
                      {t("STAKEDROP_MODAL_CAMPAIGNSTAT_OPTION_2_TITLE")}
                    </p>
                    <h3 className="section__overview_campaignStat__option_value">
                      {t("CONCLUDED")}
                    </h3>
                  </div>
                  <div className="section__overview_campaignStat__option">
                    <p className="section__overview_campaignStat__option_label">
                      {t("STAKEDROP_MODAL_CAMPAIGNSTAT_OPTION_3_TITLE")}
                    </p>
                    <h3 className="section__overview_campaignStat__option_value">
                      {CampaignStat
                        ? (
                            Number(
                              CampaignStat.totalStakeDropGlobalDelegation
                            ) / 1000000
                          ).toLocaleString("en-US", {
                            maximumFractionDigits: 4,
                          })
                        : "--"}{" "}
                      {
                        {
                          cosmos: campaignDATA.cosmos.currency,
                          persistence: campaignDATA.persistance.currency,
                          terra: campaignDATA.terra.currency,
                          comdex: campaignDATA.comdex.currency,
                          juno: campaignDATA.juno.currency,
                          stargaze: campaignDATA.stargaze.currency,
                        }[path.id]
                      }
                    </h3>
                    <p className="section__overview_campaign__option_details">
                      {t("TOTAL_ACTIVE")}:{" "}
                      {CampaignStat
                        ? (
                            Number(CampaignStat.worldGlobalDelegation) / 1000000
                          ).toLocaleString("en-US", {
                            maximumFractionDigits: 4,
                          })
                        : "--"}{" "}
                      {
                        {
                          cosmos: campaignDATA.cosmos.currency,
                          persistence: campaignDATA.persistance.currency,
                          terra: campaignDATA.terra.currency,
                          comdex: campaignDATA.comdex.currency,
                          juno: campaignDATA.juno.currency,
                          stargaze: campaignDATA.stargaze.currency,
                        }[path.id]
                      }
                    </p>
                  </div>
                  <div className="section__overview_campaignStat__option">
                    <p className="section__overview_campaignStat__option_label">
                      Total Participants
                    </p>
                    <h3 className="section__overview_campaignStat__option_value">
                      {CampaignStat
                        ? Number(CampaignStat.numDelegators).toLocaleString(
                            "en-US",
                            { maximumFractionDigits: 4 }
                          )
                        : "--"}
                    </h3>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="right">
            <section className="section_calculation lighter_bg">
              <h2>{t("MANTLEDROP_CAMPAIGN_CONNECT_TITLE")}</h2>
              <div className="section_calculation__connect">
                <p className="section_calculation__connect_text">
                  {t("MANTLEDROP_CAMPAIGN_CONNECT_WALLET")}
                </p>
                <div
                  className="section_calculation__connect_button"
                  onClick={handleKeplrConnect}
                >
                  <img src="/images/airdrop/Kepler.png" alt="Keplr icon" />
                  <span>{`${
                    { 0: t("CONNECT"), 1: t("CONNECTING"), 2: t("CONNECTED") }[
                      KeplrConnectionState
                    ]
                  } Keplr`}</span>
                </div>
              </div>
              <div className="section_calculation__or">{t("OR")}</div>
              <div className="section_calculation__from">
                <label
                  htmlFor="walletAddress"
                  className="section_calculation__from_label"
                >
                  {t("MANTLEDROP_CAMPAIGN_CONNECT_WALLET_LABEL")}
                </label>
                <div className="section_calculation__from_line2">
                  <input
                    type="text"
                    name="walletAddress"
                    value={Address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="section_calculation__from_line2_input"
                    placeholder={`Enter your ${path.id} wallet address`}
                  />
                  <button
                    onClick={handleCalculate}
                    className="section_calculation__from_line2_button"
                    disabled={
                      Address !== null &&
                      Address !== "" &&
                      Address !== undefined
                        ? false
                        : true
                    }
                  >
                    {t("CALCULATE")}
                  </button>
                </div>
              </div>
              {IsMagicTransaction === false && (
                <div className="section_calculation__error">
                  <div className="section_calculation__error_element">
                    <div className="section_calculation__error_element__line1">
                      <span>
                        <BsInfoCircle />
                      </span>
                      <h3>
                        {t("MANTLEDROP_CAMPAIGN_CONNECT_NOT_PARTICIPATED")}
                      </h3>
                    </div>
                  </div>
                  <div className="section_calculation__error_element"></div>
                </div>
              )}
              <div className="section_calculation__result">
                <div className="section_calculation__result_address">
                  <p className="section_calculation__result_address__label">
                    MNTL {t("ADDRESS")}
                  </p>
                  <p className="section_calculation__result_address__value">
                    {StakeAddress !== null &&
                    StakeAddress !== undefined &&
                    StakeAddress !== ""
                      ? StakeAddress
                      : "--"}
                  </p>
                </div>
                <div className="section_calculation__result_rewards">
                  <div className="section_calculation__result_rewards_reward">
                    <p className="section_calculation__result_rewards_reward__label">
                      {t("TOTAL_STAKED")}
                    </p>
                    <h3 className="section_calculation__result_rewards_reward__value">
                      {(TotalStakedN / 1000000).toLocaleString("en-US", {
                        maximumFractionDigits: 4,
                      })}{" "}
                      {
                        {
                          cosmos: campaignDATA.cosmos.currency,
                          persistence: campaignDATA.persistance.currency,
                          terra: campaignDATA.terra.currency,
                          comdex: campaignDATA.comdex.currency,
                          juno: campaignDATA.juno.currency,
                          stargaze: campaignDATA.stargaze.currency,
                        }[path.id]
                      }
                    </h3>
                  </div>
                  <div className="section_calculation__result_rewards_reward">
                    <p className="section_calculation__result_rewards_reward__label">
                      {t("TOTAL_REWARDS")}
                    </p>
                    <h3 className="section_calculation__result_rewards_reward__value">
                      {(TotalRewardN / 1000000).toLocaleString("en-US", {
                        maximumFractionDigits: 4,
                      })}{" "}
                      $MNTL
                    </h3>
                  </div>
                  <div className="section_calculation__result_rewards_reward">
                    <p className="section_calculation__result_rewards_reward__label">
                      {t("TOTAL_ESTIMATED_REWARDS")}
                    </p>
                    <h3 className="section_calculation__result_rewards_reward__value">
                      {(TotalEstimatedN / 1000000).toLocaleString("en-US", {
                        maximumFractionDigits: 4,
                      })}{" "}
                      $MNTL
                    </h3>
                  </div>
                </div>
              </div>
            </section>
            <section className="section_questions">
              <div className="section_questions__qBox">
                <div className="section_questions__qBox_title">
                  <h3 className="section_questions__qBox_title__name">
                    {t("QUIZ_RESULT")}
                  </h3>
                  <div className="section_questions__qBox_title__right"></div>
                </div>
                <p className="section_questions__qBox_details">
                  {t("YOU_SCORED")} {TotalCorrect} {t("OUT_OF")}{" "}
                  {
                    {
                      cosmos: 18,
                      persistence: 21,
                      terra: 21,
                      comdex: 21,
                      juno: 21,
                      stargaze: 21,
                    }[path.id]
                  }{" "}
                  {t("IN_QUIZ")}.
                </p>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <NotFound>
          <img
            src="/images/stakedrop/not_found.svg"
            alt="no match found illustration"
          />
        </NotFound>
      )}
    </Container>
  );
}

const Container = styled.main`
  max-width: 1440px;
  scroll-behavior: smooth;
  margin: 0 auto;
  background-image: url("/images/bg/bg_assets.svg");
  background-size: 100vw auto;
  background-repeat: no-repeat;
  min-height: 100vh;
  z-index: 1;
  padding: 80px 92px;
  @media (max-width: 768px) {
    background-image: url("/images/bg/tab_bg_assets.svg");
    padding: 80px 40px;
  }
  @media (max-width: 548px) {
    background-image: url("/images/bg/m_bg_assets.svg");
    padding: 80px 20px;
  }
  .lighter_bg {
    background: #2c2c2c;
    border-radius: 12px;
  }
  .calculate_grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 24px;
    @media (max-width: 760px) {
      grid-template-columns: 1fr;
    }
  }
  .section {
    &_goBack {
      display: flex;
      align-items: center;
      gap: 39.25px;
      padding-bottom: 80px;
      cursor: pointer;

      font-family: "Inter";
      font-style: normal;
      font-weight: 700;
      font-size: 32px;
      line-height: 120%;
      text-transform: capitalize;
      color: #c2c2c2;
    }
    &_calculation {
      padding: 40px;
      @media (max-width: 548px) {
        padding: 20px;
      }
      h2 {
        color: var(--gray);
        padding-bottom: 80px;
      }
      &__connect {
        display: flex;
        align-items: center;
        gap: 24px;
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
          width: 296px;
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
          img {
            height: 26.25px;
          }
          @media (max-width: 548px) {
            width: 100%;
          }
        }
      }
      &__or {
        font-family: "Lato";
        font-style: normal;
        text-transform: capitalize;
        font-weight: 400;
        font-size: 36px;
        line-height: 120%;
        color: #9d9d9d;
        padding: 36px 0;
      }
      &__from {
        display: flex;
        flex-direction: column;
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
          align-items: flex-end;
          gap: 24px;
          flex-direction: column;
          justify-content: flex-end;
          flex-wrap: wrap;
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
        gap: 0px;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        &_element {
          &__line1 {
            display: flex;
            align-items: center;
            gap: 16px;
            /* padding-bottom: 12px; */
            span {
              color: var(--yellow);
              font: 800 var(--p-m);
              font-size: 24px;
              line-height: 100%;
              padding-top: 5px;
            }
            h3 {
              color: var(--gray);
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
            max-width: 712px;
          }
          &:last-child {
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
            width: 100%;
          }
        }
      }
      &__result {
        padding-top: 40px;
        &_address {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
          padding-bottom: 40px;
          &__label,
          &__value {
            font-family: "Lato";
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 24px;
            color: #c2c2c2;
          }
        }
        &_rewards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          @media (max-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
          }
          @media (max-width: 548px) {
            grid-template-columns: repeat(1, 1fr);
          }
          &.two {
            grid-template-columns: repeat(2, 1fr);
            @media (max-width: 768px) {
              grid-template-columns: repeat(1, 1fr);
            }
          }
          &_reward {
            display: flex;
            flex-direction: column;
            gap: 4px;
            &__label {
              font-family: "Lato";
              font-style: normal;
              font-weight: 400;
              font-size: 20px;
              line-height: 24px;
              color: #c2c2c2;
            }
            &__value {
              font-family: "Lato";
              font-style: normal;
              font-weight: 800;
              font-size: 28px;
              line-height: 34px;
              color: #c2c2c2;
            }
          }
        }
      }
      &__range {
        &.input {
          display: flex;
          gap: 24px;
          padding-bottom: 40px;
          flex-wrap: wrap;
          align-items: center;
          @media (max-width: 548px) {
            padding: 20px;
          }
          @media (max-width: 548px) {
            padding: 20px;
          }
          p {
            font: 600 var(--p-m);
            color: var(--gray-deep);
          }
          input[type="number"] {
            padding: 12px 16px;
            background-color: var(--dark);
            border-radius: 12px;
            border: none;
            font: var(--h3);
            color: var(--gray);
            outline: none;
            width: min(250px, 100%);
            -moz-appearance: textfield;
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
          }
          /* & * {
            @media (max-width: 548px) {
              width: 100%;
            }
          } */
        }
        input[type="range"] {
          width: 100%;
          accent-color: var(--yellow);
        }
      }
    }
    &_questions {
      padding: 24px 0;
      &__qBox {
        position: relative;
        background-color: var(--dark-m);
        border-radius: 12px;
        &_title {
          padding: 40px;
          display: flex;
          align-items: center;
          gap: 24px;
          justify-content: space-between;
          border-bottom: 1px solid #3d3d3d;
          @media (max-width: 548px) {
            padding: 20px;
          }
          &__name {
            color: var(--gray);
            display: flex;
            align-items: center;
            gap: 10px;
            span {
              font: var(--h4);
              color: var(--gray-deep);
            }
            .success {
              color: var(--success);
              font: var(--p-m);
            }
          }
          &__right {
            display: flex;
            align-items: center;
            gap: 8px;
            justify-content: center;
            span {
              color: var(--yellow);
              font: var(--p-m);
              margin: 8px 0 auto;
            }
            p {
              font: var(--p-m);
              color: var(--gray);
            }
          }
        }
        &_left,
        &_right {
          color: var(--yellow);
          background-color: transparent;
          border: none;
          outline: none;
          font: var(--p-m);
          display: flex;
          align-items: center;
          &:disabled {
            color: var(--yellow-disabled);
          }
        }
        &_details {
          font: var(--p-s);
          padding: 40px;
          color: var(--gray-deep);
          /* max-width: 768px; */
          text-align: justify;
          @media (max-width: 548px) {
            padding: 20px;
          }
        }
        &_button {
          display: flex;
          align-items: center;
          gap: 24px;
          justify-content: center;
          padding: 40px 40px 0px;
          @media (max-width: 548px) {
            padding: 20px 20px 0px;
          }
          &.a {
            align-items: center;
            gap: 24px;
            justify-content: center;
            font: 600 var(--p-m);
            button {
              border-radius: 50%;
              height: 50px;
              width: 50px;
              display: grid;
              place-items: center;
              font-size: 24px;
              color: var(--dark-m) !important;
              padding: 0;
            }
          }
          button {
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
        }
        &_ques {
          font: 600 var(--p-l);
          padding: 0px 0 24px;
          color: var(--gray);
          max-width: 1176px;
          padding: 0px 40px;
          @media (max-width: 548px) {
            padding: 20px;
          }
        }
        &_ans {
          font: var(--p-m);
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 20px 40px;
          @media (max-width: 548px) {
            padding: 20px;
          }
          &__s {
            display: flex;
            align-items: center;
            gap: 8px;
            &_radio {
              height: 24px;
              width: 24px;
              border-radius: 50%;
              border: 2px solid var(--yellow);
              position: relative;
              cursor: pointer;
              input {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
              }
              &.selected {
                span {
                  position: absolute;
                  top: 3px;
                  left: 3px;
                  background-color: var(--yellow);
                  border-radius: 50%;
                  height: 14px;
                  width: 14px;
                }
              }
            }
            span {
              color: var(--gray);
            }
          }
        }
        &_footer {
          display: flex;
          align-items: center;
          gap: 24px;
          justify-content: space-between;
          padding-top: 24px;
          padding: 20px 40px 40px;
          @media (max-width: 548px) {
            padding: 20px;
          }
          &__element {
            display: flex;
            align-items: center;
            &:nth-child(2) {
              justify-content: center;
              gap: 24px;
            }
          }
          &__dot {
            font: var(--p-m);
            color: var(--gray);
            &.selected {
              color: var(--yellow);
            }
          }
        }
      }
    }
    &__overview {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
      &_campaign,
      &_campaignStat {
        &__title {
          text-transform: capitalize;
          font: var(--h3);
          font-size: 24px;
          color: var(--gray);
          padding: 40px 30px;
          border-bottom: 1px solid #3d3d3d;
          @media (max-width: 548px) {
            padding: 20px;
          }
        }
        &__option {
          display: flex;
          gap: 4px;
          flex-direction: column;
          color: var(--gray);
          padding: 40px 30px;
          @media (max-width: 548px) {
            padding: 20px;
          }
          &:not(:last-child) {
            border-bottom: 1px solid #3d3d3d;
          }
          &_label {
            font: var(--p-m);
          }
          &_details {
            font: 500 var(--p-l);
          }
        }
      }
    }
  }
`;

const NotFound = styled.div`
  padding: 40px 0;
  img {
    width: 100%;
  }
  h1 {
    padding-top: 24px;
    text-align: center;
    color: var(--gray);
    span {
      color: var(--yellow);
    }
    a {
      color: var(--yellow);
      text-decoration: none;
    }
  }
`;
