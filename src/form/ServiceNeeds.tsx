import { useContext, useState } from "react";
import { FormContext } from "../context/formContext";
import type { formDataType } from "../App";

export default function ServiceNeeds() {
  const {
    formData,
    setFormData,
    supportTypeError,
    frequencyError,
    requirementsError,
    setSupportTypeError,
    setFrequencyError,
    setRequirementsError,
  } = useContext(FormContext);
  const [support, setSupport] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (name == "supportType") {
      if (value == "") {
        setSupportTypeError(true);
        setFormData((formData: formDataType) => ({
          ...formData,
          [name]: value,
        }));
      } else {
        const update: string[] = [...support, value];
        setSupport(update);
        setSupportTypeError(false);
        setFormData((formData: formDataType) => ({
          ...formData,
          [name]: update,
        }));
      }
    } else if (name == "frequency" && value == "") {
      setFrequencyError(true);
      setFormData((formData: formDataType) => ({ ...formData, [name]: value }));
    } else {
      setFrequencyError(false);
      setRequirementsError(false);
      setFormData((formData: formDataType) => ({ ...formData, [name]: value }));
    }
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
            className="border-2"
          >
            <option value="Academic Support">Academic Support</option>
            <option value="Behavioral Therapy">Behavioral Therapy</option>
            <option value="Occupational Therapy">Occupational Therapy</option>
          </select>
          {supportTypeError && (
            <p className="text-red-400">Kindly select the supportType</p>
          )}
        </label>
      </div>
      <div>
        <label>
          Frequency:
          <select
            onChange={handleChange}
            name="frequency"
            value={formData.frequency}
            className="border-2"
          >
            <option value="">Select</option>
            <option value="Daily">Daily</option>
            <option value="2-3 times per week">2-3 times per week</option>
            <option value="Weekly">Weekly</option>
          </select>
          {frequencyError && (
            <p className="text-red-400">Kindly select the frequency</p>
          )}
        </label>
      </div>
      <div>
        <label>
          Any Specific Requirements:
          <textarea
            onChange={handleChange}
            name="requirements"
            value={formData.requirements}
            className="border-2"
          />
        </label>
        {requirementsError && (
          <p className="text-red-400">Kindly fill in the requirements</p>
        )}
      </div>
    </>
  );
}
