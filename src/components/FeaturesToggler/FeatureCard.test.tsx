import React from 'react';
import { mount } from 'enzyme';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';

import FeatureCard from './FeatureCard';

const props = {
  feature: {
    id: '1',
    key: 'Bob',
    active: false
  },
  onEdit: jest.fn(),
  onDelete: jest.fn()
};

it('Renders', () => {
  const card = mount(<FeatureCard {...props} />);
  expect(card.find(Switch).length).toBe(1);
});

it('Calls onEdit and changes text', () => {
  const newKey = 'Test text';

  const card = mount(<FeatureCard {...props} />);
  card.find(IconButton).at(2).simulate('click');
  card.find('.MuiInputBase-input.MuiInput-input').at(0).simulate('change', { target: { value: newKey } });
  card.find(IconButton).at(2).simulate('click');
  expect(props.onEdit).toHaveBeenCalledWith({ ...props.feature, key: newKey });
});

it('Calls onEdit and toggles', () => {
  const card = mount(<FeatureCard {...props} />);
  card.find('input').at(0).simulate('change');

  expect(props.onEdit).toHaveBeenCalledWith({ ...props.feature, active: true });
});

it('Calls onDelete', () => {
  const card = mount(<FeatureCard {...props} />);
  card.find(IconButton).at(1).simulate('click');
  expect(props.onDelete).toBeCalled();
});

it('Press Enter while editing', () => {
  const newKey = 'Test text';

  const card = mount(<FeatureCard {...props} />);
  card.find(IconButton).at(2).simulate('click');
  const input = card.find('.MuiInputBase-input.MuiInput-input').at(0);
  input.simulate('change', { target: { value: newKey } });
  input.simulate('keyup', { key: 'Enter' });
  expect(props.onEdit).toHaveBeenCalledWith({ ...props.feature, key: newKey });
});

it('Press Esc while editing', () => {
  const newKey = 'Test text';

  const card = mount(<FeatureCard {...props} />);
  card.find(IconButton).at(2).simulate('click');
  const input = card.find('.MuiInputBase-input.MuiInput-input').at(0);
  input.simulate('change', { target: { value: newKey } });
  input.simulate('keyup', { key: 'Escape' });
  expect(props.onEdit).toHaveBeenCalledTimes(0);
});
