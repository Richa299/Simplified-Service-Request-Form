export default function ParentDetail() {
  return (
    <>
      <div>
        <label>
          Name
          <input
            type="text"
            value=""
            name="name"
            //   onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value=""
            name="email"
            //   onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Phone Number:
          <input
            type="telephone"
            value=""
            name="phone"
            //   onChange={handleChange}
          />
          <textarea />
        </label>
      </div>
    </>
  );
}
