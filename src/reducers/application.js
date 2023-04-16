
import { dayNumber } from "../helpers/selectors";

export default function reducer(state, action) {
  switch (action.type) {

    case "SET_DAY":
      return { ...state, day: action.value };

    case "SET_APPLICATION_DATA":
      return { ...state, ...action.value };

    case "SET_INTERVIEW":
      const appointment = {
        ...state.appointments[action.value.id],
        interview: action.value.interview ? action.value.interview : null
      };
      console.log("Updated appointment:", appointment);
      const appointments = {
        ...state.appointments,
        [action.value.id]: appointment,
      }

      const days = [...state.days];
      const existingInterview = state.appointments[action.value.id].interview;
      console.log("original spots:", days[dayNumber(state.day)].spots);

      if (!existingInterview) {
        if (appointment.interview) {
          days[dayNumber(state.day)].spots -= 1;
        }
      } else {
        if (!appointment.interview) {
          days[dayNumber(state.day)].spots += 1;
        }
      }
    
      console.log("Updated spots:", days[dayNumber(state.day)].spots);
      return { ...state, appointments, days };

    default:
      throw new Error(`Tried to reduce with unsupported action type: ${action.type}`);
  }
}

