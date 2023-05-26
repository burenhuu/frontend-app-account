import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from '@edx/frontend-platform/i18n';
import { messages } from './messages';
import ToggleSwitch from './ToggleSwitch';
import {
  selectPreferenceAttribute,
  selectPreferenceDisabledAttributes,
  selectSelectedCourse,
} from './data/selectors';
import { updatePreferenceValue } from './data/actions';
import { updatePreferenceToggle } from './data/thunks';

const NotificationPreferenceRow = ({ groupId, preferenceName }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const courseId = useSelector(selectSelectedCourse());
  const preference = useSelector(selectPreferenceAttribute(groupId, preferenceName));
  const nonEditable = useSelector(selectPreferenceDisabledAttributes(groupId, preferenceName));

  const onToggle = useCallback((checked, notificationChannel) => {
    dispatch(updatePreferenceValue(groupId, preferenceName, notificationChannel, checked));
    dispatch(updatePreferenceToggle(
      courseId,
      groupId,
      preferenceName,
      notificationChannel,
      checked,
    ));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId, preferenceName]);

  return (
    <div className="d-flex flex-row mb-3">
      <span className="col-8 px-0">
        {intl.formatMessage(messages.notificationTitle, { text: preferenceName })}
      </span>
      <span className="d-flex col-4 px-0">
        <span className="ml-0 mr-auto">
          <ToggleSwitch
            value={preference.web}
            onChange={(checked) => onToggle(checked, 'web')}
            disabled={nonEditable.includes('web')}
          />
        </span>
        <span className="mx-auto">
          <ToggleSwitch
            value={preference.email}
            onChange={(checked) => onToggle(checked, 'email')}
            disabled={nonEditable.includes('email')}
          />
        </span>
        <span className="ml-auto mr-0">
          <ToggleSwitch
            value={preference.push}
            onChange={(checked) => onToggle(checked, 'push')}
            disabled={nonEditable.includes('push')}
          />
        </span>
      </span>
    </div>
  );
};

NotificationPreferenceRow.propTypes = {
  groupId: PropTypes.string.isRequired,
  preferenceName: PropTypes.string.isRequired,
};

export default React.memo(NotificationPreferenceRow);
