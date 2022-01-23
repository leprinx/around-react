import { ReactFragment } from "react";
import button from "../images/button/Close-Icon.svg";

function ImageWithPopup({isOpen, onClick, onClose, card}) {
  console.log(card);
  if (card != null){
    return (
      <>
        <div onClick={onClick} className={`cover  cover_type_preview ${isOpen ? 'cover_open' : ''}`}>
          <div className="cover__box cover__box_type_preview">
            <button className="reset-button" type="reset" onClick={onClose}>
              <img
                src={button}
                alt="close icon"
                className="button button_type_preview"
              />
            </button>
            <img alt="preview-image" className="cover__preview-image" src={card.link}/>
            <p className="cover__preview-image-subtitle">{card.name}</p>
          </div>
        </div>
      </>
    );
  } return null;
}

export default ImageWithPopup;
