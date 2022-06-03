import React from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";

import { FooterContainer } from "../styles/layout/FooterStyle";

import DATA from "../data/footerData.json";

import SubscribeForm from "../components/SubscribeForm";
import { useTranslation } from "react-i18next";

const mailURl = process.env.REACT_APP_MAIL_CHIMP_URL;

const Footer = () => {
  const { t } = useTranslation();
  return (
    <FooterContainer>
      <h2 className="footer__title">{t("FOOTER_TITLE")}</h2>
      <p className="footer__details">{t("FOOTER_SUBTITLE")}</p>
      <div className="footer_container">
        <div className="footer_container__element">
          <div className="footer_container__element_emails">
            <img
              src="/images/icons/email_icon.png"
              alt="email icon"
              className="footer_container__element_emails__icon"
            />
            <h3 className="footer_container__element_emails__title">
              {t("EMAIL")}
            </h3>
          </div>

          <div className="footer_container__element_email__tile">
            <h4 className="footer_container__element_email__tile_title">
              {t("FOOTER_EMAIL_TITLE_1")}
            </h4>
            <a
              className="footer_container__element_email__tile_email"
              href="mailto:hello@assetmantle.one"
              target="_blank"
              rel="noopener noreferrer"
            >
              hello@assetmantle.one
            </a>
          </div>

          <div className="footer_container__element_email__tile">
            <h4 className="footer_container__element_email__tile_title">
              {t("FOOTER_EMAIL_TITLE_2")}
            </h4>
            <a
              className="footer_container__element_email__tile_email"
              href="mailto:communications@assetmantle.one"
              target="_blank"
              rel="noopener noreferrer"
            >
              communications@assetmantle.one
            </a>
          </div>

          <div className="footer_container__element_social">
            <h3 className="footer_container__element_social__title">
              {DATA.social.h3}
            </h3>
            <div className="footer_container__element_social__icons">
              {DATA.social.links &&
                React.Children.toArray(
                  DATA.social.links.map((data) => (
                    <a
                      className="footer_container__element_social__icons_icon"
                      href={data.href && data.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`/images/icons/${data.icon && data.icon}.png`}
                        alt={data.alt && data.alt}
                      />
                    </a>
                  ))
                )}
            </div>
          </div>
        </div>
        <div className="footer_container__element_2">
          <div className="footer_container__element_2__subscribe">
            <h3 className="footer_container__element_2__subscribe_title">
              {t("FOOTER_JOIN_TITLE")}
            </h3>
            <div className="footer_container__element_2__subscribe_form">
              <MailchimpSubscribe
                url={mailURl}
                render={({ subscribe, status, message }) => (
                  <SubscribeForm
                    status={status}
                    message={message}
                    onValidated={(formData) => subscribe(formData)}
                  />
                )}
              />
            </div>
            {/* <form
              className="footer_container__element_2__subscribe_form"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="example@gmail.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" onSubmit={(e) => e.preventDefault}>
                Join
              </button>
            </form> */}
          </div>
          <div className="footer_container__element_2__links">
            <p className="footer_container__element_2__links_link">
              {t("FOOTER_LINK_1")}&nbsp;
              <a
                href="http://blog.assetmantle.one/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("BLOG")}
              </a>
            </p>
            <p className="footer_container__element_2__links_link">
              {t("FOOTER_LINK_2")}&nbsp;
              <a
                href="https://docs.assetmantle.one/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("DOCS")}
              </a>
            </p>
            <p className="footer_container__element_2__links_link">
              {t("FOOTER_LINK_3")}&nbsp;
              <a
                href="https://explorer.assetmantle.one/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("EXPLORER")}
              </a>
            </p>
          </div>
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;
