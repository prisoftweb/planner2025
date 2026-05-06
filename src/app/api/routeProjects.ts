import axios from "axios";
import { getDate } from "@/libs/dates";

export async function getProjects(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getProjectsMin(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjects`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getActiveProjectsMin(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsMINAndNECondition/66e0a1a4c6d95ffb8aa0ff31`;
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getExecuteProjectsMin(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllsProjectsMINByCondition/66c3c68c0600ee65ccc0dbb4`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getProjectsByConditionMin(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllsProjectsMINByCondition/66c3c68c0600ee65ccc0dbb4`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getProjectsLV(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsLV`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getProjectsByUserLV(auth_token:string, user:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsWithNEConditionAndUserLV/COMPLETADO/${user}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getProjectsLVNoCompleted(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsWithNEConditionLV/COMPLETADO`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getAllProjectsWithConditionLV(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsWithConditionLV/EN EJECUCION`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getAllProjectsWithClientAndConditionLV(auth_token:string, idc:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsWithClientAndConditionLV/${idc}/66c3c68c0600ee65ccc0dbb4`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getAllProjectsWithConditionByParameterLV(auth_token:string, condition:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsWithConditionLV/EN EJECUCION/${condition}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getAllProjectsWithClientLV(auth_token:string, client:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsWithClientLV/${client}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function CreateProject(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`;
  try {
    // console.log('data new proyect => ', JSON.stringify(data));
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status===201) return res.status;
    return res.statusText;
  } catch (error) {
    // console.log('errro create project => ', error);
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al crear proyecto!!';
  }
}

export async function RemoveProject(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${id}`;
  try {
    const res = await axios.delete(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 204) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al eliminar proyecto!!';
  }
}

export async function GetProject(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al consultar proyecto!!';
  }
}

export async function GetProjectMin(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getProject/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.data[0];
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al consultar proyecto!!';
  }
}

export async function UpdateProject(auth_token:string, id:string, data:Object){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/${id}`;
  try {
    const res = await axios.patch(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.status===200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al actualizar proyecto!!'
  }
}

export async function UpdateProjectPhoto(auth_token:string, id:string, data:FormData) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/updateMeLogo/${id}`;
  try {
    const res = await axios.patch(url, data, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    if(res.status===200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al actualizar proyecto!!'
  }
}

export async function InsertConditionInProject(auth_token:string, id:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/insertConditionInProject/${id}`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });
    if(res.status === 200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al actualizar condicion del proyecto!!';
    }
    return 'Error al actualizar condicion del proyecto!!';
  }
}

export async function InsertProgressInProject(auth_token:string, id:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/insertAdvanceInProject/${id}`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json',
      }
    });
    if(res.status === 200) return res.status;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || 'Error al actualizar avance del proyecto!!';
    }
    return 'Error al actualizar avance del proyecto!!';
  }
}

export async function getDashboardProjectsAmount(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsAMOUNT/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) {
      if(res.data.data.result){
        return res.data.data.result;
      }
      return res.data.data.stats;
    }
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar cantidad de proyectos!!';
  }
}

export async function getDashboardListProjects(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsLIST/66e0a1a4c6d95ffb8aa0ff31/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
      // data: data
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar lista de proyectos!!';
  }
}

export async function getDashboardProjectsByClient(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsGROUPBYCLIENT/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }, 
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar lista de proyectos por cliente!!';
  }
}

export async function getDashboardProjectsBySEGMENT(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsGROUPBYSEGMENT/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
      // data: data
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar lista de proyectos por segmento!!';
  }
}

export async function getDashboardProjectsByESTATUS(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsGROUPBYESTATUS/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar lista de proyectos por estatus!!';
  }
}

// export async function getDashboardProjectsByPROGRESS(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
//   const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsGROUPBYPROGRESS/66e0a1a4c6d95ffb8aa0ff31/${dateStart}/${dateEnd}`;
//   let prj:string = '';
//   projects.map(p => {
//     prj+= ','+p;
//   });
//   const data = {
//     project: prj.substring(1)
//   }
//   try {
//     const res = await axios.post(url, JSON.stringify(data), {
//       headers: {
//         'Authorization': `Bearer ${auth_token}`,
//         'Content-Type': 'application/json'
//       },
//       // data: data
//     })
//     if(res.status === 200) return res.data.data.stats;
//     return res.statusText;
//   } catch (error) {
//     if(axios.isAxiosError(error)){
//       return error.response?.data.message || error.message
//     }
//     return 'Error al consultar lista de proyectos por progreso!!';
//   }
// }

