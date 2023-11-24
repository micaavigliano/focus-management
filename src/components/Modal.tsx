import React, { ReactNode, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, title }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" && onClose) {
      onClose();
    }
  };

  const handleFocus = (event: KeyboardEvent) => {
    const refElement = modalRef?.current;

    if (refElement) {
      const focusableElem = Array.from(
        refElement.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled")) as HTMLElement[];
      console.log(focusableElem);

      const firstFocusableElem = focusableElem[0];
      const lastFocusableElem = focusableElem[focusableElem.length - 1];
      const isTabPressed = event.key === "Tab";

      if (!isTabPressed) {
        return;
      }

      if (event.shiftKey) {
        if (document.activeElement === firstFocusableElem) {
          lastFocusableElem.focus();
          event.preventDefault();
        }
      } else if (document.activeElement === lastFocusableElem) {
        firstFocusableElem.focus();
        event.preventDefault();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      const interactiveElement =
        modalRef.current?.querySelector("[tabindex='-1']");
      if (interactiveElement) {
        if (interactiveElement instanceof HTMLElement) {
          interactiveElement.focus();
        }
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const currentRef = modalRef.current;
    currentRef?.addEventListener("keydown", handleFocus);

    return () => {
      currentRef?.removeEventListener("keydown", handleFocus);
    };
  }, []);

  return ReactDOM.createPortal(
    <dialog ref={modalRef} aria-labelledby="modal-id" aria-modal={true}>
      <div className="container-modal" onKeyUp={onKeyDown} tabIndex={-1}>
        <div className="container-info">
          <h2 className="title-modal" id="modal-id">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="btn-modal"
            aria-label="close modal"
          >
            x
          </button>
        </div>
        <div className="children-container">{children}</div>
      </div>
    </dialog>,
    document.getElementById("root") as HTMLElement
  );
};

export default Modal;
