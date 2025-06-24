import { useContext, useState } from "react";
import { FormContext } from "../context/formContext";

export default function ServiceNeeds() {
  const { formData, setFormData } = useContext(FormContext);
  const [support, setSupport] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name == "supportType") {
      const update: string[] = [...support, value];
      setSupport(update);
      setFormData((formData) => ({ ...formData, [name]: update }));
    } else setFormData((formData) => ({ ...formData, [name]: value }));
  };

  return (
    <>
      <div>
        <label>
          Type of Support Needed:
          <select
            multiple
            onChange={handleChange}
            name="supportType"
            value={formData.supportType}
          >
            <option value="Academic Support">Academic Support</option>
            <option value="Behavioral Therapy">Behavioral Therapy</option>
            <option value="Occupational Therapy">Occupational Therapy</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Frequency:
          <select
            onChange={handleChange}
            name="frequency"
            value={formData.frequency}
          >
            <option value="Daily">Daily</option>
            <option value="2-3 times per week">2-3 times per week</option>
            <option value="Weekly">Weekly</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Any Specific Requirements:
          <textarea
            onChange={handleChange}
            name="requirements"
            value={formData.requirements}
          />
        </label>
      </div>
    </>
  );
}
