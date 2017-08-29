import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import HeartSvg from 'feather-icons/dist/icons/heart.svg';

import { momentType } from './util';

const StyledDiv = styled.div`
  width: 80%;
  font-size: 2em;
  height: ${props => props.theme.momentSummaryHeight}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  > * {
    margin: 0 1em;
    padding: 0;
  }

  svg {
    height: ${props => props.theme.momentSummaryHeight * 0.8}px;
    width: ${props => props.theme.momentSummaryHeight * 0.8}px;

    &:hover {
      fill: ${props => props.theme.primary};
    }
  }
`;

class Moment extends React.Component {
  static propTypes = {
    moment: momentType.isRequired,
    expanded: PropTypes.bool,
  }

  static defaultProps = {
    expanded: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      expanded: props.expanded,
    };
  }

  render() {
    return (
      <StyledDiv>
        <HeartSvg />
        Moment
      </StyledDiv>
    );
  }
}

export default Moment;
