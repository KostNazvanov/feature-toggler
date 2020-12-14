import React from 'react';
import { mount } from 'enzyme';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';

import FeatureCard from './FeatureCard';

it('Renders', () => {
  const props = {
    feature: {
      id: '1',
      key: 'Bob',
      active: false
    }
  };
  const card = mount(<FeatureCard {...props} />);
  expect(card.find(Switch).length).toBe(1);
});

it('Calls onEdit and changes text', () => {
  const props = {
    feature: {
      id: '1',
      key: 'Bob',
      active: false
    },
    onEdit: jest.fn()
  };
  const newKey = 'Test text';

  const card = mount(<FeatureCard {...props} />);
  card.find(IconButton).at(2).simulate('click');
  card.find('.MuiInputBase-input.MuiInput-input').at(0).simulate('change', { target: { value: newKey } });
  card.find(IconButton).at(2).simulate('click');
  expect(props.onEdit).toHaveBeenCalledWith({ ...props.feature, key: newKey });
});

// it('Calls onEdit and toggles', () => {
//   const props = {
//     feature: {
//       id: '1',
//       key: 'Bob',
//       active: false
//     },
//     onEdit: jest.fn()
//   };
//
//   const card = mount(<FeatureCard {...props} />);
//   console.log(card.find('.MuiSwitch-input').length)
//   card.find('.MuiSwitch-input').at(0).simulate('click');
//
//   // expect(card.find('.Mui-checked').length).toBe(1);
//   expect(props.onEdit).toHaveBeenCalledWith({ ...props.feature, active: true });
// });

it('Calls onDelete', () => {
  const props = {
    feature: {
      id: '1',
      key: 'Bob',
      active: false
    },
    onDelete: jest.fn()
  };
  const card = mount(<FeatureCard {...props} />);
  card.find(IconButton).at(1).simulate('click');
  expect(props.onDelete).toBeCalled();
});
