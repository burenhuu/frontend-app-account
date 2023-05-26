import { Form } from '@edx/paragon';
import React from 'react';
import PropTypes from 'prop-types';

const ToggleSwitch = ({ value, disabled, onChange }) => (
  <Form.Switch
    checked={value}
    disabled={disabled}
    onChange={(event) => onChange(event.target.checked)}
  />
);

ToggleSwitch.propTypes = {
  value: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

ToggleSwitch.defaultProps = {
  onChange: () => null,
  disabled: false,
};

export default React.memo(ToggleSwitch);
