import { useEffect, useState } from "react";
import InputField from "../Input";
import Modal from "./Modal";

interface ModalProps {
  props: any;
  onClose: () => void;
  presentMonth?: string;
  year?: any;
}

export const ModalMonth: React.FC<ModalProps> = ({
  props,
  onClose,
  presentMonth,
  year,
}) => {
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [initialValue, setInitialValue] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  useEffect(() => {
    const presentDay = `${props.day + 1}`;
    Object.keys(localStorage).forEach((item) => {
      if (item.split(".")?.[1] === presentDay) {
        setInitialValue(JSON.parse(localStorage?.[item]));
        setTime(item.split(".")?.[0]);
      }
    });
  }, [props?.hour, props?.day]);

  const handleSubmit = (
    e: React.ChangeEvent<HTMLInputElement>,
    day: number,
    time: string
  ) => {
    e.preventDefault();
    //  save to local storage
    let obj = { title: title, description: description };
    localStorage.setItem(
      `${time}.${day + 1}.${presentMonth}.${year}`,
      JSON.stringify(obj)
    );
    onClose();
  };

  const handleDelete = (
    e: React.ChangeEvent<HTMLInputElement>,
    day: number,
    time: string
  ) => {
    localStorage.removeItem(`${time}.${day + 1}.${presentMonth}.${year}`);
    onClose();
  };

  return (
    <>
      {props.show && (
        <Modal onClose={onClose} isOpen={props.show}>
          <form onSubmit={(e: any) => handleSubmit(e, props.day, time)}>
            <h1>{props.day + 1}</h1>

            <InputField
              type="text"
              value={time || initialValue.time}
              label="Time"
              name="name"
              onChange={handleTimeChange}
            />

            <InputField
              type="text"
              value={title || initialValue.title}
              label="Title"
              name="name"
              onChange={handleChange}
            />

            <InputField
              type="text"
              value={description || initialValue.description}
              label="Description"
              name="name"
              onChange={handleDescChange}
            />

            <button
              className="button"
              onSubmit={(e: any) => handleSubmit(e, props.day, time)}
            >
              Submit
            </button>
            <button
              className="button"
              onClick={(e: any) => handleDelete(e, props.day, time)}
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
