// src/components/TrailerButton/TrailerButton.js
import PropTypes from "prop-types";
import css from "./TrailerButton.module.scss";

const TrailerButton = ({ id, openTrailer }, className) => {
  return (
    <div
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        openTrailer(id);
      }}
    >
      <p>Watch trailer</p>
      <img
        height="30px"
        width="30px"
        src="https://cdn.icon-icons.com/icons2/1584/PNG/512/3721679-youtube_108064.png"
        alt="trailer"
      />
    </div>
  );
};

TrailerButton.propTypes = {
  id: PropTypes.number.isRequired,
  openTrailer: PropTypes.func.isRequired,
};

export default TrailerButton;
