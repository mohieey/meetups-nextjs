import { Fragment } from "react";
import classes from "./MeetupDetail.module.css";

const MeetupDetail = ({ id, title, image, address, description }) => {
  return (
    <section className={classes.detail}>
      <img src={image} alt="" />
      <h1>{title}</h1>
      <h1>{id}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
};

export default MeetupDetail;
