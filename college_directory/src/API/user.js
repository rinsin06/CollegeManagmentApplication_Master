import api from "./Api";
import { USER_APIS } from "./ApiConstants";
import { storage } from '../fireBaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const userLogin = async (params) => {
  try {
    const result = await api.post(USER_APIS.USER_LOGIN, {
      ...params,
    });
    return result;
  } catch (err) {
    return err;
  }
};

export const userSignUp = async (params) => {
  try {
    const { data } = await api.post(USER_APIS.USER_SIGNUP, {
      ...params,
    });
    return data;
  } catch (err) {
    return { err };
  }
};

export const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};