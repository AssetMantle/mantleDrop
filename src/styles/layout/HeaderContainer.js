import styled from "styled-components";

const HeaderContainer = styled.header`
  padding: 62px 92px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .header {
    &__left {
      img {
        .logo {
          height: 42px;
          width: auto;
        }
      }
    }
    &__right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &_second__nav {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 61.5px;
        &_theme__toggler {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          &_button {
            display: flex;
            align-items: center;
            background-color: var(--dark-s);
            padding: 6px;
            border-radius: 15px;
            width: 56px;
            &__dot {
              height: 21px;
              width: 21px;
              border-radius: 50%;
              background: var(--yellow-gradient-bg);
              margin-right: auto;
              margin-left: 0;
              transition: all ease-in 1s;
              &.active {
                margin-left: auto;
                margin-right: 0;
              }
            }
          }
        }
        &_buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding-left: 37px;
        }
      }
    }
  }
`;

export const NavIcon = styled.div`
  z-index: 100;
  margin: 15px 20px;
  width: 20px;
  height: 22px;
  .toggler {
    &_btn {
      margin: 10px 0;
      height: 2px;
      width: 20px;
      background: var(--yellow-gradient-bg);
      position: relative;
      transition: all cubic-bezier(0.67, -0.62, 0, 1.53) 300ms;
      &::before {
        position: absolute;
        top: -8px;
        right: 0;
        height: 2px;
        width: 20px;
        background: var(--yellow-gradient-bg);
        content: "";
      }
      &::after {
        position: absolute;
        bottom: -8px;
        right: 0;
        height: 2px;
        width: 20px;
        background: var(--yellow-gradient-bg);
        content: "";
      }
      &.active {
        transform: rotate(90deg);
        background: transparent;
        &::before {
          transform: rotate(45deg);
          top: 0;
          width: 25px;
        }
        &::after {
          transform: rotate(-45deg);
          top: 0;
          width: 25px;
        }
      }
    }
  }
`;

export default HeaderContainer;