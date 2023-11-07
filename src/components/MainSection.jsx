import React, { useState, useEffect } from "react";
import img1 from "../assets/img/offers/1.png";

import { toast, Toaster } from "react-hot-toast";

import axios from "axios";
import { BASE_API_URL } from "../keys";
import OfferItem from "./OfferItem";
import Shapes from "./Shapes";
const MainSection = ({
  hotels,
  checkInDate,
  checkOutDate,
  setDatePickerOpen,
  config,
}) => {
  console.log(hotels)

  const [userData, setUserData] = useState({
    Nome: "",
    Cognome: "",
    Email: "",
    Phone: "+39",
    postedDate: new Date().toDateString(),
    departure: null,

    arrival: null,
    packageBoard: null,
    rooms: [{ noofAdults: 2, noofChildren: 0, ages: [] }],
    Citta: "",
    note: "",
    Modulo: "infoischia",
    Hotel: null,

    numeroBagagliAlis: "1",
    ferry:
      "traghetto con auto fino 4 mt. da Pozzuoli A/R € 75 - passeggeri € 22",
    trasporto: "Bus",
    numeroBagagliViaggio: "",

    pricePerPerson: "",
    selectedCitta: "",
  });

  const [sending, setSending] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [value, setValue] = useState("");

  const handleUpdateRooms = (room, i) => {
    const updatedRooms = userData.rooms.map((r, index) => {
      if (i === index) return room;
      return r;
    });
    setUserData({ ...userData, rooms: updatedRooms });
  };

  const handleChangeValue = (value) => {};

  const handleChange = (name, value) => {};

  const handleSubmit = (
    arrival,
    departure,
    NomeModulo,
    Hotel,
    totalPriceForUser,
    packageBoard,
    handleScroll,
    handleOfferClose
  ) => {
    if (buttonDisabled) {
      toast.error("Wait for a while");
      return;
    }

    // setButtonDisabled(true);
    const dataToBePosted = {
      ...userData,
      arrival,
      departure,
      NomeModulo: "infoischia",
      Hotel,
      pricePerPerson: totalPriceForUser,
      packageBoard,
    };
    if (!userData.Nome) {
      toast.error("Devi inserire name");
      return;
    }
    if (!userData.Cognome) {
      toast.error("Devi inserire  cognome");
      return;
    }
    if (!userData.Email) {
      toast.error("Devi inserire  email");
      return;
    }
    if (!userData.Phone) {
      toast.error("Devi inserire Numero di Telefono");
      return;
    }
    if (!arrival || !arrival.length || arrival?.split("-")[0] === "NaN") {
      toast.error("Devi inserire Data Check In");
      return;
    }
    if (!departure || !departure.length || departure?.split("-")[0] === "NaN") {
      toast.error("Devi inserire  Data Check Out");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+\d{1,3}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

    if (!emailRegex.test(userData.Email)) {
      toast.error("si prega di inserire valido email.");
      return;
    }
    if (!phoneRegex.test(userData.Phone)) {
      toast.error("si prega di inserire valido Numero di Telefono.");
      return;
    }

    if (!value) {
      toast.error("Seleziona una opzione sopra");
      handleScroll();
      return;
    }
    switch (value) {
      case "aliscafo":
        if (!userData.numeroBagagliAlis) {
          toast.error("Devi inserire  Numero di Bagagli");
          return;
        } else
          dataToBePosted.Citta = `Aliscafo + Transfer | ${userData.numeroBagagliAlis}`;
        break;
      case "ferry":
        if (!userData.ferry) {
          toast.error("Devi inserire  Dimensione Auto");
          return;
        } else
          dataToBePosted.Citta = `Traghetto + Transfer | ${userData.ferry}`;
        break;

      case "viaggio":
        if (!userData.trasporto) {
          toast.error("Devi inserire  Tipo di trasporto preferito");
          return;
        }
        if (!userData.numeroBagagliViaggio) {
          toast.error("Devi inserire Città di Partenza");

          return;
        }

        dataToBePosted.Citta = `${userData.numeroBagagliViaggio} con ${userData.trasporto}`;

        break;

      default:
        dataToBePosted.Citta = "";
    }

    setSending(true);
    axios
      .post(`${BASE_API_URL}/api/enquiry`, { ...dataToBePosted })
      .then((res) => {
        toast.success("Success");
        setSending(false);
        setButtonDisabled(true);

        setTimeout(() => {
          handleOfferClose();
        }, 8000);
        setTimeout(() => {
          setButtonDisabled(false);
        }, 10000);
        // setUserData({
        //     Nome: '',
        //     Cognome: '',
        //     Email: '',
        //     Phone: '',
        //     postedDate: new Date().toDateString(),
        //     arrival: formatDate(checkOutDate),
        //     departure: formatDate(checkInDate),
        //     packageBoard: 'Half Board',
        //     rooms: [{ noofAdults: 2, noofChildren: 0, ages: [] }],
        //     Citta: '',
        //     note: '',
        //     NomeModulo,
        //     Hotel,
        //     numeroBagagliAlis: '1 bagaglio',
        //     ferry: '',
        //     trasporto: 'Bus da 85€',
        //     numeroBagagliViaggio: 'Milano',

        //     pricePerPerson: totalPriceForUser,
        //     selectedCitta: '',
        // });
      })
      .catch((err) => {
        setSending(false);
        console.log(err);
        toast.error(err.response?.data.message || "Internal server error");
      });
  };
  const [filters, setFilters] = useState({
    fascio: { min: 0, max: 5000 },
    distance: { min: 0, max: 5000 },
    stelle: 0,
    comune : "Tutta l'isola"
  });

  useEffect(() => {
    // Make changes to a newFilters object and update filters once at the end
    let newFilters = { ...filters }; // Make a copy of the current filters
      // console.log(config,"FASD")
      newFilters = {
        ...newFilters,
        comune : config.comune.name
      };
    if (config.fascio.name === "fino a 40€") {
      newFilters = {
        ...newFilters,
        fascio: { min: 0, max: 40 },
      };
    } else if (config.fascio.name === "tra 40€ e 80€") {
      newFilters = {
        ...newFilters,
        fascio: { min: 40, max: 80 },
      };
    } else if (config.fascio.name === "più di 80€") {
      newFilters = {
        ...newFilters,
        fascio: { min: 80, max: 5000 },
      };
    } else if (config.fascio.name === "Tutti") {
      newFilters = {
        ...newFilters,
        fascio: { min: 0, max: 5000 },
      };
    }

    if (config.stelle.name === "Tutti") {
      newFilters = {
        ...newFilters,
        stelle: 0,
      };
    } else if (config.stelle.name === "2 stelle") {
      newFilters = {
        ...newFilters,
        stelle: 2,
      };
    } else if (config.stelle.name === "3 stelle") {
      newFilters = {
        ...newFilters,
        stelle: 3,
      };
    } else if (config.stelle.name === "4 stelle") {
      newFilters = {
        ...newFilters,
        stelle: 4,
      };
    } else if (config.stelle.name === "5 stelle") {
      newFilters = {
        ...newFilters,
        stelle: 5,
      };
    }

    if (config.distance.name === "0 mt - 500 mt") {
      newFilters = {
        ...newFilters,
        distance: { min: 0, max: 500 },
      };
    } else if (config.distance.name === "500 mt - 1 km") {
      newFilters = {
        ...newFilters,
        distance: { min: 500, max: 1000 },
      };
    } else if (config.distance.name === "1 km+") {
      newFilters = {
        ...newFilters,
        distance: { min: 1000, max: 5000 },
      };
    }

    // Update filters only once at the end with all the changes
    setFilters(newFilters);
  }, [config]);

  // console.log(hotels)

  return (
    <>
      <section className="main-section">
        <Toaster />
        <div className="shapes">
          <Shapes />
        </div>
        <div className="container">
          <h3 className="text-base font-medium m-title">
            Le migliori offerte per te!
          </h3>
          <div className="d-flex flex-column gap-36">
            {hotels.slice(0, 2).map((hotel, i) => {
              // let bestPossiblePrice = 10000;
              // hotel.offers?.map((item, id) => {
              //   // {console.log(item, " ::: Offer")}
              //   if (item?.minStay === item?.maxStay) {
              //     const myVar =
              //       item?.breakdown[0]?.price ||
              //       item?.breakdown[1]?.price ||
              //       item?.breakdown[2]?.price;
              //     if (bestPossiblePrice > myVar) {
              //       bestPossiblePrice=myVar;
              //     }
              //   } else {
              //     let calculatedNights = Math.abs(
              //       (new Date(checkInDate) - new Date(checkOutDate)) /
              //         (1000 * 60 * 60 * 24)
              //     );
              //     if (calculatedNights < item?.minStay) {
              //       calculatedNights = item.minStay;
              //     } else if (calculatedNights > item?.maxStay) {
              //       calculatedNights = item.maxStay;
              //     }
              //     const myVar2 =
              //       (item?.breakdown[0]?.price ||
              //         item?.breakdown[1]?.price ||
              //         item?.breakdown[2]?.price) * calculatedNights;

              //     if (bestPossiblePrice > myVar2) {
              //       bestPossiblePrice=myVar2;
              //     }
              //   }
              //   hotel.bestPossiblePrice = bestPossiblePrice;
              // });
              return (
                <>
                  {
                  // hotel?.offers[0].breakdown[0]?.price <= filters.fascio.max &&
                  //   hotel?.offers[0].breakdown[0]?.price >= filters.fascio.min &&
                    (filters.comune == "Tutta l'isola" ?1 : hotel?.state==filters.comune) &&
                    (filters.stelle ==0 ? 1: filters.stelle == hotel?.rating )&& hotel?.distance[1].distance >= filters.distance.min && hotel?.distance[1].distance <= filters.distance.max
                    ? (
                      <OfferItem
                        config={config}
                        setUserData={setUserData}
                        userData={userData}
                        sending={sending}
                        setvalue={setValue}
                        value={value}
                        handleSubmit={handleSubmit}
                        buttonDisabled={buttonDisabled}
                        handleUpdateRooms={handleUpdateRooms}
                        offer
                        key={i}
                        index={i + 1}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        setDatePickerOpen={setDatePickerOpen}
                        hotel={{ ...hotel, img: [img1, img1, img1] }}
                      />
                    ) : null}
                  {/* <OfferItem
                    config={config}
                    setUserData={setUserData}
                    userData={userData}
                    sending={sending}
                    setvalue={setValue}
                    value={value}
                    handleSubmit={handleSubmit}
                    buttonDisabled={buttonDisabled}
                    handleUpdateRooms={handleUpdateRooms}
                    offer
                    key={i}
                    index={i + 1}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                    setDatePickerOpen={setDatePickerOpen}
                    hotel={{ ...hotel, img: [img1, img1, img1] }}
                  /> */}
                </>
              );
            })}
          </div>
          <br />
          <br />
          {hotels.length > 2 ? (
            <h3 className="text-base font-medium m-title">
              Ecco altre offerte che ti potrebbero piacere.
            </h3>
          ) : (
            <></>
          )}
          {hotels.slice(2).map((hotel, i) => {
            return (
              <div style={{ marginTop: "2rem" }}>
                {
                // hotel?.offers[0].breakdown[0]?.price <= filters.fascio.max &&
                // hotel?.offers[0].breakdown[0]?.price >= filters.fascio.min &&
                (filters.comune == "Tutta l'isola" ?1 : hotel?.state==filters.comune) &&
                (filters.stelle == 0 ? 1 : filters.stelle == hotel?.rating) &&
                hotel?.distance[1].distance ? (hotel?.distance[1].distance >= filters.distance.min &&
                hotel?.distance[1].distance <= filters.distance.max) :1 ? (
                  <OfferItem
                    setUserData={setUserData}
                    userData={userData}
                    sending={sending}
                    setvalue={setValue}
                    value={value}
                    handleSubmit={handleSubmit}
                    handleUpdateRooms={handleUpdateRooms}
                    buttonDisabled={buttonDisabled}
                    offer={false}
                    key={i}
                    index={i + "--" + 1}
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                    setDatePickerOpen={setDatePickerOpen}
                    hotel={{ ...hotel, img: [img1, img1, img1] }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default MainSection;
