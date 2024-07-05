function FormInput({ label, type, name }) {
  return (
    <div>
      <label className="form-control w-full ">
        <div className="label">
          <span className="label-text text-white capitalize ">{label}</span>
        </div>
        <input
          autoComplete="off"
          type={type}
          name={name}
          placeholder="Type here"
          className="input w-full text-white bg-transparent border-alpha focus:border-alpha"
        />
      </label>
    </div>
  );
}

export default FormInput;
