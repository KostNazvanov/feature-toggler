Features Toggler let's you render, toggle, edit, remove and add features to your list.

All features mutation should be handled outside of Toggler.

To start application simply run 2 commands: `yarn` and `yarn start`

#Interface `IFeature`
```
{ 
    id: string;
    key: string;
    active: boolean;
}
```
Possible ideas for a feature: add optional fields `togglable, editable, removable`. Default value for each: true

##FeatureToggler props
Prop | Type | Description
--- | --- | ---
features | IFeature[] | Array of features 
onEdit? | (feature: IFeature) => void | Called when feature is changed (toggled or key changed)
onCreate? | (feature: IFeature) => void | Called when new feature is created
onDelete? | (feature: IFeature) => void | Called when feature is removed

If callback not passed in props - related features will be disabled. E.g: without `onEdit` prop, button for editing will be disabled

App has unit tests with >95% total coverage

#Features
- Switch toggles feature between 2 state: enabled and disabled
- Delete button opens Confirmation Popover
    - Clicking outside Popover on pressing Cross is closing it
    - Submitting deleting removes feature
- Edit button enables Editing Mode
    - Autofocus on Input
    - Pressing Enter key or Submit button will submit changes
    - Pressing Escape key or Cancel button will discard changes
- At the bottom there is Feature Creator
    - Enter key into Input
    - Pressing Enter or Submit button will create new feature
    - Pressing Escape key or Cancel button will clear Inpit's value

