/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SpinnerRoundOutlined } from "spinners-react";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { getCarsStatus, getCarsError, createCar } from "../redux/carSlice";
import Navbar from "./Navbar";
import "./AddCar.css";
import { handleToast } from "../redux/utils";
import Container from "./Container";

const schema = yup
  .object({
    name: yup.string().required(),
    brand: yup.string().required(),
    image: yup.string().required(),
    engine_type: yup.string().required(),
    transmission: yup.string().required(),
    rent_per_day: yup.number().positive().integer().required(),
    zero_to_sixty: yup.number().positive().required(),
    top_speed: yup.number().positive().integer().required(),
  })
  .required();

const AddCar = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const status = useSelector(getCarsStatus);
  const error = useSelector(getCarsError);
  let isLoading = false;

  useEffect(() => {
    if (status === "loading") {
      isLoading = true;
    }
    if (error) handleToast({ msg: error, type: "error" });
  }, [status, dispatch]);

  const onSubmit = async (data) => {
    const res = await dispatch(createCar(data));
    if (res.meta.requestStatus === "fulfilled") {
      handleToast({ msg: "Car added successfully", type: "success" });
    }
  };

  return (
    <Container>
      <div className="add-car">
        <Navbar />
        <ToastContainer />
        <div className="layer">
          <div className="form-container">
            <div className="form">
              <form onSubmit={handleSubmit(onSubmit)} className="add-car-form">
                <input required {...register("name")} placeholder="Name" />

                <input required {...register("brand")} placeholder="Brand" />

                <input required {...register("image")} placeholder="Image" />

                <input
                  required
                  type="number"
                  min="1"
                  max="10000000"
                  {...register("top_speed")}
                  placeholder="Top Speed (in miles)"
                />

                <input
                  required
                  type="number"
                  min="0"
                  max="10000000"
                  step="0.1"
                  {...register("zero_to_sixty")}
                  placeholder="0 - 60 (in seconds)"
                />

                <div className="select-container">
                  Engine Type:
                  <select required {...register("engine_type")}>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="diesel">Diesel</option>
                    <option value="petrol">Petrol</option>
                    <option value="gas">Gas</option>
                  </select>
                </div>

                <input
                  type="number"
                  min="1"
                  max="10000000"
                  {...register("range")}
                  placeholder="Range (if electric)"
                />

                <div className="select-container">
                  Transmission:
                  <select required {...register("transmission")}>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                    <option value="semi">Semi</option>
                  </select>
                </div>

                <input
                  required
                  type="number"
                  min="1"
                  max="10000000"
                  {...register("rent_per_day")}
                  placeholder="Rent per Day (in $)"
                />

                <button className="submit-btn" type="submit">
                  {isLoading ? (
                    <SpinnerRoundOutlined color="black" size={100} />
                  ) : (
                    "Add Car"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddCar;
