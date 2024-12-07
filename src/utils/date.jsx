import moment from "moment";

export const dateFormat = (date) => {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
};

// if need that local time

// import moment form "moment/min/moment-with-locales"

// export const dateFormat =(date ) => {
//     return  moment(date).local('th').format('LL')
// }
