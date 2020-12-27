import { css, FlattenSimpleInterpolation } from 'styled-components';

const globalStyle = css`
  a {
    text-decoration: none;
  }

  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  h1.error {
    text-align: center;
  }

  #dropdown-async-movie-searchbox-container > span:nth-child(4) {
    margin-bottom: 0px;
    text-align: right;
    &:empty {
      margin: 0px;
    }
  }

  #dropdown-async-movie-searchbox-list {
    div[data-disabled='true'],
    .option-disabled {
      cursor: default;
    }
  }

  .line-clamp {
    max-width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    word-break: break-word;
  }

  .line-clamp.search-result-text {
    line-clamp: 2;
    -webkit-line-clamp: 2;
    margin-right: 6px;
  }

  .grid-col-1-span-2 {
    grid-column: 1 / span 2;
  }

  ${({ theme }) => {
    const { colors } = theme;
    const {
      green50,
      blue60,
      orange90,
      red80,
      orange70,
      green20,
      white40,
    } = colors;
    return css`
      .scroll::-webkit-scrollbar-thumb {
        background-color: ${green50};
      }
      .card,
      .movie-detail-container {
        .type-movie {
          background-color: ${blue60};
        }
        .type-series {
          background-color: ${orange70};
        }
        .type-episode {
          background-color: ${orange90};
        }
        .type-game {
          background-color: ${red80};
        }
      }
      .movie-detail-link {
        font-size: 1.25rem;
        text-align: center;
        color: ${green50};
        font-weight: bold;
        span {
          line-height: 1.6;
        }
        &:focus {
          text-decoration: underline;
        }
        &:hover {
          text-shadow: ${green20} 0px -1px;
          span {
            background-color: ${white40};
          }
        }
      }
      @media (max-width: 210px),
        (min-width: 561px) and (max-width: 661px),
        (min-width: 768px) and (max-width: 1080.95px) {
        .line-clamp {
          line-clamp: 2;
          -webkit-line-clamp: 2;
        }
      }
      @media (max-width: 480.95px) {
        .movie-detail-link {
          font-size: 1rem;
        }
      }
      #movie-list-container.one-movie {
        @media (max-width: 900px) {
          grid-template-columns: 0.5fr;
        }
        @media (max-width: 767.95px) {
          grid-template-columns: 0.6fr;
        }
        @media (max-width: 359.95px) {
          grid-template-columns: 0.7fr;
        }
      }
    `;
  }}
` as FlattenSimpleInterpolation;

export default globalStyle;
