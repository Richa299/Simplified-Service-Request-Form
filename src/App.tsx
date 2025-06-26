import { useState } from "react";
import "./App.css";
import Form from "./form/Form";
import { FormContext } from "./context/formContext";

function App() {
  const [formData, setFormData] = useState({
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
  const [supportTypeError, setSupportTypeError] = useState(false);
  const [frequencyError, setFrequencyError] = useState(false);
  const [requirementsError, setRequirementsError] = useState(false);
  const [parentNameError, setParentNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contactsError, setContactsError] = useState(false);
  return (
    <>
      <FormContext
        value={{
          formData,
          setFormData,
          disable,
          setDisabled,
          supportTypeError,
          setSupportTypeError,
          frequencyError,
          setFrequencyError,
          requirementsError,
          setRequirementsError,
          setParentNameError,
          parentNameError,
          setEmailError,
          emailError,
          setContactsError,
          contactsError,
        }}
      >
        <Form />
      </FormContext>
    </>
  );
}

export default App;
