import { useContext, useState } from "react";
import { FormContext } from "../context/formContext";
import type { formDataType, formValidationErrorType } from "../App";

export default function ServiceNeeds() {
  const { formData, setFormData, validationError, setValidationError } =
    useContext(FormContext);
  const [support, setSupport] = useState<string[]>([]);
  let supportTypeError: boolean = false;
  let frequencyError: boolean = false;
  let requirementsError: boolean = false;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    let update: string[] = [];
    const { name, value } = e.target;

    if (name == "supportType") {
      update = [...support, value];
      if (value == "") {
        supportTypeError = true;
      } else {
        setSupport(update);
        supportTypeError = false;
        setFormData((formData: formDataType) => ({
          ...formData,
          [name]: update,
        }));
      }
    } else if (name == "frequency" && value == "") {
      frequencyError = true;
    }

    setValidationError((validationError: formValidationErrorType) => ({
      ...validationError,
      supportTypeError: supportTypeError,
      frequencyError: frequencyError,
      requirementsError: requirementsError,
    }));

    update.length > 0
      ? setFormData((formData: formDataType) => ({
          ...formData,
          [name]: update,
        }))
      : setFormData((formData: formDataType) => ({
          ...formData,
          [name]: value,
        }));
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
          {validationError.supportTypeError && (
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
          {validationError.frequencyError && (
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
        {validationError.requirementsError && (
          <p className="text-red-400">Kindly fill in the requirements</p>
        )}
      </div>
    </>
  );
}
