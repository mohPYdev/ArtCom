import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import DateObject from "react-date-object"

export function getRemainedTime(end , status) {

  var time_list = end.slice(0, 10).split("-");
  var end_year = time_list[0];
  var end_month = time_list[1];
  var end_day = time_list[2];
  time_list = end.slice(11, 19).split(":");
  var end_hour = time_list[0];
  var end_min = time_list[1];
  var end_sec = time_list[2];
  var today = new Date();
  var time_str =`` ;
  
  
  time_str += ` 
    روز : ${Math.abs(+end_day - +today.getDate())}
    ساعت : ${Math.abs(+end_hour - +today.getHours())}
    دقیقه : ${Math.abs(+end_min - (+today.getMinutes() + 1))}`

  return time_str;
}
export function getShamsiDate(end){
  var time_list = end.slice(0, 10).split("-");
  var end_year = time_list[0];
  var end_month = time_list[1];
  var end_day = time_list[2];


    //show date in calender
    
    const date = new DateObject()


    date.set({ year: +end_year, month: +end_month, day: +end_day })
    date.convert(persian, persian_fa)
    return date ; 
  

}