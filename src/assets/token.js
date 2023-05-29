export const storeToken = async (value) => {
  try {
    await localStorage.setItem("@authToken", value);
  } catch (e) {}
};

export const  getToken = async () => {
  try {
    let value = await localStorage.getItem("@authToken");
    if (value !== null) {
      return value;
    }
  } catch (e) {}
};

export const deleteToken = async () => {
  try {
    await localStorage.removeItem("@authToken");
  } catch (e) {}
};

export const signOut = async () => {
  deleteToken();
};
