import { useState } from "react";
import "./App.css";
import Form from "./form/Form";
import { FormContext } from "./context/formContext";

export type formDataType = {
  childName: string;
  age: string;
  diagnosis: string;
  schoolType: string;
  supportType: [];
  frequency: string;
  requirements: string;
  parentName: string;
  email: string;
  contact: string;
};
export type formValidationErrorType = {
  childName: boolean;
  age: boolean;
  diagnosis: boolean;
  schoolType: boolean;
  supportType: boolean;
  frequency: boolean;
  requirements: boolean;
  parentName: boolean;
  email: boolean;
  contact: boolean;
};

function App() {
  const [formData, setFormData] = useState<formDataType>({
    childName: "",
    age: "",
    diagnosis: "",
    schoolType: "",
    supportType: [],
    frequency: "",
    requirements: "",
    parentName: "",
    email: "",
    contact: "",
  });
  const [disable, setDisabled] = useState(false);
  const [validationError, setValidationError] = useState({
    childNameError: false,
    ageError: false,
    diagnosisError: false,
    schoolTypeError: false,
    supportTypeError: false,
    frequencyError: false,
    requirementsError: false,
    parentNameError: false,
    emailError: false,
    contactsError: false,
  });
  const [finalOutput, setFinalOutput] = useState(false);
  return (
    <>
      <FormContext
        value={{
          formData,
          setFormData,
          disable,
          setDisabled,
          validationError,
          setValidationError,
          setFinalOutput,
          finalOutput,
        }}
      >
        <Form />
      </FormContext>
    </>
  );
}

export default App;
