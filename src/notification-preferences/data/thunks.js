import { camelCaseObject } from '@edx/frontend-platform';
import {
  fetchCourseListSuccess,
  fetchCourseListFetching,
  fetchCourseListFailed,
  fetchNotificationPreferenceFailed,
  fetchNotificationPreferenceFetching,
  fetchNotificationPreferenceSuccess,
} from './actions';
import {
  getCourseList,
  getCourseNotificationPreferences,
  patchGroupPreferenceToggle,
  patchPreferenceToggle,
} from './service';

const normalizePreferences = (responseData) => {
  const preferences = responseData?.notificationPreferenceConfig;

  const groupKeys = Object.keys(preferences);
  const groups = groupKeys.map((groupId) => ({
    id: groupId,
    enabled: preferences?.[groupId]?.enabled,
  }));

  const notEditable = {};
  const preferenceList = groupKeys.map(groupId => {
    const preferencesKeys = Object.keys(preferences[groupId].notificationTypes);
    const flatPreferences = preferencesKeys.map(preferenceId => (
      {
        id: preferenceId,
        groupId,
        web: preferences?.[groupId]?.notificationTypes?.[preferenceId].web,
        push: preferences?.[groupId]?.notificationTypes?.[preferenceId].push,
        email: preferences?.[groupId]?.notificationTypes?.[preferenceId].email,
        info: preferences?.[groupId]?.notificationTypes?.[preferenceId].info || '',
      }
    ));

    notEditable[groupId] = preferences?.[groupId]?.notEditable;

    return flatPreferences;
  }).flat();

  const normalizedPreferences = {
    groups,
    preferences: preferenceList,
    notEditable,
  };
  return normalizedPreferences;
};

const normalizeCourseList = (courseList) => (
  courseList.map((element) => ({
    id: element?.course?.id,
    name: element?.course?.display_name,
  }))
);

export const fetchCourseList = () => (
  async (dispatch) => {
    try {
      dispatch(fetchCourseListFetching());
      const data = await getCourseList();
      const normalizedData = normalizeCourseList(data);
      dispatch(fetchCourseListSuccess(normalizedData));
    } catch (errors) {
      dispatch(fetchCourseListFailed());
    }
  }
);

export const fetchCourseNotificationPreferences = (courseId) => (
  async (dispatch) => {
    try {
      dispatch(fetchNotificationPreferenceFetching());
      const data = await getCourseNotificationPreferences(courseId);
      const normalizedData = normalizePreferences(camelCaseObject(data));
      dispatch(fetchNotificationPreferenceSuccess(courseId, normalizedData));
    } catch (errors) {
      dispatch(fetchNotificationPreferenceFailed());
    }
  }
);

export const updateGroupPreferenceToggle = (courseId, groupId, value) => (
  async (dispatch) => {
    try {
      const data = await patchGroupPreferenceToggle(courseId, groupId, value);
      const normalizedData = normalizePreferences(camelCaseObject(data));
      dispatch(fetchNotificationPreferenceSuccess(courseId, normalizedData));
    } catch (errors) {
      dispatch(fetchNotificationPreferenceFailed());
    }
  }
);

export const updatePreferenceToggle = (
  courseId,
  groupId,
  notificationType,
  notificationChannel,
  value,
) => (
  async (dispatch) => {
    try {
      const data = await patchPreferenceToggle(
        courseId,
        groupId,
        notificationType,
        notificationChannel,
        value,
      );
      const normalizedData = normalizePreferences(camelCaseObject(data));
      dispatch(fetchNotificationPreferenceSuccess(courseId, normalizedData));
    } catch (errors) {
      dispatch(fetchNotificationPreferenceFailed());
    }
  }
);
