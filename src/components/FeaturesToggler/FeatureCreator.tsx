import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { v4 as uuid } from 'uuid';

import Card from '@material-ui/core/Card';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { IFeature } from '../../interfaces';

interface IFeatureCreatorProps {
  onCreate: (feature: IFeature) => void;
}

const FeatureCreator = (props: IFeatureCreatorProps) => {
  const { onCreate } = props;

  const [value, setValue] = useState('');

  const onValueChange = (event: ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  const onClear = () => setValue('');

  const onFeatureCreate = () => {
    if (!value) return;

    onCreate({
      id: uuid(),
      key: value,
      active: false,
    });
    onClear();
  }

  const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      onFeatureCreate();
    }

    if(event.key === "Escape" || event.keyCode === 27) {
      onClear();
    }
  }

  return (
    <Card
      className="features-card"
      variant="outlined"
    >
      <Switch
        checked={false}
        disabled={true}
      />
      <Input
        className="feature-card__key"
        value={value}
        onChange={onValueChange}
        onKeyUp={onKeyUp}
      />
      <IconButton
        color="secondary"
        onClick={onClear}
      >
        <DeleteIcon/>
      </IconButton>
      <IconButton
        color="primary"
        onClick={onFeatureCreate}
      >
        <AddIcon/>
      </IconButton>
    </Card>
  );
};

export default FeatureCreator;
