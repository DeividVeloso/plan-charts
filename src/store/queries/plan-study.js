import axios from 'axios';
const url = 'http://localhost:3000/api/';
const PlanStudy = async function () {
  request = (body = {}, verb = "get") => {
    const response = await axios[verb](url, body);
    return response.data;
  }

  getPlanStudyAll = () => {
    request()
    return;
  }

  getPlanStudyByYear = () => {
    return;
  }

  getPlanStudyBySubtitle = () => {
    return;
  }

  return {
    getPlanStudyAll,
    getPlanStudyByYear,
    getPlanStudyBySubtitle
  }
}

export default PlanStudy;