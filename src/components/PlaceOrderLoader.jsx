import React from "react";
import styled from "styled-components";

// const PlaceOrder_Loader = () => {
//   return (
//     <StyledWrapper>
//       <div className="spinner">
//         <div></div>
//         <div></div>
//         <div></div>
//         <div></div>
//         <div></div>
//         <div></div>
//       </div>
//     </StyledWrapper>
//   );
// };

// const StyledWrapper = styled.div`
//   .spinner {
//     width: 24px;
//     height: 24px;
//     --clr: rgb(247, 197, 159);
//     --clr-alpha: rgba(247, 197, 159, 0.1);
//     animation: spinner 1.6s infinite ease;
//     transform-style: preserve-3d;
//     position: relative;
//   }

//   .spinner > div {
//     background-color: var(--clr-alpha);
//     height: 100%;
//     position: absolute;
//     width: 100%;
//     border: 2px solid var(--clr);
//   }

//   .spinner div:nth-of-type(1) {
//     transform: translateZ(-12px) rotateY(180deg);
//   }

//   .spinner div:nth-of-type(2) {
//     transform: rotateY(-270deg) translateX(50%);
//     transform-origin: top right;
//   }

//   .spinner div:nth-of-type(3) {
//     transform: rotateY(270deg) translateX(-50%);
//     transform-origin: center left;
//   }

//   .spinner div:nth-of-type(4) {
//     transform: rotateX(90deg) translateY(-50%);
//     transform-origin: top center;
//   }

//   .spinner div:nth-of-type(5) {
//     transform: rotateX(-90deg) translateY(50%);
//     transform-origin: bottom center;
//   }

//   .spinner div:nth-of-type(6) {
//     transform: translateZ(12px);
//   }

//   @keyframes spinner {
//     0% {
//       transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
//     }

//     50% {
//       transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
//     }

//     100% {
//       transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
//     }
//   }
// `;


const PlaceOrder_Loader = () => {
  return (
    <StyledWrapper>
      <div className="truckLoader">
        <svg
          className="truck"
          viewBox="0 0 120 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="truckBody">
            <rect
              x="8"
              y="12"
              width="67"
              height="32"
              rx="4"
              fill="#f8fafc"
            />

            <rect
              x="12"
              y="16"
              width="59"
              height="24"
              rx="2"
              fill="#e2e8f0"
            />

            <path
              d="M75 22H91L108 34V44H75V22Z"
              fill="#2563eb"
            />

            <path
              d="M82 25H90L100 33H82V25Z"
              fill="#bae6fd"
            />

            <path
              d="M75 22H91L108 34V44H75"
              fill="none"
              stroke="#1d4ed8"
              strokeWidth="2"
            />

            <rect
              x="8"
              y="40"
              width="100"
              height="5"
              rx="2"
              fill="#1e293b"
            />

            <rect
              x="15"
              y="18"
              width="45"
              height="2"
              rx="1"
              fill="#cbd5e1"
            />

            <rect
              x="15"
              y="25"
              width="35"
              height="2"
              rx="1"
              fill="#cbd5e1"
            />

            <rect
              x="15"
              y="32"
              width="25"
              height="2"
              rx="1"
              fill="#cbd5e1"
            />

            <rect
              x="101"
              y="35"
              width="7"
              height="5"
              rx="1"
              fill="#fbbf24"
            />
          </g>

          <g className="wheel wheelOne">
            <circle cx="28" cy="45" r="8" fill="#0f172a" />
            <circle cx="28" cy="45" r="4" fill="#64748b" />
            <circle cx="28" cy="45" r="1.5" fill="#e2e8f0" />
          </g>

          <g className="wheel wheelTwo">
            <circle cx="88" cy="45" r="8" fill="#0f172a" />
            <circle cx="88" cy="45" r="4" fill="#64748b" />
            <circle cx="88" cy="45" r="1.5" fill="#e2e8f0" />
          </g>

          <g className="motionLines">
            <rect x="0" y="17" width="12" height="2" rx="1" />
            <rect x="3" y="25" width="7" height="2" rx="1" />
            <rect x="0" y="33" width="15" height="2" rx="1" />
          </g>

          <g className="road">
            <rect x="0" y="53" width="18" height="2" rx="1" />
            <rect x="25" y="53" width="12" height="2" rx="1" />
            <rect x="44" y="53" width="18" height="2" rx="1" />
            <rect x="69" y="53" width="12" height="2" rx="1" />
            <rect x="88" y="53" width="18" height="2" rx="1" />
          </g>
        </svg>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .truckLoader {
    width: 72px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .truck {
    width: 70px;
    height: 34px;
    overflow: visible;
  }

  .truckBody {
    transform-origin: center bottom;
    animation: truckBounce 0.45s ease-in-out infinite;
  }

  .wheel {
    transform-box: fill-box;
    transform-origin: center;
    animation: wheelSpin 0.35s linear infinite;
  }

  .motionLines rect {
    fill: #38bdf8;
    animation: motion 0.7s linear infinite;
  }

  .motionLines rect:nth-child(2) {
    animation-delay: 0.15s;
  }

  .motionLines rect:nth-child(3) {
    animation-delay: 0.3s;
  }

  .road rect {
    fill: #94a3b8;
    animation: roadMove 0.55s linear infinite;
  }

  .road rect:nth-child(2) {
    animation-delay: 0.1s;
  }

  .road rect:nth-child(3) {
    animation-delay: 0.2s;
  }

  .road rect:nth-child(4) {
    animation-delay: 0.3s;
  }

  .road rect:nth-child(5) {
    animation-delay: 0.4s;
  }

  @keyframes truckBounce {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(1px);
    }
  }

  @keyframes wheelSpin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  @keyframes motion {
    0% {
      transform: translateX(18px);
      opacity: 0;
    }

    20% {
      opacity: 1;
    }

    100% {
      transform: translateX(-10px);
      opacity: 0;
    }
  }

  @keyframes roadMove {
    0% {
      transform: translateX(35px);
    }

    100% {
      transform: translateX(-35px);
    }
  }
`;


export default PlaceOrder_Loader;