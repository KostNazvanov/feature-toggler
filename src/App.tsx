import React, { useState } from 'react';

import './App.css';
import FeaturesToggler from './components/FeaturesToggler/index';
import { IFeature } from './interfaces';

const initialFeaturesList: IFeature[] = [
  {
    id: '1213-deeeda-123',
    key: 'Name editing',
    active: true,
  },
  {
    id: 'dasawe-ggf123-4442',
    key: 'Deleting comments',
    active: false,
  }
]

function App() {
  const [featuresList, setFeaturesList] = useState<IFeature[]>(initialFeaturesList);

  const onFeatureEdit = (feature: IFeature) => {
    const newFeatureList: IFeature[] = featuresList.map((oldFeature: IFeature) => oldFeature.id === feature.id ? feature : oldFeature);
    setFeaturesList(newFeatureList);
  }

  const onFeatureCreate = (feature: IFeature) => {
    const newFeatureList: IFeature[] = [...featuresList, feature]; // Spread to avoid reference mutation
    setFeaturesList(newFeatureList);
  }

  const onFeatureDelete = (feature: IFeature) => {
    const newFeatureList: IFeature[] = featuresList.filter((oldFeature: IFeature) => oldFeature.id !== feature.id);
    setFeaturesList(newFeatureList);
  }

  return (
    <div className="App">
      <FeaturesToggler
        features={featuresList}
        onEdit={onFeatureEdit}
        onCreate={onFeatureCreate}
        onDelete={onFeatureDelete}
      />
    </div>
  );
}

export default App;
