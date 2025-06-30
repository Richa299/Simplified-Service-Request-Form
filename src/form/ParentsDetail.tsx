import { useContext } from "react";
import { FormContext } from "../context/formContext";
import type { formDataType, formValidationErrorType } from "../App";

export default function ParentDetail() {
  const {
    formData,
    setFormData,
    setDisabled,
    validationError,
    setValidationError,
  } = useContext(FormContext);

  let parentNameError: boolean = false;
  let emailError: boolean = false;
  let contactError: boolean = false;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name == "contact") {
      if (value.length < 10) {
        setDisabled(true);
        contactError = true;
      } else if (value.length > 10) {
        setDisabled(true);
      } else {
        setDisabled(false);
        contactError = false;
      }
    } else if (name == "parentName" && value == "") {
      parentNameError = true;
    } else if (name == "email" && value == "") {
      emailError = true;
    }

    setValidationError((validationError: formValidationErrorType) => ({
      ...validationError,
      contactsError: contactError,
      parentNameError: parentNameError,
      emailError: emailError,
    }));
    setFormData((formData: formDataType) => ({ ...formData, [name]: value }));
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
        {validationError.parentNameError && (
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
        {validationError.emailError && (
          <p className="text-red-400">Kindly enter mail id</p>
        )}
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
        {validationError.contactsError && (
          <p className="text-red-400">Kindly give contact</p>
        )}
      </div>
    </>
  );
}
