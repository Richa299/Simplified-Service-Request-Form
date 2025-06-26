import { useContext, useState } from "react";
import ServiceNeeds from "./ServiceNeeds";
import ParentDetail from "./ParentsDetail";
import { FormContext } from "../context/formContext";

export default function Form() {
  const {
    formData,
    setFormData,
    disable,
    setSupportTypeError,
    setFrequencyError,
    setRequirementsError,
    setParentNameError,
    setEmailError,
    setContactsError,
    finalOutput,
    setFinalOutput,
  } = useContext(FormContext);

  const [shift, setShift] = useState(false);
  const [count, setCount] = useState(1);
  const [childNameError, setChildNameError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [diagnosisError, setDiagnosisError] = useState(false);
  const [schoolTypeError, setSchoolTypeError] = useState(false);
  const [disableNext, setDisableNext] = useState(false);

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
        setChildNameError(false);
        setFormData((formData) => ({ ...formData, [name]: value }));
      }
    } else if (name == "age" && value == "") {
      setAgeError(true);
      setFormData((formData) => ({ ...formData, [name]: value }));
    } else {
      setAgeError(false);
      setDiagnosisError(false);
      setSchoolTypeError(false);
      setFormData((formData) => ({ ...formData, [name]: value }));
    }
  };

  const handleNextButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (count == 1) {
      if (formData.childName == "") {
        setChildNameError(true);
      } else if (formData.age == "" || Number(formData.age) > 120) {
        setAgeError(true);
      } else if (formData.diagnosis == "") {
        setDiagnosisError(true);
      } else if (formData.schoolType == "") {
        setSchoolTypeError(true);
      } else {
        setDisableNext(false);
        setChildNameError(false);
        setDiagnosisError(false);
        setAgeError(false);
        setSchoolTypeError(false);
        if (count < 3) {
          setShift(true);
          setCount((count) => count + 1);
        }
      }
    } else if (count == 3) {
      if (formData.parentName == "") setParentNameError(true);
      else if (formData.email == "") setEmailError(true);
      else if (formData.contact == "") setContactsError(true);
      else {
        setDisableNext(false);
        setParentNameError(false);
        setContactsError(false);
        setEmailError(false);
        if (count < 3) {
          setShift(true);
          setCount((count) => count + 1);
        }
      }
    } else {
      if (formData.supportType.length == 0) {
        setSupportTypeError(true);
      } else if (formData.frequency == "") {
        setFrequencyError(true);
      } else if (formData.requirements == "") {
        setRequirementsError(true);
      } else {
        setSupportTypeError(false);
        setFrequencyError(false);
        setRequirementsError(false);

        if (count < 3) {
          setShift(true);
          setCount((count) => count + 1);
        }
      }
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

  const handleClick = (e: React.MouseEvent) => {
    if (formData.parentName == "") {
      setParentNameError(true);
    } else if (formData.email == "") {
      setEmailError(true);
    } else if (formData.contact == "") {
      setContactsError(true);
    } else {
      setContactsError(false);
      setEmailError(false);
      setParentNameError(false);
      setFinalOutput(true);
      console.log(formData);
    }

    e.preventDefault();
  };
  return (
    <>
      {!finalOutput ? (
        <form className="bg-yellow-300 rounded-sm p-4 w-lg h-80 items-start">
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
                  {childNameError && (
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
                  {ageError && (
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
                    <option>Select</option>
                    <option value="Autism Spectrum Disorder">
                      Autism Spectrum Disorder
                    </option>
                    <option value="Attention Deficit Hyperactivity Disorder">
                      Attention Deficit Hyperactivity Disorder
                    </option>
                    <option value="Dyscalculia">Dyscalculia</option>
                  </select>
                  {diagnosisError && (
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

                {schoolTypeError && (
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
              <button onClick={handleClick} disabled={disable}>
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
