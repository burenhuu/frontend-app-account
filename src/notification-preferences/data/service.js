import { getConfig, snakeCaseObject } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import snakeCase from 'lodash.snakecase';

export const getCourseNotificationPreferences = async (courseId) => {
  const url = `${getConfig().LMS_BASE_URL}/api/notifications/configurations/${courseId}`;
  const { data } = await getAuthenticatedHttpClient().get(url);
  return data;
};

export const getCourseList = async () => {
  const url = `${getConfig().LMS_BASE_URL}/api/notifications/enrollments/`;
  const { data } = await getAuthenticatedHttpClient().get(url);
  return data;
};

export const patchGroupPreferenceToggle = async (courseId, groupId, value) => {
  const patchData = snakeCaseObject({
    notificationApp: groupId,
    value,
  });
  const url = `${getConfig().LMS_BASE_URL}/api/notifications/configurations/${courseId}`;
  const { data } = await getAuthenticatedHttpClient().patch(url, patchData);
  return data;
};

export const patchPreferenceToggle = async (
  courseId,
  groupId,
  notificationType,
  notificationChannel,
  value,
) => {
  const patchData = snakeCaseObject({
    notificationApp: groupId,
    notificationType: snakeCase(notificationType),
    notificationChannel,
    value,
  });
  const url = `${getConfig().LMS_BASE_URL}/api/notifications/configurations/${courseId}`;
  const { data } = await getAuthenticatedHttpClient().patch(url, patchData);
  return data;
};
