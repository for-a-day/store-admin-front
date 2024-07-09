import axios from "axios";

export const getStoreList = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await axios.get(
      `http://localhost:9001/admin/store`,
      config
    );
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

export const updateStore = async (storeData) => {
  try {
    const response = await fetch("http://localhost:9001/admin/store", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeData),
    });

    if (response.status !== 200) {
      throw new Error("서버 응답 오류");
    }

    return await response.json();
  } catch (error) {
    console.error("지점 수정 실패:", error.message);
    throw error;
  }
};

export const deleteStore = async (storeData) => {
  try {
    const response = await fetch("http://localhost:9001/admin/store", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeData),
    });

    if (response.status !== 200) {
      throw new Error("서버 응답 오류");
    }

    return await response.json();
  } catch (error) {
    console.error("지점 삭제 실패:", error.message);
    throw error;
  }
};

export const createStore = async (storeData) => {
  // 서버에 데이터 전송
  fetch("http://localhost:9001/admin/store", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      storeName: storeData.storeName,
      rprName: storeData.rprName,
      address: storeData.address,
      contact: storeData.contact,
      contractDate: storeData.contractDate,
      expirationDate: storeData.expirationDate,
      storeCode: storeData.storeCode,
      areaCode: storeData.areaCode,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};
