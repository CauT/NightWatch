'use strict';

export const SERVER_ADDRESS = 'http://localhost:3000';

// /v1/data/agri_env/current?deviceType={}&stationName={}
export const SOIL_CURRENT_DATA = SERVER_ADDRESS + '/v1/data/agri_env/current?';
export const SOIL_HISTORICAL_DATA = SERVER_ADDRESS
  + '/v1/data/agri_env/history?';
export const SOIL_STATION_LIST = SERVER_ADDRESS + '/v1/device/info/station_list';
export const SOIL_TYPE_LIST = SERVER_ADDRESS + '/v1/device/info/type_list';
export const SOIL_GENERATE_GRAPH = SERVER_ADDRESS
  + '/v1/utils/generate_graph?';
