export default function ServiceNeeds() {
  return (
    <>
      <div>
        <label>
          Type of Support Needed:
          <select multiple>
            <option>Academic Support</option>
            <option>Behavioral Therapy</option>
            <option>Occupational Therapy</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Frequency:
          <select>
            <option>Daily</option>
            <option>2–3 times per week</option>
            <option>Weekly</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Any Specific Requirements:
          <textarea />
        </label>
      </div>
    </>
  );
}
