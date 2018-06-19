import { 
  requestedPlanStudy, 
  fetchedPlanStudy, 
  getPlanStudyBySubtitle 
} 
from '../actions/plan-study'
import PlanStudy from '../queries/plan-study'

export const requestPlanStudyByYear =  () => async dispatch => {
  dispatch(requestedPlanStudy());
  const response = await PlanStudy().getPlanStudyByYear('2018'); 
  dispatch(fetchedPlanStudy(response));
}

 