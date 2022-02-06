import PopupWithForm from "./PopupWithForm";
import { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../context/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser}){
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]); 

    function handleNameChange(e){
        setName(e.target.value);
    }
    function handleDescrptionChange(e){
        setDescription(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
          });
    }

    
    return (
        <PopupWithForm
              isOpen={isOpen}
              name="edit"
              title="Edit Profile"
              buttonText="Save"
              onClose={onClose}
              onSubmit={handleSubmit}
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
                onChange={handleNameChange}
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
                onChange={handleDescrptionChange}
              />
              <span
                className="form__input-error"
                id="description-input-error"
              ></span>
            </PopupWithForm>
    )
}

export default EditProfilePopup;