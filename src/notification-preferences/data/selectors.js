export const selectNotificationPreferencesStatus = () => state => (
  state.notificationPreferences.preferences.status
);

export const selectPreferences = () => state => (
  state.notificationPreferences?.preferences?.preferences
);

export const selectCourseListStatus = () => state => (
  state.notificationPreferences.courses.status
);

export const selectCourseList = () => state => (
  state.notificationPreferences.courses.courses
);

export const selectCourse = courseId => state => (
  selectCourseList()(state).find(
    element => element.id === courseId,
  )
);

export const selectPreferenceGroupIds = () => state => (
  state.notificationPreferences.preferences.groups.map(element => element.id)
);

export const selectPreferencesOfGroup = group => state => (
  selectPreferences()(state).filter(element => (
    element.groupId === group
  ))
);

export const selectPreferenceGroup = group => state => (
  state.notificationPreferences.preferences.groups.filter(element => (
    element.id === group
  ))
);

export const selectPreferenceGroupToggleValue = group => state => (
  selectPreferenceGroup(group)(state).find((preference) => (
    preference.id === group
  )).enabled
);

export const selectPreferenceAttribute = (group, name) => state => (
  selectPreferences()(state).find((preference) => (
    preference.id === name && preference.groupId === group
  ))
);

export const selectPreferenceDisabledAttributes = (group, name) => state => (
  state?.notificationPreferences?.preferences?.notEditable?.[group]?.[name] || []
);

export const selectSelectedCourse = () => state => (
  state.notificationPreferences.preferences.selectedCourse
);
