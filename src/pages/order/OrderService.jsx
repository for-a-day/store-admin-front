import axios from 'axios';

export const getOrderList = async (storeNo) => {
  try {
    const response = await axios.get(`http://localhost:9001/order?storeNo=${storeNo}`);
    const orderList = response.data.data.orderList;
    if (orderList) {
      orderList.sort((a, b) => {
        return a.tableNumber - b.tableNumber;
      });
      console.log('주문 목록 : ', orderList);
    }
    return orderList;
  } catch (error) {
    console.error('주문 목록 가져오기 실패: ', error);
    throw error;
  }
};

export const getTableList = async (storeNo) => {
  try {
    const response = await axios.get(`http://localhost:9001/table?storeNo=${storeNo}`);
    const tableList = response.data.data.tableList;
    if (tableList) {
      tableList.sort((a, b) => {
        return a.tableNumber - b.tableNumber;
      });
    }
    return tableList;
  } catch (error) {
    console.error('주문 목록 가져오기 실패: ', error);
    throw error;
  }
};

export const getPaymentList = async (storeNo) => {
  try {
    const response = await axios.get(`http://localhost:9001/payment?storeNo=${storeNo}`);
    const paymentList = response.data.data.paymentList;
    if (paymentList) {
      paymentList.sort((a, b) => {
        return a.updatedDate - b.updatedDate;
      });
    }
    return paymentList;
  } catch (error) {
    console.error('결제 목록 가져오기 실패: ', error);
    throw error;
  }
};

export const deletePayment = async (orderNo) => {
  try {
    const response = await axios.delete(`http://localhost:9001/payment?orderNo=${orderNo}`);
    if (response.status !== 200) {
      throw new Error('서버 응답 오류');
    }
    return response.data;
  } catch (error) {
    console.error('환불 처리 실패:', error.message);
    throw error;
  }
};

export const getOrderDetail = async (tableNo) => {
  try {
    const response = await axios.get(`http://localhost:9001/table/order?tableNo=${tableNo}`);
    return response.data.data.tableOrderDetail;
  } catch (error) {
    console.error('주문 상세정보 가져오기 실패: ', error);
    throw error;
  }
};

export const orderComplete = async (tableNo) => {
  // 서버에 데이터 전송
  fetch('http://localhost:9001/table/clear', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tableNo: tableNo,
    }),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error('서버 응답 오류');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('손님 나감 처리 실패:', error.message);
    });
};
