import React from 'react';
import './index.css';

import Card from '@material-ui/core/Card';
import { Translation } from 'react-i18next';

import { IFeature } from '../../interfaces';
import ConfirmationPopover from '../ConfirmationPopover';
import FeatureCard from './FeatureCard';
import FeatureCreator from './FeatureCreator';

interface IFeaturesTogglerProps {
  features: IFeature[];
  onEdit?: (feature: IFeature) => void;
  onDelete?: (feature: IFeature) => void;
  onCreate?: (feature: IFeature) => void;
}

interface IFeatureToggleState {
  deleting: {
    id: string | null,
    anchor: HTMLElement;
  };
}

class FeaturesToggler extends React.Component<IFeaturesTogglerProps, IFeatureToggleState> {
  state = {
    deleting: {
      id: null,
      anchor: document.body
    }
  };

  onDelete = (feature?: IFeature) => (event: React.MouseEvent<HTMLButtonElement>) =>
    this.setState({
      deleting: feature
        ? {
          id: feature.id,
          anchor: event.currentTarget || document.body
        } : {
          id: null,
          anchor: document.body
        }
    });

  onFeatureDelete = (id: string | null) => () => {
    const { onDelete } = this.props;
    if (!id || !onDelete) return;

    const feature = this.props.features.find(feature => feature.id === id);
    if (!feature) return;

    onDelete(feature);
  };

  getFeatureCard = (feature: IFeature) => {
    const { onDelete } = this.props;

    return (
      <FeatureCard
        key={feature.id}
        feature={feature}
        onEdit={this.props.onEdit}
        onDelete={onDelete && this.onDelete}
      />
    );
  }

  render = () => {
    const { onCreate } = this.props;
    const { deleting } = this.state;

    return (
      <Card className="features-card__wrapper">
        {this.props.features.map(this.getFeatureCard)}
        {onCreate && (
          <>
            <div className="divider"/>
            <FeatureCreator onCreate={onCreate}/>
          </>
        )}

        <ConfirmationPopover
          open={deleting.id != null}
          anchor={deleting.anchor}
          description={<Translation>{t => t('feature-card.deleting')}</Translation>}
          onSubmit={this.onFeatureDelete(deleting.id)}
          onClose={this.onDelete()}
        />
      </Card>
    );
  };
}

export default FeaturesToggler;
