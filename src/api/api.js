import axios from "axios";

const base = "https://api.openaq.org/v1";
/* FINAL STRINGS ENDPOINTS */
const COUNTRIES = "countries";
const CITIES = "cities";
const LATEST = "latest";
const PARAMETERS = "parameters";
const timeout = 10e3;

const api = axios.create({
  baseURL: base,
  timeout: timeout
});

/* { order_by, sort, limit, page } */
export function getCountries(queryParams) {
  return api
    .get(`/${COUNTRIES}`, { params: queryParams })
    .then(res => res.data);
}
/* { order_by, sort, limit, page, country } */
export function getCities(queryParams) {
  return api.get(`/${CITIES}`, { params: queryParams }).then(res => res.data);
}
/* {m.in. }/* { city, parameter } */
export function getLatest(queryParams) {
  return api.get(`/${LATEST}`, { params: queryParams }).then(res => res.data);
}
export function getParameters() {
  return api.get(`/${PARAMETERS}`).then(res => res.data);
}
