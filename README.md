Features Toggler let's you render, toggle, edit, remove and add features to your list.

All features mutation should be handled outside of Toggler.

Interface `IFeature`
```
{ 
    id: string;
    key: string;
    active: boolean;
}
```
Possible ideas for a feature: add optional fields `togglable, editable, removable`. Default value for each: true

Prop | Type | Description
--- | --- | ---
features | IFeature[] | Array of features 
onEdit? | (feature: IFeature) => void | Called when feature is changed (toggled or key changed)
onCreate? | (feature: IFeature) => void | Called when new feature is created
onDelete? | (feature: IFeature) => void | Called when feature is removed
If callback not passed in props - related features will be disabled. E.g: without `onEdit` prop, button for editing will be disabled

App has unit tests with >95% total coverage
