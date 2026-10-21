import api from './api';

// Public endpoints
export const getCoderOverview = async () => {
  const { data } = await api.get('/coder/overview');
  return data;
};

export const getCodingPlatforms = async () => {
  const { data } = await api.get('/coder/platforms');
  return data;
};

export const getDSAProgress = async () => {
  const { data } = await api.get('/coder/dsa');
  return data;
};

export const getCoderSettings = async () => {
  const { data } = await api.get('/coder/settings');
  return data;
};

export const getCodingAchievements = async () => {
  const { data } = await api.get('/coder/achievements');
  return data;
};

// Admin endpoints
export const getAllPlatformsAdmin = async () => {
  const { data } = await api.get('/coder/admin/platforms');
  return data;
};

export const createPlatform = async (platformData) => {
  const { data } = await api.post('/coder/platforms', platformData);
  return data;
};

export const updatePlatform = async (id, platformData) => {
  const { data } = await api.put(`/coder/platforms/${id}`, platformData);
  return data;
};

export const deletePlatform = async (id) => {
  const { data } = await api.delete(`/coder/platforms/${id}`);
  return data;
};

export const syncPlatform = async (id) => {
  const { data } = await api.post(`/coder/sync/${id}`);
  return data;
};

export const syncAllPlatforms = async () => {
  const { data } = await api.post('/coder/sync-all');
  return data;
};

export const createDSATopic = async (topicData) => {
  const { data } = await api.post('/coder/dsa', topicData);
  return data;
};

export const updateDSATopic = async (id, topicData) => {
  const { data } = await api.put(`/coder/dsa/${id}`, topicData);
  return data;
};

export const deleteDSATopic = async (id) => {
  const { data } = await api.delete(`/coder/dsa/${id}`);
  return data;
};

export const updateCoderSettings = async (settingsData) => {
  const { data } = await api.put('/coder/settings', settingsData);
  return data;
};

export const createAchievement = async (achievementData) => {
  const { data } = await api.post('/coder/achievements', achievementData);
  return data;
};

export const updateAchievement = async (id, achievementData) => {
  const { data } = await api.put(`/coder/achievements/${id}`, achievementData);
  return data;
};

export const deleteAchievement = async (id) => {
  const { data } = await api.delete(`/coder/achievements/${id}`);
  return data;
};
