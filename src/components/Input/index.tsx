import React from "react";

const InputField = ({
  value,
  label,
  name,
  placeholder,
  type,
  onChange,
  ...props
}: any) => (
  <div className="form-group">
    {label && (
      <label htmlFor="input-field" style={{ marginRight: "10px" }}>
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      name={name}
      className="form-control"
      placeholder={placeholder}
      onChange={onChange}
      {...props}
    />
  </div>
);

export default InputField;