export async function getDashboardProjectsByPROGRESS(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllsProjectsMINByCondition/66c3c68c0600ee65ccc0dbb4`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getLenghtProjectsEvaluacion(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllsProjectsMINByCondition/66c3c6ee0600ee65ccc0dbb7`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.resdata.length;
    return 0;
  } catch (error) {
    // if(axios.isAxiosError(error)){
    //   return error.response?.data.message || error.message
    // }
    // return 'Error al consultar proyectos!!';
    return 0;
  }
}

export async function getDashboardByProjectAndType(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-GroupByProjectsAndTypes/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    return [];
  }
}

export async function getDashboardListProjectsNotComplete(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsLISTNotComplete/66e0a1a4c6d95ffb8aa0ff31/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar lista de proyectos no completos!!';
  }
}

export async function getDashboardListProjectsByDate(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsLISTByDate/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar lista de proyectos!!';
  }
}

export async function getDashboardListProjectsTop10(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsLISTOP10/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar lista de proyectos top 10!!';
  }
}

export async function getDashboardProjectByBudgetControl(auth_token:string, id:string, anio:number) {
  const d = new Date(anio, 0, 1);
  const d_ini = new Date(d).toLocaleDateString().replaceAll(/['/']/g, "-");
  
  const d2 = new Date(anio, 11, 31);
  const d_fin = new Date(d2).toLocaleDateString().replaceAll(/['/']/g, "-");
  
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getProjectByBudgetControl/${id}/2024-01-01/2025-02-28`;
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar control presupuestal!!';
  }
}

export async function getDashboardProjectCostoCenters(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getCostByProject-groupByCOSTOCENTERONLY/${id}`;
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar centro de costos!!';
  }
}

export async function getDashboardProjectCostoCentersCategory(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getCostByProject-groupByCOSTOCENTERONLYCate/${id}`;
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar centro de costos!!';
  }
}

export async function getDashboardProjectTotalCost(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsTOTAL/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar costo total de los proyectos!!';
  }
}

export async function getConfigMin(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/configs/getAllConfigsMIN`;
  
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar configuracion!!';
  }
}

export async function getProjectsBudgeted(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllsProjectsBudgeted/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos presupuestados!!';
  }
}

export async function getProjectsSpent(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllsProjectsSpent/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) return res.data.data.stats0;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos gastados!!';
  }
}

export async function getAllPaymentsProjects(auth_token:string, dateStart: string, dateEnd:string) {
  // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALPaymentsByProjectMINRESUME/CANCELADA/${dateStart}/${dateEnd}`;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALPAYMENTSByProjectMINRESUME/CANCELADA/${dateStart}/${dateEnd}`;
  // let prj:string = '';
  // projects.map(p => {
  //   prj+= ','+p;
  // });
  // const data = {
  //   project: prj.substring(1)
  // }
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar total de pagos de los proyectos!!';
  }
}

export async function getProjectsControlBudgeted(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllsProjectsByBudgetControl/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos por control presupuestal!!';
  }
}

