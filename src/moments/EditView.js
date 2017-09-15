import 'rc-time-picker/assets/index.css';

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { adjustHue } from 'polished';
import { connect } from 'react-redux';
import Select, { Creatable } from 'react-select';
import TimePicker from 'rc-time-picker';
import { push as pushAction } from 'react-router-redux';

import Loading from '../loading/Loading';
import Player from '../player/Player';

import {
  updateMoment as updateMomentAction,
  createMoment as createMomentAction,
  deleteMoment as deleteMomentAction,
} from './actions';

import { releaseSwal, deleteSwal } from '../swal/swal';
import { desktopView } from '../layout/util';
import {
  timestampToSeconds,
  timestampToMoment,
} from '../utils/text';
import { buttonHover } from '../utils/styles';

const Aux = ({ children }) => children;
const leftMargin = '4em';

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

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  > button {
    all: unset;
    color: #fff;
    margin: 0.5em 0;
    padding: 0.5em;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;

    ${buttonHover}
  }

  > button.form__button__save {
    background: linear-gradient(0deg,
      ${props => adjustHue(6, props.theme.secondary)},
      ${props => adjustHue(-6, props.theme.secondary)});
  }

  > button.form__button__cancel {
    background: linear-gradient(0deg, ${adjustHue(6, '#AAA')}, ${adjustHue(-6, '#AAA')});
  }

  > button.form__button__release {
    background: linear-gradient(0deg, ${adjustHue(12, 'red')}, ${adjustHue(0, 'red')});
  }

  > button.form__button__delete {
    background: linear-gradient(0deg, ${adjustHue(12, 'crimson')}, ${adjustHue(0, 'crimson')});
  }
`;

const StyledLoading = styled(Loading)`
  max-width: 50%;
`;

const BasicFieldset = styled.fieldset`
  border: none;

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.5em 0;

    > span:first-child {
      width: ${leftMargin};
    }

    > input[type='text'] {
      color: rgb(51, 51, 51);
      font-family: inherit;
      font-size: inherit;
      line-height: 34px;
      padding-left: 10px;
      width: calc(100% - ${leftMargin});
      box-sizing: border-box;
      border-radius: 4px;
      border-color: rgb(204, 204, 204);
      border-width: 1px;
      border-style: solid;

      &:invalid {
        box-shadow: 0 0 5px 1px red;
      }
    }

    > textarea {
      color: rgb(51, 51, 51);
      font-family: inherit;
      font-size: inherit;
      height: 10em;
      padding-left: 10px;
      width: calc(100% - ${leftMargin});
      box-sizing: border-box;
      border-radius: 4px;
      border-width: 1px;
      border-style: solid;

      &:invalid {
        box-shadow: 0 0 5px 1px red;
      }
    }
  }

  > aside {
    margin-left: ${leftMargin};
  }
`;

const PlayerFieldset = BasicFieldset;

const StyledSelect = styled(Select)`
  display: inline-block;
  width: calc(100% - ${leftMargin});
`;

const StyledCreatable = styled(Creatable)`
  display: inline-block;
  width: calc(100% - ${leftMargin});
`;

const StyledTimePicker = styled(TimePicker)`
  font-family: inherit;
  font-size: inherit;
  display: inline-block;
  width: calc(100% - ${leftMargin});
  line-height: 34px;

  > input {
    color: rgb(51, 51, 51);
    padding: 0;
    padding-left: 10px;
    line-height: 34px;
    height: auto;
    font-family: inherit;
    font-size: inherit;
  }
