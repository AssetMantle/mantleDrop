import React from "react"; // , { useEffect, useState }
import ReactPlayer from "react-player";
import { StakeDropContainer } from "../../styles/pages/stakeDropStyle";
import { useTranslation } from "react-i18next";

import UList from "../../components/UList";
import UList2 from "../../components/UList2";
import Details from "../../components/Details";

export default function StakeDrop() {
  const { t } = useTranslation();

  const cosmosDropStats = {
    isCompleted: true,
  };
  const persistenceDropStats = {
    isCompleted: true,
  };
  const terraDropStats = {
    isCompleted: true,
  };
  const comdexDropStats = {
    isCompleted: true,
  };
  const junoDropStats = {
    isCompleted: true,
  };
  const stargazeDropStats = {
    isCompleted: true,
  };

  const whatIsLIST = [
    t("STAKEDROP_WHAT_IS_STAKEDROP_LI_1"),
    t("STAKEDROP_WHAT_IS_STAKEDROP_LI_2"),
    t("STAKEDROP_WHAT_IS_STAKEDROP_LI_3"),
  ];

  const howItWorksLIST = [
    {
      title: t("STAKEDROP_HOW_IT_WORKS_LI_1_TITLE"),
      body: t("STAKEDROP_HOW_IT_WORKS_LI_1_DESCRIPTION"),
    },
    {
      title: t("STAKEDROP_HOW_IT_WORKS_LI_2_TITLE"),
      body: t("STAKEDROP_HOW_IT_WORKS_LI_2_DESCRIPTION"),
    },
    {
      title: t("STAKEDROP_HOW_IT_WORKS_LI_3_TITLE"),
      body: t("STAKEDROP_HOW_IT_WORKS_LI_3_DESCRIPTION"),
    },
    {
      title: t("STAKEDROP_HOW_IT_WORKS_LI_4_TITLE"),
      body: t("STAKEDROP_HOW_IT_WORKS_LI_4_DESCRIPTION"),
    },
  ];

  const AvailableStakeDrop = [
    {
      logo: "Cosmos_Logo.png",
      link: "cosmos",
      name: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_1_NAME"),
      value: "2,000,000 $MNTL",
      date: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_1_DATE"),
      start: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_1_START"),
      end: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_1_END"),
    },
    {
      logo: "Persistence_logo.png",
      link: "persistence",
      name: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_2_NAME"),
      value: "1,000,000 $MNTL",
      date: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_2_DATE"),
      start: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_2_START"),
      end: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_2_END"),
    },
    {
      logo: "Terra_logo.png",
      link: "terra",
      name: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_3_NAME"),
      value: "2,000,000 $MNTL",
      date: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_3_DATE"),
      start: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_3_START"),
      end: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_3_END"),
    },
    {
      logo: "Comdex_logo.png",
      link: "comdex",
      name: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_4_NAME"),
      value: "1,000,000 $MNTL",
      date: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_4_DATE"),
      start: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_4_START"),
      end: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_4_END"),
    },
    {
      logo: "Juno_logo.png",
      link: "juno",
      name: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_5_NAME"),
      value: "2,000,000 $MNTL",
      date: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_5_DATE"),
      start: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_5_START"),
      end: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_5_END"),
    },
    {
      logo: "Stargaze_logo.png",
      link: "stargaze",
      name: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_6_NAME"),
      value: "1,000,000 $MNTL",
      date: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_6_DATE"),
      start: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_6_START"),
      end: t("STAKEDROP_AVAILABLE_STAKEDROP_DROP_6_END"),
    },
  ];

  const FAQ = [
    {
      q: t("STAKEDROP_FAQ_QUESTION_1"),
      a: t("STAKEDROP_FAQ_ANSWER_1"),
    },
    {
      q: t("STAKEDROP_FAQ_QUESTION_2"),
      a: t("STAKEDROP_FAQ_ANSWER_2"),
    },
    {
      q: t("STAKEDROP_FAQ_QUESTION_3"),
      a: t("STAKEDROP_FAQ_ANSWER_3"),
    },
    {
      q: t("STAKEDROP_FAQ_QUESTION_4"),
      a: t("STAKEDROP_FAQ_ANSWER_4"),
    },
    {
      q: t("STAKEDROP_FAQ_QUESTION_5"),
      a: t("STAKEDROP_FAQ_ANSWER_5"),
    },
    {
      q: t("STAKEDROP_FAQ_QUESTION_6"),
      a: t("STAKEDROP_FAQ_ANSWER_6"),
    },
    {
      q: t("STAKEDROP_FAQ_QUESTION_7"),
      a: t("STAKEDROP_FAQ_ANSWER_7"),
    },
    {
      q: t("STAKEDROP_FAQ_QUESTION_8"),
      a: t("STAKEDROP_FAQ_ANSWER_8"),
    },
    {
      q: t("STAKEDROP_FAQ_QUESTION_9"),
      a: t("STAKEDROP_FAQ_ANSWER_9"),
    },
  ];

  return (
    <>
      <StakeDropContainer>
        <section className="section_intro">
          <div className="section_intro__element">
            <h1>{t("STAKEDROP_INTRO_TITLE")}</h1>
            <p className="section_intro__element_subtitle">
              {t("STAKEDROP_INTRO_SUB_TITLE")}
            </p>
            <p className="section_intro__element_description">
              {t("STAKEDROP_INTRO_DESCRIPTION")}
            </p>
            <div className="section_intro__element_buttons">
              <button className="section_intro__element_buttons_button">
                {t("STAKEDROP_INTRO_BUTTON_1")}
              </button>
              <button className="section_intro__element_buttons_button">
                {t("STAKEDROP_INTRO_BUTTON_2")}
              </button>
            </div>
            <div className="section_intro__element_readBlog">
              <p className="section_intro__element_readBlog__text">
                {t("AIRDROP_HERO_READ_BLOG_TEXT")}
              </p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://blog.assetmantle.one/2022/03/14/mantledrop-stakedrop-101/"
                className="section_intro__element_readBlog__button"
              >
                {t("AIRDROP_HERO_READ_BLOG_BUTTON_TEXT")}
              </a>
            </div>
          </div>
          <div className="section_intro__element">
            <img
              src="/images/stakedrop/spiral.png"
              alt="network chain illustration"
            />
          </div>
        </section>

        <section className="section_availableStakeDrop">
          <h2>{t("STAKEDROP_AVAILABLE_STAKEDROP_TITLE")}</h2>
          <div className="section_availableStakeDrop__body">
            {React.Children.toArray(
              AvailableStakeDrop.map((data) => (
                <div
                  className={`section_availableStakeDrop__body_element ${
                    data.name.includes("Cosmos")
                      ? cosmosDropStats.isCompleted && "completed2"
                      : data.name.includes("Persistence")
                      ? persistenceDropStats.isCompleted && "completed2"
                      : data.name.includes("Terra")
                      ? terraDropStats.isCompleted && "completed2"
                      : data.name.includes("Comdex")
                      ? comdexDropStats.isCompleted && "completed2"
                      : data.name.includes("Juno")
                      ? junoDropStats.isCompleted && "completed2"
                      : data.name.includes("Stargaze")
                      ? stargazeDropStats.isCompleted && "completed2"
                      : ""
                  } ${
                    data.name.includes("Junos") ||
                    data.name.includes("Stargazes")
                      ? "active"
                      : "comingSoon"
                  }`} //remove the last logic
                >
                  <div className="section_availableStakeDrop__body_element__stat">
                    <span>{t("COMPLETED")}</span>
                    <span>{t("ONGOING")}</span> {/* remove this span */}
                  </div>
                  <div className="section_availableStakeDrop__body_element__title">
                    <img
                      src={`/images/stakedrop/${data.logo && data.logo}`}
                      alt="cosmos (atom) logo"
                    />
                    <a
                      href={`/stakedrop/${data.link && data.link}`}
                      className="section_availableStakeDrop__body_element__title_button_normal"
                    >
                      {t("VIEW")}
                    </a>
                    <a
                      href={`/stakedrop/${data.link && data.link}`}
                      className="section_availableStakeDrop__body_element__title_button_completed"
                    >
                      {t("DETAILS")}
                    </a>
                    <button className="section_availableStakeDrop__body_element__title_button_coming_soon">
                      {t("COMING_SOON")}
                    </button>
                  </div>
                  <div className="section_availableStakeDrop__body_element__body">
                    <p>{data.name && data.name}</p>
                    <div className="section_availableStakeDrop__body_element__body_options">
                      <div className="section_availableStakeDrop__body_element__body_options_option">
                        <img
                          src="/images/stakedrop/coins.png"
                          alt="coins illustration"
                        />
                        <p>{data.value && data.value}</p>
                      </div>
                      <div className="section_availableStakeDrop__body_element__body_options_option">
                        <img
                          src="/images/stakedrop/calender.png"
                          alt="calender illustration"
                        />
                        <p>{data.date && data.date}</p>
                      </div>
                      <div className="section_availableStakeDrop__body_element__body_options_option">
                        <img
                          src="/images/stakedrop/flag_fill.png"
                          alt="flag_fill illustration"
                        />
                        <p>{data.start && data.start}</p>
                      </div>
                      <div className="section_availableStakeDrop__body_element__body_options_option">
                        <img
                          src="/images/stakedrop/flag_outline.png"
                          alt="flag_outline illustration"
                        />
                        <p>{data.end && data.end}</p>
                      </div>
                    </div>
                    <div className="section_availableStakeDrop__body_element__body_data">
                      <div className="section_availableStakeDrop__body_element__body_data__img">
                        <img
                          src="/images/stakedrop/coins.png"
                          alt="small coins illustration"
                        />
                      </div>
                      <div className="section_availableStakeDrop__body_element__body_data__text">
                        <p>
                          {t(
                            "STAKEDROP_AVAILABLE_STAKEDROP_DROP_COMPLETED_TEXT"
                          )}
                        </p>
                        <p>
                          {data.name.includes("Cosmos")
                            ? cosmosDropStats.rewardLine1 !==
                              "You didn't participate in this campaign!"
                              ? isNaN(0)
                                ? `0 $MNTL`
                                : `$0 $MNTL`
                              : "You didn't participate in this campaign!"
                            : undefined}
                        </p>
                      </div>
                    </div>
                    <div className="section_availableStakeDrop__body_element__claim_button">
                      <button>{t("CHECK")}</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="section_whatIs">
          <h1>{t("STAKEDROP_WHAT_IS_STAKEDROP_TITLE")}</h1>
          <p>{t("STAKEDROP_WHAT_IS_STAKEDROP_DESCRIPTION")}</p>
          <div className="section_whatIs__element">
            <img
              src="/images/stakedrop/double_coin.png"
              alt="double coin illustration"
            />
            <UList data={whatIsLIST}></UList>
          </div>
        </section>

        <section className="section_howItWorks">
          <h2>{t("STAKEDROP_HOW_IT_WORKS_TITLE")}</h2>
          <p>{t("STAKEDROP_HOW_IT_WORKS_DESCRIPTION")}</p>
          <UList2 data={howItWorksLIST}></UList2>
        </section>

        <section className="section_explanation">
          <h3>{t("STAKEDROP_EXPLANATION_TITLE")}</h3>
          <div className="section_explanation__video">
            <ReactPlayer
              url="https://youtu.be/Mo5GxFWG12w"
              controls={true}
              width="100%"
              height="100%"
            />
          </div>
        </section>

        <section className="section_faq">
          <h2>{t("STAKEDROP_FAQ_TITLE")}</h2>
          {/* <p>{t("STAKEDROP_FAQ_DESCRIPTION")}</p> */}
          {FAQ &&
            React.Children.toArray(
              FAQ.map((faq) => <Details title={faq.q} details={faq.a} />)
            )}
        </section>
      </StakeDropContainer>
    </>
  );
}
