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
  return (
    <>
      <FormContext value={{ formData, setFormData }}>
        <Form />
      </FormContext>
    </>
  );
}

export default App;
