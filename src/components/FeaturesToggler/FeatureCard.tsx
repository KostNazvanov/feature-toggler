import React, { ChangeEvent } from 'react';

import Card from '@material-ui/core/Card';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';

import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IFeature } from '../../interfaces';

interface IFeatureCardProps {
  feature: IFeature,
  onEdit: (feature: IFeature) => void;
  onDelete: (feature?: IFeature) => (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface IFeatureCardState {
  editing: {
    id: string | null;
    value: string;
  }
}

class FeatureCard extends React.Component<IFeatureCardProps, IFeatureCardState> {
  state = {
    editing: {
      id: null,
      value: '',
    }
  }

  onFeatureToggle = (feature: IFeature) => () => {
    this.props.onEdit({
      ...feature,
      active: !feature.active
    });
  };

  onToggleEditing = (feature: IFeature, submit: boolean = false) => () => {
    const { editing: { id, value } } = this.state;

    if (id) {
      if (submit) {
        this.props.onEdit({
          ...feature,
          key: value
        });
      }

      this.setState({
        editing: {
          id: null,
          value: ''
        }
      });
    } else
      this.setState({
        editing: {
          id: feature.id,
          value: feature.key
        }
      });
  };

  onFeatureKeyEdit = (event: ChangeEvent<HTMLInputElement>) =>
    this.setState({
      editing: {
        ...this.state.editing,
        value: event.target.value
      }
    });

  render = () => {
    const { editing } = this.state;
    const {
      feature,
      onDelete,
    } = this.props;

    return (
      <Card
        key={feature.key}
        variant="outlined"
      >
        <Switch
          checked={feature.active}
          onChange={this.onFeatureToggle(feature)}
        />
        {editing.id === feature.id
          ? (
            <>
              <Input
                value={editing.value}
                onChange={this.onFeatureKeyEdit}
              />
              <IconButton
                color="secondary"
                onClick={this.onToggleEditing(feature)}
              >
                <ClearIcon/>
              </IconButton>
              <IconButton
                color="primary"
                onClick={this.onToggleEditing(feature, true)}
              >
                <CheckIcon/>
              </IconButton>
            </>
          ) : (
            <>
              {feature.key}
              <IconButton onClick={this.onToggleEditing(feature)}>
                <EditIcon/>
              </IconButton>
              <IconButton
                color="secondary"
                onClick={onDelete(feature)}
              >
                <DeleteIcon/>
              </IconButton>
            </>
          )}
      </Card>
    );
  }
}

export default FeatureCard;
