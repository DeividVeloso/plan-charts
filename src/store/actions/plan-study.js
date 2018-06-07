import { REQUESTED_PLAN_STUDY, REJECTED_PLAN_STUDY } from './actionTypes'

export const requestedPlanStudy = (payload) => ({
  type: 'REQUESTED_PLAN_STUDY',
  payload: payload
})

export const fetchedPlanStudy = (payload) => ({
  type: 'FETCHED_PLAN_STUDY',
  payload: payload
})

export const rejectedPlanStudy = (payload) => ({
  type: 'REJECTED_PLAN_STUDY',
  payload: payload
})