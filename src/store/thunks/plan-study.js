import { 
  requestedPlanStudy, 
  fetchedPlanStudy, 
  getPlanStudyBySubtitle 
} 
from '../actions/plan-study'
import PlanStudy from '../queries/plan-study'
import {sumHoursByYear} from '../../utils/helpers'

export const requestPlanStudyByYear = (year) => async dispatch => {
  dispatch(requestedPlanStudy());
  const response = await PlanStudy().getPlanStudyByYear('2018'); 
  dispatch(fetchedPlanStudy(response));
}

export const requestPlanStudyAll =  () => async dispatch => {
  dispatch(requestedPlanStudy());
  const response = await PlanStudy().getPlanStudyAll(); 
  let novoArray = []
  sumHoursByYear(response);
  response.map((item, key) => {
    item.cycles.map(item => {
      novoArray.push(item)
    })
  })
  const newObject = { 
    cycles: novoArray,
    totalHourByYear: sumHoursByYear(response),
  }
  //console.log("OBJJS6", novoArray.filter(item => item.subject === "JS-ES6"))
  dispatch(fetchedPlanStudy(newObject));
}

