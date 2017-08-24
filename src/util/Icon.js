import React from 'react';
// import styled from 'styled-components';
import PropTypes from 'prop-types';

// const Icon = styled.i`
//   background: ${props => `url(${props.url})`};
//   width: ${props => props.width || '1em'};
//   height: ${props => props.height || '1em'};
//   display: inline-block;
// `;

// const Icon = styled.object
//   .attrs({
//     data: props => props.data,
//     type: 'image/svg+xml',
//   })`
//   display: inline-block;
//   width: ${props => props.width || '1em'};
//   height: ${props => props.height || '1em'};

//   stroke: "red";
//   fill: "red";
// `;

// <svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>


function parseSvg(svg) {
  const viewBox = svg.match(/viewBox=['"]([^'"]+)/)[1];
  const path = svg.match(/path d=['"]([^'"]+)/)[1];
  return { viewBox, path };
}

const Icon = ({ size, svg, ...props }) => {
  const { viewBox, path } = parseSvg(svg);
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      {...props}
    >
      <path d={path} />
    </svg>
  );
};

Icon.propTypes = {
  svg: PropTypes.string.isRequired,
  size: PropTypes.number,
};

Icon.defaultProps = {
  size: 16,
};

export default Icon;
