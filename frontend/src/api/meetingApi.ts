export const deleteMeeting = async (id: number) => {
  const response = await api.delete(`/meetings/${id}`);
  return response.data;
};