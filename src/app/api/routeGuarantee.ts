import axios from 'axios';

export async function getGuarantees(token: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/guaranteefunds`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      return response.data.data.data;
    }
    return 'Error: No se pudo obtener la información de las garantías';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo obtener la información de las garantías';
    }
    return 'Error: No se pudo obtener la información de las garantías'; 
  }
}

export async function getGuaranteesByDateMin(token: string, dateI:string, dateE:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/guaranteefunds/getAllGuaranteeFundsMIN/${dateI}/${dateE}`;
  const data = {
    condition: [
      "6827d5c2936cac5913f94ad7", "6827d64a936cac5913f94ad9", "6827d67b936cac5913f94adb", "6827d56d936cac5913f94ad5"
    ]
  };
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      return response.data.data.stats;
    }
    return 'Error: No se pudo obtener la información de las garantías';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo obtener la información de las garantías';
    }
    return 'Error: No se pudo obtener la información de las garantías'; 
  }
}

export async function insertConditionInGuarantee(token: string, id:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/guaranteefunds/insertConditionInGuaranteeFund/${id}`;
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      return response.status;
    }
    return 'Error: No se pudo actualizar estado de la garantía';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo actualizar estado de la garantía';
    }
    return 'Error: No se pudo actualizar estado de la garantía'; 
  }
}

export async function getAmountTotalGuaranteesByDateAndStatus(token: string, dateI:string, dateE:string, statuses: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/guaranteefunds/getAllTOTALGuaranteeFundsResumeByDateAndStatus/${dateI}/${dateE}`;
  // const data = {
  //   condition: [
  //     "6827d5c2936cac5913f94ad7", "6827d64a936cac5913f94ad9", "6827d67b936cac5913f94adb", "6827d56d936cac5913f94ad5"
  //   ]
  // };
  const data = {
    condition: statuses
  };
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log('res status => ', response);
    if (response.status === 200) {
      return response.data.data.stats;
    }
    return 'Error: No se pudo obtener el total de los fondos de garantías';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo obtener el total de los fondos de garantía';
    }
    return 'Error: No se pudo obtener el total de los fondos de garantía'; 
  }
}

export async function getTotalGuaranteesByDateAndStatus(token: string, dateI:string, dateE:string, type:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/guaranteefunds/getAllTOTALGuaranteeFundsResumeByDate&STATUS/${dateI}/${dateE}/${type}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      return response.data.data.stats;
    }
    return 'Error: No se pudo obtener el total de los fondos de garantías';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo obtener el total de los fondos de garantía';
    }
    return 'Error: No se pudo obtener el total de los fondos de garantía'; 
  }
}

export async function getGuaranteesGroupByClientAndDateAndStatus(token: string, dateI:string, dateE:string, statuses:string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/guaranteefunds/getAllGuaranteeFundsGroupByCLIENT/${dateI}/${dateE}`;
  // const data = {
  //   condition: [
  //     "6827d5c2936cac5913f94ad7", "6827d64a936cac5913f94ad9", "6827d67b936cac5913f94adb", "6827d56d936cac5913f94ad5"
  //   ]
  // };
  const data = {
    condition: statuses
  };
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      return response.data.data.stats;
    }
    return 'Error: No se pudo obtener fondos de garantías por cliente';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo obtener fondos de garantías por cliente';
    }
    return 'Error: No se pudo obtener fondos de garantías por cliente'; 
  }
}

export async function getGuaranteesGroupByYear(token: string, dateI:string, dateE:string, statuses: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/guaranteefunds/getAllGuaranteeFundsGroupByYEAR/${dateI}/${dateE}`;
  // const data = {
  //   condition: [
  //     "6827d5c2936cac5913f94ad7", "6827d64a936cac5913f94ad9", "6827d67b936cac5913f94adb", "6827d56d936cac5913f94ad5"
  //   ]
  // };
  const data = {
    condition: statuses
  };
  try {
    console.log('url => ', url);
    console.log('data => ', JSON.stringify(data));
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('response => ', response);
    if (response.status === 200) {
      return response.data.data.resultado;
    }
    return 'Error: No se pudo obtener fondos de garantías por anio';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo obtener fondos de garantías por anio';
    }
    return 'Error: No se pudo obtener fondos de garantías por anio'; 
  }
}

export async function getGuaranteesGroupByStatus(token: string, dateI:string, dateE:string, statuses:string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/guaranteefunds/getAllGuaranteeFundsGroupByESTATUS/${dateI}/${dateE}`;
  // const data = {
  //   condition: [
  //     "6827d5c2936cac5913f94ad7", "6827d64a936cac5913f94ad9", "6827d67b936cac5913f94adb", "6827d56d936cac5913f94ad5"
  //   ]
  // };
  const data = {
    condition: statuses
  };
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      return response.data.data.stats;
    }
    return 'Error: No se pudo obtener fondos de garantías por estatus';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo obtener fondos de garantías por estatus';
    }
    return 'Error: No se pudo obtener fondos de garantías por estatus'; 
  }
}

export async function createGuaranteesFound(token: string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/guaranteefunds/`;
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 201) {
      return response.status;
    }
    return 'Error: No se pudo crear fondo de garantía';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo crear fondo de garantía';
    }
    return 'Error: No se pudo crear fondo de garantía'; 
  }
}

export async function getGuaranteesByProject(token: string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/guaranteefunds/getAllGuaranteeFundsMINByIDPROJECT/${id}`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      return response.data.data.stats;
    }
    return 'Error: No se pudo obtener la información de las garantías';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo obtener la información de las garantías';
    }
    return 'Error: No se pudo obtener la información de las garantías'; 
  }
}

export async function getGuaranteesResumeByProjectMin(token: string, dateI:string, dateE:string, statuses: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/guaranteefunds/getAllGuaranteeFundsRESUMEGroupByPROJECT/${dateI}/${dateE}`;
  // const data = {
  //   condition: [
  //     "6827d5c2936cac5913f94ad7", "6827d64a936cac5913f94ad9", "6827d67b936cac5913f94adb", "6827d56d936cac5913f94ad5"
  //   ]
  // };
  const data = {
    condition: statuses
  };
  try {
    console.log('url => ', url);
    console.log('data => ', JSON.stringify(data));
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      return response.data.data.stats;
    }
    return 'Error: No se pudo obtener la información de las garantías';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo obtener la información de las garantías';
    }
    return 'Error: No se pudo obtener la información de las garantías'; 
  }
}

export async function getAllTOTALGuaranteeFundsResumeByDateAndStatus(token: string, dateI:string, dateE:string, statuses:string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/guaranteefunds/getAllTOTALGuaranteeFundsResumeByDateAndStatus/${dateI}/${dateE}`;
  // const data = {
  //   condition: [
  //     "6827d5c2936cac5913f94ad7", "6827d64a936cac5913f94ad9", "6827d67b936cac5913f94adb", "6827d56d936cac5913f94ad5"
  //   ]
  // };
  const data = {
    condition: statuses
  };
  try {
    const response = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      return response.data.data.stats;
    }
    return 'Error: No se pudo obtener total de fondos de garantías por estatus';
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data || 'Error: No se pudo obtener total de fondos de garantías por estatus';
    }
    return 'Error: No se pudo obtener total de fondos de garantías por estatus'; 
  }
}