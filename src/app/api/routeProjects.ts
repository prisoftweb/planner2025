import axios from "axios";

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

export async function CreateProject(auth_token:string, data:Object) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`;
  try {
    console.log(url);
    console.log(JSON.stringify(data));
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      }
    })
    if(res.status===201) return res.status;
    return res.statusText;
  } catch (error) {
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
    console.log(url);
    console.log(JSON.stringify(data))
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
    console.log('res dashboar amount proyects => ', res);
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
  console.log('url > ', url);
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
    console.log('res route => ', res);
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
  console.log('url estatus => ', url);
  console.log('data estatus => ', JSON.stringify(data));
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
    return 'Error al consultar lista de proyectos por estatus!!';
  }
}

export async function getDashboardProjectsByPROGRESS(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllProjectsGROUPBYPROGRESS/66e0a1a4c6d95ffb8aa0ff31/${dateStart}/${dateEnd}`;
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
    return 'Error al consultar lista de proyectos por progreso!!';
  }
}

export async function getDashboardByProjectAndType(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCosts-GroupByProjectsAndTypes/${dateStart}/${dateEnd}`;
  console.log('url costs => ', url);
  console.log('date start costs => ', dateStart);
  console.log('proyects costs => ', projects);
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
    console.log('res costs => ', res);
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    console.log('catch costs => ', error);
    return [];
    // if(axios.isAxiosError(error)){
    //   return error.response?.data.message || error.message
    // }
    // return 'Error al consultar Costos agrupados por proyecto y tipos!!';
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
      // data: data
    })
    // console.log(url);
    // console.log(res);
    // console.log('res => ', res.data.data.stats);
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
  //console.log('url => ', url);
  //console.log('date start => ', dateStart);
  //console.log('projects => ', projects);
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
    //console.log('data primer grafico => ', JSON.stringify(data));
    //console.log('este no debe venir => ', projects);
    //console.log('res => ', res);
    //console.log('res => ', res.data.data.stats);
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    //console.log('catch => ', error);
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
      // data: data
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

export async function getDashboardProjectByBudgetControl(auth_token:string, id:string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getProjectByBudgetControl/${id}/2024-01-01/2024-10-30`;
  // //console.log('url control presupuestal => ', url);
  try {
    const res = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
    })
    // //console.log('res control pres => ', res);
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    // //console.log('error control pres => ', error);
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

export async function getDashboardProjectTotalCost(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs/getAllCostsTOTAL/${dateStart}/${dateEnd}`;
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  //console.log('url total cost => ',url);
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
    console.log('url presupuestado => ', url);
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
      // data: data
    })
    console.log('res presupuestado => ', res);
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    console.log('error presupuestado => ', error);
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
      //data: data
    })
    if(res.status === 200) return res.data.data.stats;
    return res.statusText;
  } catch (error) {
    if(axios.isAxiosError(error)){
      return error.response?.data.message || error.message
    }
    return 'Error al consultar proyectos gastados!!';
  }
}

export async function getProjectsControlBudgeted(auth_token:string, dateStart: string, dateEnd:string, projects: string[]) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/getAllsProjectsByBudgetControl/${dateStart}/${dateEnd}`;
  //console.log('url control prsu =>', url);
  //console.log('fecha ini => ', dateStart);
  //console.log('fecha fin => ', dateEnd);
  //console.log('proyectos => ', projects);
  let prj:string = '';
  projects.map(p => {
    prj+= ','+p;
  });
  const data = {
    project: prj.substring(1)
  }
  // const data = {
  //   project: projects.length > 0? projects[0]: ''
  // }
  //console.log(JSON.stringify(data));
  try {
    const res = await axios.post(url, JSON.stringify(data), {
      headers: {
        'Authorization': `Bearer ${auth_token}`,
        'Content-Type': 'application/json'
      },
      // data: {
      //   project: projects
      //   // project: ['6628118dad51c39004cad07d']
      // }
    })
    console.log('res control pres => ', res);
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