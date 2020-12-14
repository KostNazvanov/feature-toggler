import React from 'react';
import { mount } from 'enzyme';
import App from './App';
import FeatureCreator from './components/FeaturesToggler/FeatureCreator';
import FeatureCard from './components/FeaturesToggler/FeatureCard';
import IconButton from '@material-ui/core/IconButton';

it('App renders', () => {
  const app = mount(<App/>);
  expect(app.find(FeatureCreator).length).toBe(1);
  expect(app.find(FeatureCard).length > 1).toBeTruthy();
});

it('Calls onEdit and toggles', () => {
  const app = mount(<App/>);
  const card = app.find(FeatureCard).at(1);
  card.find('input').at(0).simulate('change');
  expect(card.find('.MuiSwitch-colorSecondary').at(0).hasClass('Mui-checked')).toBeFalsy();
});

it('Calls onDelete', () => {
  const app = mount(<App/>);
  const card = app.find(FeatureCard).at(1);
  card.find(IconButton).at(1).simulate('click');

  // There is no simple way to find element in DOM (not inside ReactWrapper) and click on it
  // @ts-ignore
  document.querySelector('.feature-card__confirmation-popover').querySelector('.MuiIconButton-colorPrimary').click()

  app.update();
  expect(app.find(FeatureCard).length).toBe(1);
});

it('Creates feature', () => {
  const app = mount(<App/>);
  const card = app.find(FeatureCreator).at(0);

  const value = 'New feature testing';
  card.find('.MuiInputBase-input.MuiInput-input').at(0).simulate('change', { target: { value } });
  card.find(IconButton).at(2).simulate('click');

  app.update();
  expect(app.find(FeatureCard).at(2).find('.feature-card__key').at(0).text()).toBe(value);
});
