import React from 'react';

import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

import { IFeature } from '../../interfaces';
import ConfirmationPopover from '../ConfirmationPopover';
import FeatureCard from './FeatureCard';
import FeatureCreator from './FeatureCreator';

interface IFeaturesTogglerProps {
  features: IFeature[];
  onEdit: (feature: IFeature) => void;
  onDelete: (feature: IFeature) => void;
  onCreate: (feature: IFeature) => void;
}

interface IFeatureToggleState {
  deleting: {
    id: string | null,
    anchor: HTMLButtonElement | null;
  };
}

class FeaturesToggler extends React.Component<IFeaturesTogglerProps, IFeatureToggleState> {
  state = {
    deleting: {
      id: null,
      anchor: null
    }
  };

  onDelete = (feature?: IFeature) => (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({
      deleting: feature
        ? {
          id: feature.id,
          anchor: event.currentTarget
        } : {
          id: null,
          anchor: null
        }
    });
  }

  onFeatureDelete = (id: string | null) => () => {
    if (!id) return;

    const feature = this.props.features.find(feature => feature.id === id);
    if (!feature) return;

    this.props.onDelete(feature);
  }

  getFeatureCard = (feature: IFeature) => {
    return (
      <FeatureCard
        key={feature.id}
        feature={feature}
        onEdit={this.props.onEdit}
        onDelete={this.onDelete}
      />
    )
  };

  render = () => {
    const { deleting } = this.state;

    return (
      <Card>
        {this.props.features.map(this.getFeatureCard)}
        <FeatureCreator onCreate={this.props.onCreate}/>
        <ConfirmationPopover
          open={deleting.id != null}
          anchor={deleting.anchor}
          description="Delete this feature?"
          onSubmit={this.onFeatureDelete(deleting.id)}
          onClose={this.onDelete()}
        />
      </Card>
    );
  };
}

export default FeaturesToggler;
