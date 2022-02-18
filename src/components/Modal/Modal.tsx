import React from "react";
// import "./index.css";
import styled from "styled-components";

const ModalContainer = styled.div`
  width: 90%;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`;

const ModalContainerBasic = styled.div`
  position: fixed;
  z-index: 20;
  background: #fff;
  width: 500px;

  /* Center the modal */
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const Header = styled.div`
  background: beige;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  .close-button {
    border: none;
    background: transparent;
    padding: 10px;
    cursor: pointer;
    color: black;
    font-size: 36px;
  }
`;

const Button = styled.button`
  background: green;
  border: none;
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
  .button:hover {
    background: orange;
  }
`;

const Modal = ({ title, children, onClose, isOpen }: any) => {
  return (
    <ModalContainer>
      {isOpen && (
        <>
          <Overlay></Overlay>
          <ModalContainerBasic>
            <Header>
              <h2>{title}</h2>
              <Button onClick={onClose} className="close-button">
                &times;
              </Button>
            </Header>
            <div style={{ padding: "20px" }}>
              <p>{children}</p>
            </div>
          </ModalContainerBasic>
        </>
      )}
    </ModalContainer>
  );
};

export default Modal;
