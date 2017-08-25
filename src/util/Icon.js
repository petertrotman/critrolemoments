import React from 'react';
import PropTypes from 'prop-types';

function parseSvg(svg) {
  const viewBox = svg.match(/viewBox=['"]([^'"]+)/)[1];
  const paths = svg.match(/path d=['"]([^'"]+)/).slice(1);
  return { viewBox, paths };
}

const Icon = ({ size, svg, ...props }) => {
  const { viewBox, paths } = parseSvg(svg);
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      {...props}
    >
      { paths.map((path, i) =>
        <path d={path} key={i} />) // eslint-disable-line react/no-array-index-key
      }
    </svg>
  );
};

Icon.propTypes = {
  svg: PropTypes.string.isRequired,
  size: PropTypes.string,
};

Icon.defaultProps = {
  size: '1em',
};

export default Icon;
