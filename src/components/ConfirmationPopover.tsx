import React, { MouseEvent } from 'react';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

interface IProps {
  open: boolean;
  description: string | JSX.Element;
  anchor?: HTMLElement | null,
  onSubmit: (event: MouseEvent<HTMLButtonElement>) => void;
  onClose: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ConfirmationPopover = (props: IProps) => {
  const {
    open,
    anchor,
    description,
    onSubmit,
    onClose
  } = props;

  const onSubmitClick = (event: MouseEvent<HTMLButtonElement>) => {
    onSubmit(event);
    onClose(event);
  };

  return (
    <Popover
      open={open}
      anchorEl={anchor}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center'
      }}
    >
      <div className="feature-card__confirmation-popover">
        {description}
        <IconButton
          color="secondary"
          onClick={onClose}
        >
          <ClearIcon/>
        </IconButton>
        <IconButton
          color="primary"
          onClick={onSubmitClick}
        >
          <CheckIcon/>
        </IconButton>
      </div>
    </Popover>
  );
};

export default ConfirmationPopover;
