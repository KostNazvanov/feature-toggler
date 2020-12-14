import React from 'react';
import { mount } from 'enzyme';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';

import FeatureCreator from './FeatureCreator';

it('Renders', () => {
  const onCreate = jest.fn();
  const card = mount(<FeatureCreator onCreate={onCreate}/>);
  expect(card.find(Switch).length).toBe(1);
});

it('Creates feature', () => {
  const feature = {
    key: 'Bob',
    active: false
  };
  const onCreate = jest.fn();

  const card = mount(<FeatureCreator onCreate={onCreate}/>);
  card.find('.MuiInputBase-input.MuiInput-input').at(0).simulate('change', { target: { value: feature.key } });
  card.find(IconButton).at(2).simulate('click');
  expect(onCreate).toHaveBeenCalledWith(expect.objectContaining(feature));
});

it('Ignores empty value', () => {
  const onCreate = jest.fn();

  const card = mount(<FeatureCreator onCreate={onCreate}/>);
  card.find(IconButton).at(2).simulate('click');
  expect(onCreate).toBeCalledTimes(0);
});

it('Press Enter while editing', () => {
  const feature = {
    key: 'Bob',
    active: false
  };
  const onCreate = jest.fn();

  const card = mount(<FeatureCreator onCreate={onCreate}/>);
  const input = card.find('.MuiInputBase-input.MuiInput-input').at(0);
  input.simulate('change', { target: { value: feature.key } });
  input.simulate('keyup', { key: 'Enter' });
  expect(onCreate).toHaveBeenCalledWith(expect.objectContaining(feature));
});

it('Press Esc while editing', () => {
  const feature = {
    key: 'Bob',
    active: false
  };
  const onCreate = jest.fn();

  const card = mount(<FeatureCreator onCreate={onCreate}/>);
  const input = card.find('.MuiInputBase-input.MuiInput-input').at(0);
  input.simulate('change', { target: { value: feature.key } });
  input.simulate('keyup', { key: 'Escape' });
  expect(onCreate).toHaveBeenCalledTimes(0);
});
