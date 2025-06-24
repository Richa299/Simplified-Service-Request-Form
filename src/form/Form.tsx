import { useContext, useState } from "react";
import ServiceNeeds from "./ServiceNeeds";
import ParentDetail from "./ParentsDetail";
import { FormContext } from "../context/formContext";

export default function Form() {
  const { formData, setFormData } = useContext(FormContext);
  console.log(formData);
  const [data, setData] = useState({
    name: "",
    age: "",
    diagnosis: "",
    schoolType: "",
  });
  const [shift, setShift] = useState(false);
  const [count, setCount] = useState(1);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // console.log(e.target)/;
    setData((data) => ({ ...data, [name]: value }));
  };
  console.log(data);
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
  console.log(count);
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
                  value={data.name}
                  name="name"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Age:{" "}
                <input
                  type="number"
                  value={data.age}
                  name="age"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Diagnosis:
                <select name="diagnosis" onChange={handleChange}>
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
      </form>
    </>
  );
}
