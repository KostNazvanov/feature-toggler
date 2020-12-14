import React from 'react';
import { mount } from 'enzyme';
import ConfirmationPopover from './ConfirmationPopover';
import { IconButton } from '@material-ui/core';

const props = {
  open: true,
  description: 'Test description',
  anchor: document.body,
  onSubmit: jest.fn(),
  onClose: jest.fn(),
}

it('Renders', () => {
  const popover = mount(<ConfirmationPopover {...props}/>);
  expect(popover.find('.feature-card__confirmation-popover__description').at(0).text()).toBe(props.description);
});

it('Close', () => {
  const popover = mount(<ConfirmationPopover {...props}/>);
  popover.find(IconButton).at(0).simulate('click');
  expect(props.onClose).toBeCalled();
});

it('Submit', () => {
  const popover = mount(<ConfirmationPopover {...props}/>);
  popover.find(IconButton).at(1).simulate('click');
  expect(props.onClose).toBeCalled();
  expect(props.onSubmit).toBeCalled();
});
