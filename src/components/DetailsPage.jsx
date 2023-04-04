/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect } from "react";
import Fade from "react-reveal/Fade";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { SpinnerRoundOutlined } from "spinners-react";
import Container from "./Container";
import "./DetailsPage.css";

import {
  fetchCarDetails,
  getDetailsView,
  getDetailsStatus,
} from "../redux/carSlice";

const DetailsPage = () => {
  const carData = useSelector(getDetailsView);
  const status = useSelector(getDetailsStatus);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (!carData) {
      dispatch(fetchCarDetails(params.id));
    }
  }, []);

  let renderDetails;
  if (carData) {
    renderDetails = (
      <div key={carData.id}>
        <div className="details-container">
          <div className="details-main">
            <Fade cascade>
              <img src={carData.image} alt="car2" className="details-img" />
            </Fade>
            <Fade right cascade>
              <section className="car-info">
                <div className="title">
                  <h2>{carData.name}</h2>
                  <p>{carData.brand}</p>
                </div>
                <ul className="car-specs">
                  <li>
                    <p>Top Speed</p>
                    <h5>{carData.top_speed} mph</h5>
                  </li>
                  <li>
                    <p>0 - 60</p>
                    <h5>{carData.zero_to_sixty} sec</h5>
                  </li>
                  <li>
                    <p>Engine Type</p>
                    <h5>{carData.engine_type}</h5>
                  </li>
                  {carData.engine_type === "electric" && (
                    <li>
                      <p>Range</p>
                      <h5>{carData.range} miles</h5>
                    </li>
                  )}
                  <li>
                    <p>Transmission</p>
                    <h5>{carData.transmission}</h5>
                  </li>
                  <li>
                    <p>Rent/Day</p>
                    <h5>{carData.rent_per_day}$</h5>
                  </li>
                </ul>
                <Link to="/reserve" className="details-btn link">
                  Reserve
                </Link>
              </section>
            </Fade>
          </div>
        </div>
      </div>
    );
  } else if (status === "loading") {
    renderDetails = (
      <div className="loader">
        Loading Cars ..
        <SpinnerRoundOutlined color="black" size={100} />
      </div>
    );
  }

  return <Container>{renderDetails}</Container>;
};

export default DetailsPage;
