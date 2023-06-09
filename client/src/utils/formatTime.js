export const calculateCreatedTime = (timeCreated) => {
    let periods = {
      "năm": 365 * 30 * 24 * 60 * 60 * 1000,
      "tháng": 30 * 24 * 60 * 60 * 1000,
      "tuần": 7 * 24 * 60 * 60 * 1000,
      "ngày": 24 * 60 * 60 * 1000,
      "giờ": 60 * 60 * 1000,
      "phút": 60 * 1000,
    };
  
    let diff = Date.now() - +new Date(`${timeCreated}`);
  
    for (const key in periods) {
      if (diff >= periods[key]) {
        let result = Math.floor(diff / periods[key]);
        return `${result} ${result === 1 ? key : key + ""} trước`;
      }
    }
  
    return "vừa xong";
  };
  
  export const calculateCreatedTime2 = (timeCreated) => {
    let periods = {
      year: 365 * 30 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      minute: 60 * 1000,
    };
  
    let diff = Date.now() - +timeCreated;
  
    for (const key in periods) {
      if (diff >= periods[key]) {
        let result = Math.floor(diff / periods[key]);
        return `${result} ${result === 1 ? key : key + "s"} ago`;
      }
    }
  
    return "Just now";
  };