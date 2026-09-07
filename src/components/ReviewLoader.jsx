import React from "react";
import styled from "styled-components";

const ReviewLoader = () => {
    return (
        <StyledWrapper>
            <div className="loader">
                <div className="ball">
                    <div className="inner">
                        <div className="line" />
                        <div className="line line--two" />
                        <div className="oval" />
                        <div className="oval oval--two" />
                    </div>
                </div>

                <div className="shadow" />
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  width: 90px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .loader {
    width: 70px;
    height: 105px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  @keyframes rotateBall {
    0% {
      transform: rotateY(0deg) rotateX(0deg) rotateZ(0deg);
    }

    50% {
      transform: rotateY(360deg) rotateX(360deg) rotateZ(0deg);
    }

    100% {
      transform: rotateY(720deg) rotateX(720deg) rotateZ(360deg);
    }
  }

  @keyframes bounceBall {
    0% {
      transform: translateY(0px) scale(1, 1);
    }

    15% {
      transform: translateY(8px) scale(1, 1);
    }

    45% {
      transform: translateY(45px) scale(1, 1);
    }

    50% {
      transform: translateY(48px) scale(1, 0.92);
    }

    55% {
      transform: translateY(45px) scale(1, 0.95);
    }

    85% {
      transform: translateY(8px) scale(1, 1);
    }

    95% {
      transform: translateY(0px) scale(1, 1);
    }

    100% {
      transform: translateY(0px) scale(1, 1);
    }
  }

  .ball {
    animation: bounceBall 1.2s infinite
      cubic-bezier(0.42, 0, 0.58, 1);

    border-radius: 50%;
    height: 52px;
    width: 52px;
    position: relative;
    transform-style: preserve-3d;
    z-index: 2;
  }

  .ball::before {
    background: radial-gradient(
      circle at 32px 17px,
      #ff9b2f,
      #b35100
    );

    border: 2px solid #333333;
    border-radius: 50%;
    content: "";
    height: calc(100% + 6px);
    width: calc(100% + 6px);
    left: -3px;
    top: -3px;
    position: absolute;
    transform: translateZ(1vmin);
  }

  .ball .inner {
    animation: rotateBall 25s infinite linear;

    border-radius: 50%;
    height: 100%;
    width: 100%;
    position: absolute;
    transform-style: preserve-3d;
  }

  .ball .line::before,
  .ball .line::after {
    border: 2px solid #333333;
    border-radius: 50%;
    content: "";
    height: 99%;
    width: 99%;
    position: absolute;
  }

  .ball .line::before {
    transform: rotate3d(0, 0, 0, 0);
  }

  .ball .line::after {
    transform: rotate3d(1, 0, 0, 90deg);
  }

  .ball .line--two::before {
    transform: rotate3d(0, 0, 0, 2deg);
  }

  .ball .line--two::after {
    transform: rotate3d(1, 0, 0, 88deg);
  }

  .ball .oval::before,
  .ball .oval::after {
    border-top: 4px solid #333333;
    border-radius: 50%;
    content: "";
    height: 99%;
    width: 99%;
    position: absolute;
  }

  .ball .oval::before {
    transform: rotate3d(1, 0, 0, 45deg)
      translate3d(0, 0, 6px);
  }

  .ball .oval::after {
    transform: rotate3d(1, 0, 0, -45deg)
      translate3d(0, 0, -6px);
  }

  .ball .oval--two::before {
    transform: rotate3d(1, 0, 0, 135deg)
      translate3d(0, 0, -6px);
  }

  .ball .oval--two::after {
    transform: rotate3d(1, 0, 0, -135deg)
      translate3d(0, 0, 6px);
  }

  @keyframes bounceShadow {
    0% {
      filter: blur(3px);
      opacity: 0.5;
      transform: translateY(53px) scale(0.5, 0.5);
    }

    45% {
      filter: blur(1px);
      opacity: 0.9;
      transform: translateY(53px) scale(1, 1);
    }

    55% {
      filter: blur(1px);
      opacity: 0.9;
      transform: translateY(53px) scale(1, 1);
    }

    100% {
      filter: blur(3px);
      opacity: 0.5;
      transform: translateY(53px) scale(0.5, 0.5);
    }
  }

  .shadow {
    animation: bounceShadow 1.2s infinite
      cubic-bezier(0.42, 0, 0.58, 1);

    background: black;
    filter: blur(2px);
    border-radius: 50%;
    height: 5px;
    width: 45px;

    position: absolute;
    top: 0;
  }
`;

export default ReviewLoader;