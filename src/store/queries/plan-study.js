import axios from 'axios';
const url = 'https://morning-castle-94305.herokuapp.com';
const PlanStudy =  function () {
   const request = async (path = 'health', verb = "get", body = {}) => {
    const response = await axios[verb](`${url}/${path}`, body);
    return response.data;
  }

  const getPlanStudyAll = () => {
    return request(`plan/`);
  }

  const getPlanStudyByYear = (year) => {
    return request(`plan/${year}`)
  }

  const getPlanStudyBySubtitle = () => {
    return;
  }

  return {
    getPlanStudyAll,
    getPlanStudyByYear,
    getPlanStudyBySubtitle
  }
}

export default PlanStudy;