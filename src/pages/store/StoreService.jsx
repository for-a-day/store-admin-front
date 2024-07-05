import axios from "axios";

export const getStoreList = async () => {
  try {
    const response = await axios.get(`http://localhost:9001/admin/store`);
    const storeList = response.data.data.storeList;
    if (storeList) {
      storeList.sort((a, b) => {
        return a.storeNo - b.storeNo;
      });
      console.log("지점 목록 : ", storeList);
    }
    return storeList;
  } catch (error) {
    console.error("지점 목록 가져오기 실패: ", error);
    throw error;
  }
};
