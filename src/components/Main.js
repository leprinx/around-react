import profileMod from "../images/profile/modifier.png";
import addElement from "../images/add-element/add-element.svg";
import api from "../utils/api";
import { useEffect, useState } from "react";
import Card from "./Card";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
}) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserData().then((res) => {
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    });
  }, []);

  useEffect(() => {
    api.getCards().then((res) => {
      setCards(res);
    });
  }, []);

  return (
    <>
      <main className="content container">
        <section className="profile">
          <div className="profile__info">
            <div className="profile__avatar-container">
              <img
                src={userAvatar}
                alt="Traveler profile picture"
                className="profile__avatar"
              />
              <button
                className="profile__avatar-button"
                type="button"
                onClick={onEditAvatarClick}
              ></button>
            </div>
            <div className="profile__description">
              <div className="profile__line">
                <h1 className="profile__author">{userName}</h1>
                <button
                  className="reset-button"
                  type="button"
                  onClick={onEditProfileClick}
                >
                  <img
                    src={profileMod}
                    alt="pen"
                    className="profile__modifier"
                  />
                </button>
              </div>
              <p className="profile__subtitle">{userDescription}</p>
            </div>
          </div>
          <button
            onClick={onAddPlaceClick}
            className="reset-button add-element"
            type="button"
          >
            <img
              src={addElement}
              alt="plus symbol"
              className="add-element__symbol"
            />
          </button>
        </section>
        <section className="places">
          <ul className="places__elements">
            <>
              {cards.map((card) => (
                <Card key={card._id} card={card} onCardClick={onCardClick} />
              ))}
            </>
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
