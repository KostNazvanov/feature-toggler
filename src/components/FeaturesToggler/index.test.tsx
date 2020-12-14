import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';

import FeaturesToggler from './index';
import FeatureCard from './FeatureCard';

const props = {
  features: [
    {
      id: '1213-deeeda-123',
      key: 'Name editing',
      active: true
    },
    {
      id: 'dasawe-ggf123-4442',
      key: 'Deleting comments',
      active: false
    }
  ],
  onEdit: jest.fn(),
  onDelete: jest.fn(),
  onCreate: jest.fn()
};

it('Renders', () => {
  const toggler = mount(<FeaturesToggler {...props}/>);

  expect(toggler.find(Switch).length).toBe(3);
});

it('Calls onEdit and toggles', () => {
  const toggler = mount(<FeaturesToggler {...props}/>);
  const card = toggler.find(FeatureCard).at(0);
  card.find('input').at(0).simulate('change');
  expect(props.onEdit).toHaveBeenCalledWith({ ...props.features[0], active: false });
});

it('Calls onEdit and deletes', () => {
  const toggler = mount(<FeaturesToggler {...props}/>);
  const card = toggler.find(FeatureCard).at(0);
  card.find(IconButton).at(1).simulate('click');

  // There is no simple way to find element in DOM (not inside ReactWrapper) and click on it
  // @ts-ignore
  document.querySelector('.feature-card__confirmation-popover').querySelector('.MuiIconButton-colorPrimary').click()

  expect(props.onDelete).toHaveBeenCalledWith(props.features[0]);
});
