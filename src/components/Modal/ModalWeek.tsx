import React, { useEffect, useState } from "react";
import InputField from "../Input";
import Modal from "./Modal";

interface ModalProps {
  props: any;
  onClose: () => void;
  presentMonth?: string;
  year?: string | number;
}

export const ModalWeek: React.FC<ModalProps> = ({
  props,
  onClose,
  presentMonth,
  year,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [initialValue, setInitialValue] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    const presentMatch = `${props.hour}.${props.day}.${presentMonth}.${year}`;
    console.log(presentMatch);
    if (localStorage?.[presentMatch]) {
      setInitialValue(JSON.parse(localStorage?.[presentMatch]));
    }
  }, [props?.hour, props?.day, presentMonth, year]);

  const handleSubmit = (
    e: React.ChangeEvent<HTMLInputElement>,
    hour: string,
    day: string
  ) => {
    e.preventDefault();
    //  save to local storage
    let obj = { title: title, description: description };
    localStorage.setItem(
      `${hour}.${day}.${presentMonth}.${year}`,
      JSON.stringify(obj)
    );
    onClose();
  };
  // console.log(`${props.hour}.${props.day}`);

  const handleDelete = (
    e: React.ChangeEvent<HTMLInputElement>,
    hour: string,
    day: string
  ) => {
    e.preventDefault();
    localStorage.removeItem(`${hour}.${day}.${presentMonth}.${year}`); //props.
    onClose();
  };

  return (
    <>
      {props.show && (
        <Modal onClose={onClose} isOpen={props.show}>
          <form onSubmit={(e: any) => handleSubmit(e, props.hour, props.day)}>
            <h1>
              {props.hour}
              {props.day}
              {presentMonth}
            </h1>

            <InputField
              type="text"
              value={title || initialValue.title}
              label="Title"
              name="name"
              onChange={handleChange}
              style={{ height: "30px" }}
            />

            <InputField
              type="text"
              value={description || initialValue.description}
              label="Description"
              name="name"
              onChange={handleDescChange}
              style={{ height: "30px" }}
            />

            <button
              className="button"
              onSubmit={(e: any) => handleSubmit(e, props.hour, props.day)}
            >
              Submit
            </button>
            <button
              className="button"
              onClick={(e: any) => handleDelete(e, props.day, props.day)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

// let obj: any = {};
// Object.keys(localStorage).reduce(function (obj, str) {
//   obj[str] = localStorage.getItem(str);
//   return obj;
// }, obj);