`;

class EditView extends React.Component {
  static propTypes = {
    moment: PropTypes.shape({
      user: PropTypes.string,
      key: PropTypes.string,
    }),
    episodes: PropTypes.shape({
      byId: PropTypes.shape({}),
      order: PropTypes.arrayOf(PropTypes.string),
      hasFetched: PropTypes.bool,
    }).isRequired,
    push: PropTypes.func.isRequired,
    updateMoment: PropTypes.func.isRequired,
    createMoment: PropTypes.func.isRequired,
    deleteMoment: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    user: PropTypes.string,
  }

  static defaultProps = {
    user: null,
    moment: {
      title: '',
      description: '',
      episode: null,
      start: '00:00:00',
      end: null,
      tags: {},
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      moment: props.moment,
      isValid: true,
    };
  }

  get isReady() {
    return this.props.episodes.hasFetched;
  }

  get isOwnedMoment() {
    return this.props.moment.user === this.props.user;
  }

  get isNewMoment() {
    return this.props.moment.key == null;
  }

  handleTitleChange(e) {
    e.preventDefault();
    this.setState({ moment: { ...this.state.moment, title: e.target.value } });
  }

  handleEpisodeSelect(option) {
    this.setState({ moment: { ...this.state.moment, episode: option && option.value } });
  }

  handleStartChange(val) {
    this.setState({ moment: { ...this.state.moment, start: val && val.format('HH:mm:ss') } });
  }

  handleEndChange(val) {
    this.setState({ moment: { ...this.state.moment, end: val && val.format('HH:mm:ss') } });
  }

  handleDescriptionChange(e) {
    e.preventDefault();
    this.setState({ moment: { ...this.state.moment, description: e.target.value } });
  }

  handleTagsChange(val) {
    this.setState({ moment: {
      ...this.state.moment,
      tags: val.reduce((acc, tag) => ({ ...acc, [tag.value]: true }), {}),
    } });
  }

  handleSaveClick(e) {
    e.preventDefault();
    const isValid = this.form.checkValidity();
    this.setState({ isValid });
    if (!isValid) return null;

    if (this.isNewMoment) {
      return this.props.createMoment(this.state.moment)
        .then(key => this.props.push(`/moments/${key}`));
    }
    return this.props.updateMoment(this.props.moment.key, this.state.moment)
      .then(() => this.props.push(`/moments/${this.props.moment.key}`));
  }

  handleCancelClick(e) {
    e.preventDefault();
    if (this.props.moment.key) {
      this.props.push(`/moments/${this.props.moment.key}`);
    } else {
      this.props.push('/moments');
    }
  }

  handleReleaseClick(e) {
    e.preventDefault();
    const key = this.props.moment.key;
    const releaseFn = () => this.props.updateMoment(key, { ...this.props.moment, user: '' });
    releaseSwal(releaseFn)
      .then(() => this.props.push(`/moments/${key}`))
      .catch(() => {});
  }

  handleDeleteClick(e) {
    e.preventDefault();
    const deleteFn = () => this.props.deleteMoment(this.props.moment.key);
    deleteSwal(deleteFn)
      .then(() => this.props.push('/moments'))
      .catch(() => {});
  }

  render() {
    if (!this.isReady) {
      return (
        <Container>
          <StyledLoading />
        </Container>
      );
    }

    if ((!this.isOwnedMoment && !this.isNewMoment) || !this.props.user) {
      return (
        <Container>
          <h2>Forbidden</h2>
          <p>You are not permitted to edit this moment as you are not the owner.</p>
        </Container>
      );
    }

    return (
      <Container>
        <form ref={(el) => { this.form = el; }}>
          <BasicFieldset>
            <label htmlFor="form__title">
              <span>Title:</span>
              <input
                type="text"
                id="form__title"
                value={this.state.moment.title}
                onChange={e => this.handleTitleChange(e)}
                required
              />
            </label>
            <label htmlFor="form__episode">
              <span>Episode:</span>
              <StyledSelect
                name="form__episode"
                placeholder="Select Episode"
                value={this.state.moment.episode && {
                  value: this.state.moment.episode,
                  label: this.props.episodes.byId[this.state.moment.episode].snippet.title,
                }}
                options={([].concat(this.props.episodes.order)) // .reverse()
                  .map(key => ({
                    value: key,
                    label: this.props.episodes.byId[key].snippet.title,
                  }))
                }
                onChange={newOption => this.handleEpisodeSelect(newOption)}
                required
              />
            </label>
          </BasicFieldset>

          { this.state.moment.episode && (
            <Aux>
              <PlayerFieldset>
                <Player
                  videoId={this.state.moment.episode}
                  opts={{
                    playerVars: {
                      start: timestampToSeconds(this.state.moment.start),
                      end: timestampToSeconds(this.state.moment.end),
                      autoplay: 0,
                      modestbranding: true,
                      showinfo: 0,
                    },
                  }}
                />
                <label htmlFor="form__start">
                  <span>Start:</span>
                  <StyledTimePicker
                    id="form__start"
                    value={timestampToMoment(this.state.moment.start)}
                    placeholder="Required"
                    onChange={val => this.handleStartChange(val)}
                    disabledHours={() => [...Array(18)].map((x, i) => i + 6)}
                    hideDisabledOptions
                    required
                  />
                </label>
                <label htmlFor="form__end">
                  <span>End:</span>
                  <StyledTimePicker
                    id="form__end"
                    value={timestampToMoment(this.state.moment.end)}
                    placeholder="Optional"
                    onChange={val => this.handleEndChange(val)}
                    disabledHours={() => [...Array(18)].map((x, i) => i + 6)}
                    hideDisabledOptions
                  />
                </label>
              </PlayerFieldset>

              <BasicFieldset>
                <label htmlFor="form__description">
                  <span>Details:</span>
                  <textarea
                    id="form__description"
                    value={this.state.moment.description}
                    onChange={e => this.handleDescriptionChange(e)}
                    required
                  />
                </label>
                <aside><small>
                  <p>Please include any details you think are relevant to this moment, such as:</p>
                  <ul>
                    <li>Why you like it</li>
                    <li>Context for this moment</li>
                    <li>Things to look out for</li>
                    <li>What happens</li>
                  </ul>
                  <p>This all adds to keep the content rich for other users!</p>
                </small></aside>
                <label htmlFor="form__tags">
                  <span>Tags:</span>
                  <StyledCreatable
                    multi
                    id="form__tags"
                    value={this.state.moment.tags &&
                        Object
                          .keys(this.state.moment.tags)
                          .map(key => ({ value: key, label: key }))
                    }
                    onChange={val => this.handleTagsChange(val)}
                  />
                </label>
                <aside><small>
                  <p>
                    Tags are a future feature that will allow people to search by
                    certain curated tags.
                  </p>
                  <p>
                    Please just enter whatever tags you think could be assigned to this moment.
                  </p>
                </small></aside>
              </BasicFieldset>
            </Aux>
          ) }

          <ButtonsContainer>
            <button
              className="form__button__save"
              onClick={e => this.handleSaveClick(e)}
              disabled={this.props.isFetching}
            >
              { this.isNewMoment ? 'Create Moment' : 'Save Changes' }
            </button>
            { !this.state.isValid &&
              <span>Please check the form for errors or missing details.</span> }
            <button
              className="form__button__cancel"
              onClick={e => this.handleCancelClick(e)}
              disabled={this.props.isFetching}
            >
              Cancel
            </button>
            { this.isOwnedMoment && (
              <Aux>
                <button
                  className="form__button__release"
                  onClick={e => this.handleReleaseClick(e)}
                  disabled={this.props.isFetching}
                >
                  Release Moment
                </button>
                <button
                  className="form__button__delete"
                  onClick={e => this.handleDeleteClick(e)}
                  disabled={this.props.isFetching}
                >
                  Delete Moment
                </button>
              </Aux>
            ) }
          </ButtonsContainer>
        </form>
      </Container>
    );
  }
}

export default connect(
  store => ({
    isFetching: store.moments.isFetching,
    episodes: store.episodes,
    user: store.auth.user && store.auth.user.uid,
  }),
  dispatch => ({
    push: path => dispatch(pushAction(path)),
    updateMoment: (key, vals) => dispatch(updateMomentAction(key, vals)),
    createMoment: moment => dispatch(createMomentAction(moment)),
    deleteMoment: key => dispatch(deleteMomentAction(key)),
  }),
)(EditView);
