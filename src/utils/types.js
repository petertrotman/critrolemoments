import PropTypes from 'prop-types';

export const momentType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  starCount: PropTypes.number.isRequired,
  starredBy: PropTypes.shape({}),
  episode: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  timestamp: PropTypes.number,
  end: PropTypes.string,
  user: PropTypes.string,
});
