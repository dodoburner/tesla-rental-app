/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL } from './utils';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (arg, { getState }) => {
    const { data } = getState().user;
    const headers = { Authorization: `${data.auth}` };
    const res = await axios.get(`${API_URL}/cars`, {
      headers,
    });
    return res.data;
  },
);

export const fetchCarDetails = createAsyncThunk(
  'cars/fetchCarDetails',
  async (id, { getState }) => {
    const { data } = getState().user;
    const headers = { Authorization: `${data.auth}` };

    const res = await axios.get(`${API_URL}/cars/${id}`, {
      headers,
    });
    return res.data;
  },
);

export const deleteCar = createAsyncThunk(
  'cars/deleteCar',
  async (id, { getState }) => {
    const { data } = getState().user;
    const headers = { Authorization: `${data.auth}` };

    await axios.delete(`${API_URL}/cars/${id}`, {
      headers,
    });
    return id;
  },
);

export const createCar = createAsyncThunk(
  'cars/createCar',
  async (car, { getState }) => {
    const { data } = getState().user;
    const headers = { Authorization: `${data.auth}` };
    const res = await axios.post(`${API_URL}/cars`, car, { headers });
    return res.data;
  },
);

const initialState = {
  cars: [],
  error: null,
  status: 'idle',
  details: null,
  deleteStatus: null,
  detailsStatus: null,
};

const carSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getCarDetails: (state, action) => {
      const car = state.cars.find((car) => car.id === action.payload);
      state.details = car;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCar.pending, (state) => {
        state.deleteStatus = 'deleting';
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        const car = state.cars.find((car) => car.id === action.payload);
        car.deleted = true;
        state.deleteStatus = 'success';
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.deleteStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(createCar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(createCar.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCarDetails.pending, (state) => {
        state.detailsStatus = 'loading';
      })
      .addCase(fetchCarDetails.fulfilled, (state, action) => {
        state.details = action.payload;
        state.detailsStatus = 'succeeded';
      })
      .addCase(fetchCarDetails.rejected, (state, action) => {
        state.detailsStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { getCarDetails } = carSlice.actions;
export const getCarsStatus = (state) => state.cars.status;
export const getCarsError = (state) => state.cars.error;
export const getDeleteStatus = (state) => state.cars.deleteStatus;
export const getDetailsStatus = (state) => state.cars.detailsStatus;
export const getAllCars = (state) => state.cars.cars;
export const getDetailsView = (state) => state.cars.details;

export default carSlice;
