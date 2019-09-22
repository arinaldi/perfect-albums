import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

import { sortByAlbum } from '../../utils';
import { ICONS } from '../../constants';
import { Context } from '../Provider';

const style = {
  cursor: 'pointer',
  verticalAlign: 'middle',
};

const DateCol = ({ data, date, handleDeleteOpen }) => {
  const { state } = useContext(Context);

  return (
    <Col xs={12} md={6} lg={4}>
      <h5>{date}</h5>
      <ul data-testid={`list-${date}`}>
        {data.sort(sortByAlbum).map((release, index) => (
          <li key={index}>
            <span>
              {release.artist} &ndash; {release.title}
            </span>
            {state.isAuthenticated && (
              <span style={style} onClick={() => handleDeleteOpen(release)}>
                &nbsp;&nbsp;{ICONS.X}
              </span>
            )}
          </li>
        ))}
      </ul>
    </Col>
  );
};

DateCol.propTypes = {
  data: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
  handleDeleteOpen: PropTypes.func.isRequired,
};

export default DateCol;
