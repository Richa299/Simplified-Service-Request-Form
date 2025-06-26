import { useContext } from "react";
import { FormContext } from "../context/formContext";

export default function ParentDetail() {
  const {
    formData,
    setFormData,
    setDisabled,
    setParentNameError,
    setEmailError,
    setContactsError,
    parentNameError,
    emailError,
    contactsError,
  } = useContext(FormContext);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name == "contact") {
      if (value.length < 10) {
        setDisabled(true);
        setContactsError(true);
        setFormData((formData) => ({ ...formData, [name]: value }));
      } else if (value.length > 10) {
        setDisabled(true);
      } else {
        setDisabled(false);
        setContactsError(false);
        setFormData((formData) => ({ ...formData, [name]: value }));
      }
    } else if (name == "parentName" && value == "") {
      setParentNameError(true);
      setFormData((formData) => ({ ...formData, [name]: value }));
    } else if (name == "email" && value == "") {
      setEmailError(true);
      setFormData((formData) => ({ ...formData, [name]: value }));
    } else {
      setParentNameError(false);
      setEmailError(false);
      setFormData((formData) => ({ ...formData, [name]: value }));
    }
  };

  return (
    <>
      <div>
        <label>
          Name
          <input
            type="text"
            value={formData.parentName}
            name="parentName"
            onChange={handleChange}
            className="border-2"
          />
        </label>
        {parentNameError && (
          <p className="text-red-400">Kindly enter parent name</p>
        )}
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
            className="border-2"
          />
        </label>
        {emailError && <p className="text-red-400">Kindly enter mail id</p>}
      </div>
      <div>
        <label>
          Phone Number:
          <input
            type="number"
            value={formData.contact}
            name="contact"
            onChange={handleChange}
            className="border-2"
          />
        </label>
        {contactsError && <p className="text-red-400">Kindly give contact</p>}
      </div>
    </>
  );
}
