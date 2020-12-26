import { css, FlattenSimpleInterpolation } from 'styled-components';

const globalStyle = css`
  a {
    text-decoration: none;
  }

  ${({ theme }) => {
    const { colors } = theme;
    const { green50, blue60, orange90, red80, black15 } = colors;
    return css`
      .scroll::-webkit-scrollbar-thumb {
        background-color: ${green50};
      }
      .type-movie {
        background-color: ${blue60};
      }
      .type-series {
        background-color: ${red80};
      }
      .type-episode {
        background-color: ${orange90};
      }
      .movie-detail-link {
        font-size: 1.25rem;
        text-align: center;
        color: ${green50};
        font-weight: bold;
        max-width: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        line-clamp: 3;
        -webkit-line-clamp: 3;
        span {
          line-height: 1.6;
        }
        &:focus {
          text-decoration: underline;
        }
        &:hover {
          text-shadow: ${black15} 0px -1px;
          span {
            background-color: ${black15};
          }
        }
      }
      @media (max-width: 480.95px),
        (min-width: 768px) and (max-width: 1080.95px) {
        .movie-detail-link {
          line-clamp: 2;
          -webkit-line-clamp: 2;
        }
      }
      @media (max-width: 480.95px) {
        .movie-detail-link {
          font-size: 1rem;
        }
      }
    `;
  }}
` as FlattenSimpleInterpolation;

export default globalStyle;
