heroModules.push({
  template: 'marsTime',
  order: 0
});

var showMarsTime = {
  propertyName: 'showMarsTime',
  propertySchema: {
    type: Boolean,
    optional: true,
    label: 'Mars Time',
    autoform: {
      group: 'extras',
      instructions: 'Show mars time on homepage.'
    }
  }
}
addToSettingsSchema.push(showMarsTime);