export async function getTimeLineProject(auth_token:string, project:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getConditionsByProjectMIN/${project}`;
  
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar linea de tiempo del proyecto!!';
  }
}

export async function getProjectsWithEstimatesMin(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/estimates/getAllEstimatesMINGROUPROJECT`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getProjectsForEstimatedByUser(auth_token:string, user:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/estimates/getAllEstimatesMINGROUPROJECTAndUSER/${user}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    });
    
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getProjectsWithOutEstimateMin(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllsProjectsMINAndNEConditionAndNEstimates/66e0a1a4c6d95ffb8aa0ff31`;
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getAllsProjectsMINAndNEConditionAndNEstimatesAndUser(auth_token:string, user:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllsProjectsMINAndNEConditionAndNEstimatesAndUser/66e0a1a4c6d95ffb8aa0ff31/${user}`;
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getProjectContractualControl(auth_token:string, project:string) {
  const d = new Date(2025, 0, 1);
  const d_ini = new Date(d).toLocaleDateString().replaceAll(/['/']/g, "-");
  
  const d2 = new Date(2025, 11, 31);
  const d_fin = new Date(d2).toLocaleDateString().replaceAll(/['/']/g, "-");
  
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getProjectContractualControl/${project}/2024-01-01/2025-02-28`;
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.stats[0];
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar control contractual!!';
  }
}

export async function GetCostsByProjectMin(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsByProjectMIN/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al consultar costos del proyecto!!';
  }
}

export async function GetBudgetsByProjectMin(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/budgets/getBudgetsMINByProject/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al consultar presupuestos del proyecto!!';
  }
}

export async function GetCollectionsAccumByProjectMin(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/collections/getAllCollectionsACCUMGroupByProjectMIN`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al consultar cobros de los proyectos!!';
  }
}

export async function GetCostsAccumByProjectMin(auth_token:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsACCUMGroupByProjectMIN`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al consultar cobros de los proyectos!!';
  }
}

export async function UpdateGuaranteeFoundProject(auth_token:string, id:string, data:Object){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/updateProjectAndManyGuaranteeFunds/${id}`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.status===200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al actualizar fecha del fondo de garantia del proyecto!!'
  }
}

export async function UpdatePaymentGuaranteeFoundProject(auth_token:string, id:string, data:Object){
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/updateProjectAndManyGuaranteeFundsScheduledPayment/${id}`;
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    });
    if(res.status===200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al actualizar fecha de pago del fondo de garantia del proyecto!!'
  }
}

export async function getConditionsProject(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getConditionsByProjectMIN/${id}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.data;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message;
    }
    return 'Error al consultar proyecto!!';
  }
}

export async function getDashboardProjectsByFeaturesGuaranteeFund(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsByFEATURESGuaranteeFunds/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar montos por fondo de garantia!!';
  }
}

export async function getDashboardProjectsByFeaturesAmountCharge(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsByFEATURESAmountChargeOff/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar montos por amortizacion!!';
  }
}

export async function getDashboardProjectsByFeaturesTaxes(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsByFEATURESTAXES/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar montos por iva!!';
  }
}

export async function getProjectsMinInEjecucionUser(auth_token:string, user:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllsProjectsMINByConditionAndUser/66c3c68c0600ee65ccc0dbb4/${user}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getProjectsMinFinishedUser(auth_token:string, user:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllsProjectsMINAndNEConditionAndUser/66e0a1a4c6d95ffb8aa0ff31/${user}`;
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.resdata;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos!!';
  }
}

export async function getAllTOTALPaymentsAndCostsByProjectMINCOSTBENEFIT(auth_token:string, fullparam:string="false", dateIni:string, dateEnd:string) {
  // const now=getDate(new Date());
  // const first=new Date(new Date().getFullYear(), 0, 1);
  // const firstString=getDate(first);
  // const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALPaymentsAndCostsByProjectMINCOSTBENEFIT/678ecf6ec5f08e8a0f36d5dd/${firstString}/${now}?sort=totalCostAccum&direction=desc`;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALPaymentsAndCostsByProjectMINCOSTBENEFIT/678ecf6ec5f08e8a0f36d5dd/${dateIni}/${dateEnd}?sort=totalCostAccum&direction=desc&full=${fullparam}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos y su relacion!!';
  }
}

export async function getAllTOTALACUMULATEDPaymentsAndCostsByProjectMINCOSTBENEFIT(auth_token:string, fullparam:string="false", dateIni:string, dateEnd:string) {
  // const now=getDate(new Date());
  // const first=new Date(new Date().getFullYear(), 0, 1);
  // const firstString=getDate(first);
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/invoices/getAllTOTALACUMULATEDPaymentsAndCostsByProjectMINCOSTBENEFIT/678ecf6ec5f08e8a0f36d5dd/${dateIni}/${dateEnd}/?full=${fullparam}`;
  try {
    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      }
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar acumulado de costo beneficio!!';
  }
}