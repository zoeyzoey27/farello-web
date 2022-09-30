import moment from 'moment'

export const PASSWORD_REG_EXP =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*)[A-Za-z\d].{6,20}$/;
export const PHONE_REG_EXP = /^(\+?\d{0,11})?\s?-?\s?(\(?\d{11}\)?)?$/
export const PAGE_SIZE_DEFAULT = 5;
export const TOTAL_DEFAULT = 20;
export const PAGE_SIZE_OPTIONS = ['5', '10', '20', '30', '50'];
export const PAGE_DEFAULT = 1;
export const SKIP_DEFAULT = 0;
export const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";
export const convertTimeToString = (value) => {
  return value ? moment(value).format("DD/MM/YYYY") : '';
}