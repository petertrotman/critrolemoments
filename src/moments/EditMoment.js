import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { desktopView } from '../layout/util';

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  margin: 0.5em 0;
  padding: 0.5em;
  box-shadow: 2px 2px 8px #AAA;
  border-radius: 5px;

  ${desktopView} {
    font-size: 1.2em;
  }

`;

class EditMoment extends React.Component {
  static propTypes = {
    moment: PropTypes.shape({}).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { moment: props.moment };
  }

  handleTitleChange(e) {
    e.preventDefault();
    this.setState({ moment: { ...this.state.moment, title: e.target.value } });
  }

  render() {
    return (
      <Container>
        <form>
          <label htmlFor="form__title">Title:</label>
          <input type="text" value={this.state.moment.title} onChange={e => this.handleTitleChange(e)} />
        </form>
      </Container>
    );
  }
}

export default EditMoment;
