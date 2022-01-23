import { ReactFragment } from "react";
import deleteButton from "../images/places/delete-button.svg";

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }
  return (
    <>
      <li className="places__element">
        <img
          className="places__picture"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        <div className="places__element-description">
          <h2 className="places__title">{card.name}</h2>
          <div className="places__likes">
            <button
              className="reset-button places__element-like"
              type="button"
            ></button>
            <p className="places__show-likes">{card.likes.length}</p>
          </div>
        </div>
        <img
          src={deleteButton}
          alt="trash can"
          className="places__element-remove"
        />
      </li>
    </>
  );
}

export default Card;
