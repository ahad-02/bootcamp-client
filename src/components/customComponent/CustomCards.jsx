import React, { useState } from "react";
import Modal from "../Modal";
import { useActivityDelete } from "../../assets/hooks/hooks";
import CustomEditModal from "./CustomEditModal";

export const CustomCards = ({
  id,
  title,
  description,
  activityType,
  duration,
  date,
  onDelete,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showEidtModal, setEditShowModal] = useState(false);
  const deleteFn = useActivityDelete();

  const onSuccessCb = async (data) => {
    try {
      // <Link to="/Sidebar"></Link>;
      console.log("delete: ", data);
    } catch (error) {
      console.log("delte : ", error);
    }
  };

  const onErrorCb = async (error) => {
    console.log("error : ", error.message);
  };
  const handleDelete = () => {
    //onDelete(id);
    console.log(" id ksksksk: ", id);
    const mutationArgs = {
      id,
      onSuccessCb,
      onErrorCb,
    };
    deleteFn.mutate(mutationArgs);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-300 m-6 grid ">
      <div className="px-4 pt-4">
        {/* <div className="bg-white rounded-lg shadow-md p-4"> */}
        <h2 className="card_title font-bold">{title}</h2>
        <p className="card_description">{description}</p>
        <p className="activity_type">{activityType}</p>
        <p className="card_duration">{duration}</p>
        <p className="card_date">{date}</p>
      </div>

      <div className="px-4  flex justify-center pt-6 pb-2">
        <button
          data-modal-target="defaultModal"
          data-modal-toggle="defaultModal"
          className="bg-teal-900 text-white px-4 py-2 rounded-md m-2"
          type="button"
          onClick={() => {
            setEditShowModal(true);
          }}
        >
          EDIT
        </button>
        {showEidtModal ? (
          <>
            <CustomEditModal
              callb={setEditShowModal}
              title={title}
              id={id}
              description={description}
              duration={duration}
              activityType={activityType}
              date={date}
            />
          </>
        ) : null}
        {showModal ? (
          <>
            <Modal callb={setShowModal} />
          </>
        ) : null}

        <button
          className="bg-teal-900 text-white px-4 py-2 rounded-md m-2"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default CustomCards;
