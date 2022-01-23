import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import vector from "../images/header/Vector.svg";
import deleteButton from "../images/places/delete-button.svg";
import { useEffect, useState } from "react";
import { ReactFragment } from "react";
import PopupWithForm from "./PopupWithForm";
import ImageWithPopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopuOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlaceOpen(true);
  }
  function closeAllPopups() {
    setAddPlaceOpen(false);
    setEditProfileOpen(false);
    setEditAvatarOpen(false);
    setIsImagePopuOpen(false);
    setSelectedCard(null);
    document.removeEventListener("keyup", handleEscClose);
  }

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  document.addEventListener("keyup", handleEscClose);

  function handleCloseByClick(e) {
    if (
      e.target.classList.contains("cover") 
    ) {
      closeAllPopups();
    }
  }

  function handleCardClick(card){
    setSelectedCard(card);
    setIsImagePopuOpen(true);
  }



  return (
    <>
      <div className="page">
        <Header
          containerClass="header container"
          vector={vector}
          logoClass="header__logo"
        />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClick={handleCloseByClick}
          name="edit"
          title="Edit Profile"
          buttonText="Save"
          onClose={closeAllPopups}
        >
          <input
            id="name-input"
            type="text"
            className="form__edit-form form__edit-form_type_name"
            name="name"
            placeholder="text"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="form__input-error" id="name-input-error"></span>
          <input
            id="description-input"
            type="text"
            className="form__edit-form form__edit-form_type_description"
            name="about"
            required
            placeholder="text"
            minLength="2"
            maxLength="200"
          />
          <span
            className="form__input-error"
            id="description-input-error"
          ></span>
        </PopupWithForm>
        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          onClick={handleCloseByClick}
          name="add"
          title="New place"
          buttonText="Create"
          onClose={closeAllPopups}
        >
          <input
            id="new-place-input"
            type="text"
            className="form__edit-form form__edit-form_type_new-place"
            name="name"
            placeholder="text"
            required
            minLength="1"
            maxLength="40"
          />
          <span className="form__input-error" id="new-place-input-error"></span>
          <input
            id="new-place-link"
            type="url"
            className="form__edit-form form__edit-form_type_place-picture"
            name="link"
            placeholder="link"
            required
          />
          <span className="form__input-error" id="new-place-link-error"></span>
        </PopupWithForm>
        <PopupWithForm
          isOpen={isEditAvatarPopupOpen}
          onClick={handleCloseByClick}
          name="changePic"
          title="Change profile picture"
          buttonText="Save"
          onClose={closeAllPopups}
        >
          <input
            id="new-pic-link"
            type="url"
            className="form__edit-form form__edit-form_type_profile-picture"
            name="pic-link"
            placeholder="link"
            required
          />
          <span className="form__input-error" id="new-pic-link-error"></span>
        </PopupWithForm>
        <ImagePopup isOpen={isImagePopupOpen} onClick={handleCloseByClick} onClose={closeAllPopups} card={selectedCard}/>
        <Footer />
      </div>
    </>
  );
}

export default App;
