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
export const DATE_FORMAT = "DD/MM/YYYY";
export const convertTimeToString = (value) => {
  return value ? moment(value).format("DD/MM/YYYY") : '';
}
export const LANGUAGE_KEY = 'language';
export const AVAILABLE = 'AVAILABLE';
export const EDIT = 'edit';
export const DESC = 'desc';
export const ASC = 'asc';
export const STOCKING = 'STOCKING';
export const OUT_OF_STOCK = 'OUT_OF_STOCK';
export const OTHERS = 'OTHERS';
