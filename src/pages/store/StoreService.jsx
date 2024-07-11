import axios from "axios";

export const getStoreList = async () => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
    const response = await axios.get(
      `http://localhost:9001/admin/store`,
      config
    );

    if (response.status !== 200) {
      alert("서버 응답 오류");
      return "error";
    }

    const storeList = response.data.data.storeList;
    if (storeList) {
      storeList.sort((a, b) => {
        return a.storeNo - b.storeNo;
      });
      console.log("지점 목록 : ", storeList);
    }
    return storeList;
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert("권한이 없습니다.");
      } else {
        alert("지점 목록 조회에 실패하였습니다.");
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error("No response received from server");
      alert("서버에 연결할 수 없습니다.");
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert("알 수 없는 오류가 발생하였습니다.");
    }
  }
};

export const updateStore = async (storeData) => {
  try {
    const response = await fetch("http://localhost:9001/admin/store", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeData),
    });

    if (response.status !== 200) {
      alert("서버 응답 오류");
      return "error";
    }

    return await response.json();
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert("권한이 없습니다.");
      } else {
        alert("지점 수정에 실패하였습니다.");
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error("No response received from server");
      alert("서버에 연결할 수 없습니다.");
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert("알 수 없는 오류가 발생하였습니다.");
    }
  }
};

export const deleteStore = async (storeData) => {
  try {
    const response = await fetch("http://localhost:9001/admin/store", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(storeData),
    });

    if (response.status !== 200) {
      alert("서버 응답 오류");
      return "error";
    }
    return response.json();
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert("권한이 없습니다.");
      } else {
        alert("지점 삭제에 실패하였습니다.");
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error("No response received from server");
      alert("서버에 연결할 수 없습니다.");
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert("알 수 없는 오류가 발생하였습니다.");
    }
  }
};
export const createStore = async (storeData) => {
  try {
    const response = await fetch("http://localhost:9001/admin/store", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
    });

    if (response.status !== 200) {
      alert("서버 응답 오류");
      return "error";
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert("권한이 없습니다.");
      } else {
        alert("지점 생성에 실패하였습니다.");
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error("No response received from server");
      alert("서버에 연결할 수 없습니다.");
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert("알 수 없는 오류가 발생하였습니다.");
    }
    return "error";
  }
};
