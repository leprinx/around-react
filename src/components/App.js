import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import vector from "../images/header/Vector.svg";
import { useEffect, useState, useCallback } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopuOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [currentCards, setCurrentCards] = useState([]);

  useEffect(() => {
    api
      .getUserData()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCurrentCards(res);
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
    addEscapeListener();
  }
  function handleEditProfileClick() {
    setEditProfileOpen(true);
    addEscapeListener();
  }
  function handleAddPlaceClick() {
    setAddPlaceOpen(true);
    addEscapeListener();
  }
  function closeAllPopups() {
    setAddPlaceOpen(false);
    setEditProfileOpen(false);
    setEditAvatarOpen(false);
    setIsImagePopuOpen(false);
    setSelectedCard(null);
    document.removeEventListener("keyup", handleEscClose);
  }
  //LIFTING STATE UP

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCurrentCards(currentCards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    isLiked
      ? api
          .removeLike(card._id)
          .then((res) => {
            setCurrentCards(() =>
              currentCards.map((c) => (c._id === card._id ? res : c))
            );
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          })
      : api
          .addLike(card._id)
          .then((res) => {
            setCurrentCards(() =>
              currentCards.map((c) => (c._id === card._id ? res : c))
            );
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
  }

  const handleEscClose = useCallback((evt) => {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }, []);

  function addEscapeListener() {
    document.addEventListener("keyup", handleEscClose);
  }

  function handleCloseByClick(e) {
    if (e.target.classList.contains("cover")) {
      closeAllPopups();
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopuOpen(true);
    addEscapeListener();
  }

  function handleUpdateUser({ name, about }) {
    api
      .updateUserId({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleUpdateAvatar(link) {
    api
      .changeProfilePic(link)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleAddCard({ name, link }) {
    api
      .addCard({ name, link })
      .then((res) => {
        setCurrentCards([res, ...currentCards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
          cards={currentCards}
          onCardLike={handleCardLike}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClick={handleCloseByClick}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
