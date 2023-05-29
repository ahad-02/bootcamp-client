//import { Modal } from "flowbite";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Card from "./Cards";
import CustomCards from "../components/customComponent/CustomCards";
import Modal from "./Modal";
import { useFetchData } from "../assets/hooks/hooks";
import { signOut } from "../assets/token";
import { useNavigate, useNavigation } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { isLoading, error, data } = useFetchData();
  const navigate = useNavigate();
  // const [fetchedData, setFetchedData] = useState(data);
  const handleRemove = () => {
    try {
      signOut();
      location.replace("/");
      //setTimeout(navigate("/"), 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const Menus = [
    { title: "Home", src: "Chart_fill" },
    { title: "Profile", src: "User" },
    { title: "About", src: "Chart_Fill" },
  ];
  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Oval
      height={80}
      width={80}
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
</div>; // Show a loading indicator; // Show a loading indicator
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Show an error message
  }
  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20"
        }  bg-teal-800 h-screen p-2  pt-5 relative duration-300`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-12 w-7 border-teal-900
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-3 items-center">
          <img
            src="./src/assets/logo-1.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-3 cursor-pointer text-white
               hover:bg-teal-600 bg-green-400 text-xl items-center gap-x-4
              ${Menu.gap ? "mt-9" : "mt-3"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={`./src/assets/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-screen flex-1 ">
        <div className="grid grid-cols-6 gap-4 bg-green-400">
          <div className="col-start-1 col-end-3 ...">
            <h1 className="text-3xl font-bold  text-white p-3 pt-4 ">
              Dashboard
            </h1>
          </div>
          <div className="col-end-7 col-span-2 ... flex justify-end p-2">
            <button
              className="bg-teal-900 text-white px-4 py-2 rounded-md m-2 flex "
              onClick={handleRemove}
            >
              Logout
            </button>
          </div>
        </div>
        <div>
          <button
            data-modal-target="defaultModal"
            data-modal-toggle="defaultModal"
            className="grid-rows-3	border-teal-900
              border-2 w-40 m-4 py-2 text-white  bg-teal-900 rounded-3xl transition-colors duration-300 hover:bg-teal-500"
            type="button"
            onClick={() => {
              setShowModal(true);
            }}
          >
            Add Activity
          </button>
          {showModal ? (
            <>
              <Modal callb={setShowModal} />
            </>
          ) : null}

          {/* <Link to="/Modal">          
            <button
              className="grid-rows-3	border-teal-900
           border-2 w-40 m-4 py-2 text-white  bg-teal-900 rounded-3xl transition-colors duration-300 hover:bg-teal-500"
            >
              Add Activity
            </button>
          </Link> */}
          {/* <Modals /> */}

          {/* <Card /> */}
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-2">
            <CustomCards
              title="Cycling Adventure"
              description="Explored scenic routes for 20 miles"
              activityType="Bicycle Ride"
              duration="1 hour"
              date="2023-02-11"
            />

            {data.map((item, i) => (
              <CustomCards
                key={i}
                id={item?._id}
                description={item.description}
                title={item.name}
                activityType={item.activityType}
                duration={item.duration}
                date={item.date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
