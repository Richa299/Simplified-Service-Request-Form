import { useContext, useState } from "react";

import ServiceNeeds from "./ServiceNeeds";
import ParentDetail from "./ParentsDetail";
import { FormContext } from "../context/formContext";
import type { formDataType, formValidationErrorType } from "../App";

import "./formStyles.css";

export default function Form() {
  const {
    formData,
    setFormData,
    disable,
    validationError,
    setValidationError,
    finalOutput,
    setFinalOutput,
  } = useContext(FormContext);

  const [shift, setShift] = useState(false);
  const [count, setCount] = useState(1);
  const [disableNext, setDisableNext] = useState(false);
  let childNameError: boolean = false;
  let ageError: boolean = false;
  let diagnosisError: boolean = false;
  let schoolTypeError: boolean = false;
  let supportTypeError: boolean = false;
  let frequencyError: boolean = false;
  let requirementsError: boolean = false;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let condition = value.charCodeAt(value.length - 1);

    if (name == "childName") {
      if (
        (condition >= 97 && condition <= 125) ||
        (condition >= 65 && condition <= 90) ||
        condition == 32 ||
        value == ""
      ) {
        childNameError = false;
      }
    } else if (name == "age" && value == "") {
      ageError = true;
    }

    setValidationError((validationError: formValidationErrorType) => ({
      ...validationError,
      ageError: ageError,
      diagnosisError: diagnosisError,
      schoolTypeError: schoolTypeError,
    }));

    setFormData((formData: formDataType) => ({ ...formData, [name]: value }));
  };

  const handleNextButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (count == 1) {
      if (formData.childName == "") {
        childNameError = true;
      } else if (formData.age == "" || Number(formData.age) > 120) {
        ageError = true;
      } else if (formData.diagnosis == "") {
        diagnosisError = true;
      } else if (formData.schoolType == "") {
        schoolTypeError = true;
      } else {
        setDisableNext(false);
        if (count < 3) {
          setShift(true);
          setCount((count) => count + 1);
        }
      }
      setValidationError((validationError: formValidationErrorType) => ({
        ...validationError,
        childNameError: childNameError,
        ageError: ageError,
        diagnosisError: diagnosisError,
        schoolTypeError: schoolTypeError,
      }));
    }
    if (count !== 1 && count !== 3) {
      if (formData.supportType.length == 0) {
        supportTypeError = true;
      } else if (formData.frequency == "") {
        frequencyError = true;
      } else if (formData.requirements == "") {
        requirementsError = true;
      } else {
        if (count < 3) {
          setShift(true);
          setCount((count) => count + 1);
        }
      }
      setValidationError((validationError: formValidationErrorType) => ({
        ...validationError,
        supportTypeError: supportTypeError,
        frequencyError: frequencyError,
        requirementsError: requirementsError,
      }));
    }
  };
  const handlePreviousButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (count > 1) {
      setShift(false);
      setCount((count) => count - 1);
    }
  };

  const handleSubmit = (e: React.MouseEvent) => {
    let parentNameError: boolean = false;
    let emailError: boolean = false;
    let contactError: boolean = false;

    if (formData.parentName == "") {
      parentNameError = true;
    } else if (formData.email == "") {
      emailError = true;
    } else if (formData.contact == "") {
      contactError = true;
    } else {
      parentNameError = false;
      emailError = false;
      contactError = false;
      setFinalOutput(true);
    }
    setValidationError((validationError) => ({
      ...validationError,
      parentNameError: parentNameError,
      emailError: emailError,
      contactsError: contactError,
    }));

    e.preventDefault();
  };

  return (
    <>
      {!finalOutput ? (
        <form className="bg-[#b389d9] rounded-sm p-4 sm:w-96 w-[300px] h-[400px] items-start">
          {!shift && count == 1 ? (
            <>
              <h3 className="text-lg font-bold"> Child Details</h3>
              <div>
                <label>
                  Name:{" "}
                  <input
                    type="text"
                    value={formData.childName}
                    name="childName"
                    onChange={handleChange}
                    className="border-2"
                  />
                  {validationError.childNameError && (
                    <p className="text-red-400">Kindly enter the name</p>
                  )}
                </label>
              </div>
              <div className="mt-4">
                <label>
                  Age:{" "}
                  <input
                    type="number"
                    value={formData.age}
                    name="age"
                    min="0"
                    max="120"
                    onChange={handleChange}
                    className="border-2"
                  />
                  {validationError?.ageError && (
                    <p className="text-red-400">Kindly enter the valid age</p>
                  )}
                </label>
              </div>
              <div>
                <label>
                  Diagnosis:
                  <select
                    name="diagnosis"
                    onChange={handleChange}
                    value={formData.diagnosis}
                    className="border-2"
                  >
                    <option value="">Select</option>
                    <option value="Autism Spectrum Disorder">
                      Autism Spectrum Disorder
                    </option>
                    <option value="Attention Deficit Hyperactivity Disorder">
                      Attention Deficit Hyperactivity Disorder
                    </option>
                    <option value="Dyscalculia">Dyscalculia</option>
                  </select>
                  {validationError.diagnosisError && (
                    <p className="text-red-400">Kindly select the diagnosis</p>
                  )}
                </label>
              </div>
              <div>
                <label>
                  School Type:
                  <label>
                    Mainstream School
                    <input
                      className="radio-input"
                      name="schoolType"
                      type="radio"
                      value="Mainstream School"
                      onChange={handleChange}
                      checked={formData.schoolType === "Mainstream School"}
                    />
                  </label>
                  <label>
                    Mainstream School with Learning Support
                    <input
                      className="radio-input"
                      type="radio"
                      name="schoolType"
                      value="Mainstream School with Learning Support"
                      onChange={handleChange}
                      checked={
                        formData.schoolType ===
                        "Mainstream School with Learning Support"
                      }
                    />
                  </label>
                </label>

                {validationError.schoolTypeError && (
                  <p className="text-red-400">Kindly enter the schoolType</p>
                )}
              </div>
            </>
          ) : count == 2 ? (
            <ServiceNeeds />
          ) : count == 3 ? (
            <ParentDetail />
          ) : (
            <></>
          )}
          <div>
            {count !== 1 && (
              <button onClick={handlePreviousButtonClick}>Previous</button>
            )}
            {count !== 3 ? (
              <button onClick={handleNextButtonClick} disabled={disableNext}>
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={disable}>
                Submit
              </button>
            )}
          </div>
        </form>
      ) : (
        <div>Thankyou</div>
      )}
    </>
  );
}
