import instance from './AxiosInstance.jsx';

export const getImages = async (
  pageNo = 0,
  pageSize = 10,
  sortBy = 'id',
  tags = []
) => {
  const tagString = tags.length ? '&tags=' + tags.join('&tags=') : '';
  try {
    const res = await instance.get(
      `images/allByTags?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}${tagString}`
    );
    const { status, data } = res;
    return { status, data };
  } catch (e) {
    let { status, message } = e.response.data;
    if (e.response.status === 401) message = 'Unauthorized';
    return { status, message };
  }
};

export const uploadImage = async (image, tags = []) => {
  try {
    const params = tags.length ? `?tags=${tags.join('&tags=')}` : '';
    const res = await instance.post(`images${params}`, image, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const { status, data } = res;
    return { status, data };
  } catch (e) {
    let { status, message } = e.response.data;
    if (e.response.status === 401) message = 'Unauthorized';
    return { status, message };
  }
};

export const getImageById = async (id) => {
  try {
    const res = await instance.get(`images/byId/${id}`);
    const { status, data } = res;
    return { status, data };
  } catch (e) {
    let { status, message } = e.response.data;
    if (e.response.status === 401) message = 'Unauthorized';
    return { status, message };
  }
};

export const assignTagToImage = async (imageId, tagId) => {
  try {
    const res = await instance.put(
      `images/assignTagToImage?imageId=${imageId}&tagId=${tagId}`
    );
    const { status, data } = res;
    return { status, data };
  } catch (e) {
    let { status, message } = e.response.data;
    return { status, message };
  }
};

export const deleteTagFromImage = async (imageId, tagId) => {
  try {
    const res = await instance.put(
      `images/deleteTagFromImage?imageId=${imageId}&tagId=${tagId}`
    );
    const { status, data } = res;
    return { status, data };
  } catch (e) {
    let { status, message } = e.response.data;
    return { status, message };
  }
};
