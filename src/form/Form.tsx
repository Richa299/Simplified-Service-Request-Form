import { useContext, useState } from "react";
import ServiceNeeds from "./ServiceNeeds";
import ParentDetail from "./ParentsDetail";
import { FormContext } from "../context/formContext";

export default function Form() {
  const { formData, setFormData } = useContext(FormContext);

  const [shift, setShift] = useState(false);
  const [count, setCount] = useState(1);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleNextButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (count < 3) {
      setShift(true);
      setCount((count) => count + 1);
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
    e.preventDefault();
  };

  return (
    <>
      <form
        style={{
          backgroundColor: "lightcoral",
          padding: "20px",
          width: "300px",
          height: "300px",
        }}
      >
        {!shift && count == 1 ? (
          <>
            <h3> Child Details</h3>
            <div>
              <label>
                Name:{" "}
                <input
                  type="text"
                  value={formData.childName}
                  name="childName"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Age:{" "}
                <input
                  type="number"
                  value={formData.age}
                  name="age"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Diagnosis:
                <select
                  name="diagnosis"
                  onChange={handleChange}
                  value={formData.diagnosis}
                >
                  <option value="Autism Spectrum Disorder">
                    Autism Spectrum Disorder
                  </option>
                  <option value="Attention Deficit Hyperactivity Disorder">
                    Attention Deficit Hyperactivity Disorder
                  </option>
                  <option value="Dyscalculia">Dyscalculia</option>
                </select>
              </label>
            </div>
            <div>
              <label>
                School Type:
                <label>
                  Mainstream School
                  <input
                    type="radio"
                    value="Mainstream School"
                    checked
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Mainstream School with Learning Support
                  <input
                    type="radio"
                    name="schoolType"
                    value="Mainstream School with Learning Support"
                    onChange={handleChange}
                  />
                </label>
              </label>
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
          <button onClick={handlePreviousButtonClick}>Previous</button>
          <button onClick={handleNextButtonClick}>Next</button>
        </div>
        <button onClick={handleClick}>Submit</button>
      </form>
    </>
  );
}
