import React, { ChangeEvent, MouseEvent, Component, KeyboardEvent } from 'react';

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
  onDelete: (feature?: IFeature) => (event: MouseEvent<HTMLButtonElement>) => void;
}

interface IFeatureCardState {
  editingValue: string | null;
}

class FeatureCard extends Component<IFeatureCardProps, IFeatureCardState> {
  state = {
    editingValue: null,
  };

  onFeatureToggle = (feature: IFeature) => () => {
    this.props.onEdit({
      ...feature,
      active: !feature.active
    });
  };

  onToggleEditing = (feature: IFeature, submit: boolean = false) => () => {
    const { editingValue } = this.state;

    if (!!editingValue) {
      if (submit)
        this.props.onEdit({
          ...feature,
          // Despite null check above - tslint still throws TS2322 error. 'null' is not assignable to 'string'.
          // So I added current feature key in case 'editingValue' is null (what will never happen)
          key: editingValue || feature.key
        });

      this.setState({
        editingValue: null,
      });
    } else {
      this.setState({
        editingValue: feature.key
      });
    }
  };

  onKeyEdit = (event: ChangeEvent<HTMLInputElement>) =>
    this.setState({
      editingValue: event.target.value
    });

  onKeyUp = (feature: IFeature) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.onToggleEditing(feature, true)(); // Submit editing
    }

    if (event.key === 'Escape' || event.keyCode === 27) {
      this.onToggleEditing(feature)(); // Cancel editing
    }
  };

  render = () => {
    const { editingValue } = this.state;
    const {
      feature,
      onDelete
    } = this.props;

    return (
      <Card
        key={feature.key}
        className="features-card"
        variant="outlined"
      >
        <Switch
          checked={feature.active}
          onChange={this.onFeatureToggle(feature)}
        />
        {editingValue
          ? (
            <>
              <Input
                value={editingValue}
                onChange={this.onKeyEdit}
                onKeyUp={this.onKeyUp(feature)}
                autoFocus
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
              <div className="feature-card__key">{feature.key}</div>
              <IconButton
                color="secondary"
                onClick={onDelete(feature)}
              >
                <DeleteIcon/>
              </IconButton>
              <IconButton onClick={this.onToggleEditing(feature)}>
                <EditIcon/>
              </IconButton>
            </>
          )}
      </Card>
    );
  };
}

export default FeatureCard;
