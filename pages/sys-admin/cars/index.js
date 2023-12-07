"use Client";

import AdminWrapper from "@/components/adminWrapper";
import Image from "next/image";
import logo from "@/pages/assets/Garilagbe.png";
import localFont from "next/font/local";
import { useSession } from "next-auth/react";
import buttonStyles from "@/styles/buttons.module.css";
import { useEffect, useState, useRef } from "react";

const font = localFont({
  src: "../../assets/font/TeX-Gyre-Adventor/texgyreadventor-regular.otf",
});
const fontBold = localFont({
  src: "../../assets/font/TeX-Gyre-Adventor/texgyreadventor-bold.otf",
});

export default function Cars() {
  const [cars, setCars] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  const searchRef = useRef();

  useEffect(() => {
    async function getCars() {
      const res = await fetch("/api/cars/get-cars");
      const data = await res.json();
      setCars(data);
    }
    getCars();
  }, []);

  useEffect(() => {
    if (searchTerm !== "") {
      console.log(searchTerm);
      const filteredCars = cars.filter((car) => {
        return (
          car.name.toLowerCase().includes(searchTerm) ||
          car.car_ID.toLowerCase().includes(searchTerm) ||
          car.VIN.toLowerCase().includes(searchTerm) ||
          car.number_plate.toLowerCase().includes(searchTerm) ||
          car.body.toLowerCase().includes(searchTerm)
        );
      });
      setFilteredCars(filteredCars);
    } else {
      setFilteredCars(cars);
    }
  }, [cars, searchTerm]);

  const { data: session } = useSession();
  return (
    <AdminWrapper>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg  mt-14">
          <div className="flex flex-row w-full align-center text-center justify-space-between mb-4">
            <div className={`py-1 ${fontBold.className} text-lg`}>
              Cars ({cars && Object.keys(cars).length})
            </div>
            <div className="flex-1"></div>
            <div>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                ref={searchRef}
                onChange={(e) => {
                  setSearchTerm((prev) => e.target.value.toLowerCase());
                  console.log(searchTerm);
                }}
                className="w-full border-1 border-gray-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
              ></input>
            </div>
            <a href="/sys-admin/cars/add-new">
              <div className={`flex flex-row ml-4 ${buttonStyles.button1}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clip-rule="evenodd"
                  />
                </svg>

                <div className="pl-2">Add a new car</div>
              </div>
            </a>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
              gap: "10px",
            }}
          >
            {filteredCars &&
              filteredCars.map((car) => {
                return (
                  <div
                    className="w-full hover:bg-gray-100 cursor-pointer"
                    style={{
                      border: "1px dashed grey",
                      padding: "15px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    <div className={`${fontBold.className} flex flex-row`}>
                      <div
                        className="flex-[1] text-lg"
                        onClick={() => {
                          window.location.href = `/sys-admin/cars/${car.car_ID}`;
                        }}
                      >
                        {car.name} [{car.number_plate}]
                      </div>
                      <div
                        onClick={async () => {
                          const res = await fetch("/api/cars/delete-car", {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ car_ID: car.car_ID }),
                          });
                          const data = await res.json();
                          console.log(data);
                          window.location.reload();
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-gray-500 hover:text-red-500 cursor-pointer"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </div>
                    </div>
                    <div
                      className="text-xs"
                      onClick={() => {
                        window.location.href = `/sys-admin/cars/${car.car_ID}`;
                      }}
                    >
                      <span className={`${fontBold.className}`}>Car ID: </span>
                      {car.car_ID}
                    </div>
                    <div
                      className="text-xs"
                      onClick={() => {
                        window.location.href = `/sys-admin/cars/${car.car_ID}`;
                      }}
                    >
                      <span className={`${fontBold.className}`}>VIN: </span>
                      {car.VIN}
                    </div>
                    <div
                      // className="text-xs"
                      onClick={() => {
                        window.location.href = `/sys-admin/cars/${car.car_ID}`;
                      }}
                    >
                      <Image
                        src={car.carImageURL}
                        height={200}
                        width={300}
                        className="w-full mt-2 h-[250px] object-cover"
                        style={{ borderRadius: "15px" }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </AdminWrapper>
  );
}

Cars.auth = {
  required: true,
  role: "admin",
  loading: <div>Loading...</div>,
  redirect: "/sys-admin/login",
};
