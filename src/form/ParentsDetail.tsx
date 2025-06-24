import { useContext } from "react";
import { FormContext } from "../context/formContext";

export default function ParentDetail() {
  const { formData, setFormData } = useContext(FormContext);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
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
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Phone Number:
          <input
            type="tel"
            value={formData.contact}
            name="contact"
            onChange={handleChange}
          />
          <textarea />
        </label>
      </div>
    </>
  );
}
