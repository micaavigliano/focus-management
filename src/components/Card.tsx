import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { User } from "../interface";
import dayjs from "dayjs";

interface CardProps {
  item: User[];
}

const Card: React.FC<CardProps> = ({ item }) => {
  const [itemId, setItemId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleClick = (id: number) => {
    setItemId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const formattedDay = (day: string) => {
    const date = dayjs(day).format("MMMM D, YYYY h:mm A");

    return date;
  };

  useEffect(() => {
    if (!modalOpen) {
      const buttonToFocus = document.querySelector(
        `button[data-item-id="${itemId}"]`
      );

      if (buttonToFocus instanceof HTMLElement) {
        buttonToFocus.focus();
      }
    }
  }, [modalOpen, itemId]);

  return (
    <>
      {item.map((data: User) => (
        <section
          className="card-container"
          key={data.id}
          aria-label={`info about ${data.name}`}
          aria-labelledby="user-name"
        >
          <div>
            <img src={data.avatar} alt={`${data.name} avatar profile`} />
            <div>
              <div>
                <p className="name-container" id="user-name">
                  {data.name}
                </p>
                <p className="hour-container">
                  {formattedDay(data.created_at!)}
                </p>
              </div>
              <button
                onClick={() => handleClick(data.id!)}
                data-item-id={data.id}
                aria-label={`more info about ${data.name}`}
                className="more-info"
              >
                More info
              </button>
              {modalOpen && itemId === data.id && (
                <Modal
                  isOpen={modalOpen}
                  title={data.name}
                  onClose={closeModal}
                >
                  <>
                    <div className="modal-content">
                      <p>
                        Website: <a href={data.website}>{data.website}</a>
                      </p>
                    </div>
                    <div className="desc-container">
                      <p>{data.description}</p>
                    </div>
                  </>
                </Modal>
              )}
            </div>
          </div>
        </section>
      ))}
    </>
  );
};

export default Card;
