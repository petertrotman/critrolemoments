import { keyframes } from 'styled-components';

const parts = {
  heart: { id: 'heart' },
  right: { id: 'right' },
  bottom: { id: 'bottom' },
  middle: { id: 'middle' },
  middleRight: { id: 'middle-right' },
  bottomRight: { id: 'bottom-right' },
  bottomLeft: { id: 'bottom-left' },
  middleLeft: { id: 'middle-left' },
  topRight: { id: 'top-right' },
  topLeft: { id: 'top-left' },
  left: { id: 'left' },
};

const centroids = {
  heart: { x: 448.826989254, y: 476.617423038 },
  right: { x: 802.33371637, y: 552.020451757 },
  bottom: { x: 456.231825021, y: 760.348389626 },
  middle: { x: 446.179410756, y: 494.022474111 },
  middleRight: { x: 665.294729977, y: 354.961230364 },
  bottomRight: { x: 676.919188622, y: 801.40819089 },
  bottomLeft: { x: 207.105909641, y: 804.410244505 },
  middleLeft: { x: 207.425259689, y: 368.520710821 },
  topRight: { x: 561.137142082, y: 140.964011911 },
  topLeft: { x: 287.617497271, y: 149.080635832 },
  left: { x: 58.4741868573, y: 558.508734 },
};

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const wiggle = keyframes`
  from, 50%, to {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(5deg);
  }

  75% {
    transform: rotate(-5deg);
  }
`;

const beat = keyframes`
  from, 50%, to {
    transform: scale(1);
    opacity: 0.5;
  }

  25% {
    transform: scale(2);
    opacity: 1;
  }
`;

const flash = keyframes`
  from, 25%, 75%, to {
    opacity: 0;
  }

  33%, 66% {
    opacity: 1;
  }
`;

export const rotateHeart = `
  path#heart {
    transform-origin: ${centroids.heart.x}px ${centroids.heart.y}px;
    animation: ${rotate360} 2s linear infinite;
  }
`;

export const wiggleHeart = `
  path#heart {
    transform-origin: ${centroids.heart.x}px ${centroids.heart.y}px;
    animation: ${wiggle} 0.75s linear infinite;
  }
`;

export const wiggleAll = Object.keys(parts)
  .reduce((acc, part) => acc.concat(`
    path#${parts[part].id} {
      transform-origin: ${centroids[part].x}px ${centroids[part].y}px;
      animation: ${wiggle} 0.75s ease-in-out infinite;
      animation-delay: ${Math.random() * 3}s;
    }
  `), '');

export const heartBeat = `
  path#heart {
    z-index: 1;
    transform-origin: ${centroids.heart.x}px ${centroids.heart.y}px;
    animation: ${beat} 1.5s ease-in infinite;
  }
`;

export const flashAll = Object.keys(parts)
  .filter(key => !['heart', 'middle'].includes(key))
  // .filter(key => key !== 'middle')
  .reduce((acc, part) => {
    const delay = 0.5 + (Math.random() * 4);
    return acc.concat(`
      path#${parts[part].id} {
        transform-origin: ${centroids[part].x}px ${centroids[part].y}px;
        animation: ${flash} ${delay}s linear infinite;
      }
    `);
  }, '');
