import { 
  requestedPlanStudy, 
  fetchedPlanStudy, 
  getPlanStudyBySubtitle 
} 
from '../actions/plan-study'
import PlanStudy from '../queries/plan-study'

// export const requestPlanStudyByYear =  () => async dispatch => {
//   dispatch(requestedPlanStudy());
//   const response = await PlanStudy().getPlanStudyByYear('2018'); 
//   dispatch(fetchedPlanStudy(response));
// }

export const requestPlanStudyByYear =  () => async dispatch => {
  dispatch(requestedPlanStudy());
  const response = await PlanStudy().getPlanStudyByYear('2018'); 
  let novoArray = []
  response.map((item, key) => {
    item.cycles.map(item => {
      novoArray.push(item)
    })
  })
  const newObject = { cycles: novoArray}
  //console.log("OBJJS6", novoArray.filter(item => item.subject === "JS-ES6"))
  dispatch(fetchedPlanStudy(newObject));
}
 