/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Header from './components/Header';
import MainSection from './components/MainSection';
import axios from 'axios';
import formatDate from './utils/formatDate';
import Loading from './components/Layouts/Loading';
import { Toaster, toast } from 'react-hot-toast';
import getDateString from './utils/getDateString';
import { BASE_API_URL } from './keys';
import { useSearchParams } from 'react-router-dom';

function Home() {
    const [loadingInitialData, setLoadingInitialData] = useState(false);
    const [loadingHotels, setloadingHotels] = useState(false);
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);
    const [initialConfigData, setInitialConfigData] = useState(null);

    const [lastChange, setLastChange] = useState(null);

    const [datePickerOpen, setDatePickerOpen] = useState(false);

    const [config, setConfig] = useState(null);
    const [hotels, setHotels] = useState([]);

    const [comunes, setComunes] = useState([]);

    const [stelles, setStelles] = useState([]);

    const [fascias, setFascias] = useState([]);

    const [distances, setDistances] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    const loadInitialConfig = async () => {
        try {
            setLoadingInitialData(true);

            const response = await axios.get(`${BASE_API_URL}/api/data/initialhoteldata`);

            response.data && setInitialConfigData((prevData) => response.data);
            setInitialDataLoaded(true);

            response.data && setComunes(response.data.comunes);
            response.data && setStelles(response.data.stelles);
            response.data && setFascias(response.data?.fascio);
            response.data && setDistances(response.data.distances);
        } catch (err) {
            setLoadingInitialData(false);
            toast.error('Error loading initial props');
            console.log(err);
        }
    };

    const setConfigFromInitialAppState = () => {
        const checkin = searchParams.get('checkin');
        const checkout = searchParams.get('checkout');

        const config = {
            fascio: initialConfigData?.fascio[0],
            distance: initialConfigData.distances[0],
            comune: initialConfigData.comunes[0],
            stelle: initialConfigData.stelles[0],
        };
        if (!checkin || !checkout) {
            config.checkInDate = initialConfigData.dateAfterTwoDays;
            config.checkOutDate = initialConfigData.dateAfterAWeek;
        }

        try {
            const formattedCheckInDate = formatDate(checkin, 'checkin');
            const formattedCheckOutDate = formatDate(checkout, 'checkout');
            if (formattedCheckInDate > formattedCheckOutDate) {
                throw Error;
            } else {
                config.checkInDate = formattedCheckInDate;
                config.checkOutDate = formattedCheckOutDate;
            }
        } catch (err) {
            config.checkInDate = initialConfigData.dateAfterTwoDays;
            config.checkOutDate = initialConfigData.dateAfterAWeek;
        }

        setConfig(config);
    };

    const loadHotels = async () => {
        try {
            setloadingHotels(true);

            const hotels = await axios.post(`${BASE_API_URL}/api/data/hotelData`, {
                ...config,
                lastChange,
                currentComunes: comunes,
                currentDistances: distances,
                currentStelles: stelles,
                currentFascio: fascias,
            });
            setHotels(hotels.data.hotels);

            setLastChange(null);

            // setConfig({ ...config, comune: hotels.data.filters.selectedComune });
            // setInitialConfigData({ ...initialConfigData });
            setComunes(hotels.data.filters.comunes);

            setStelles(hotels.data.filters.stelles);

            setDistances(hotels.data.filters.distances);

            setFascias(hotels.data.filters.fascias);
            // selectedComune,
            // comunes: comunesWithName,
        } catch (err) {
            setHotels([]);
            toast.error('Error loading hotels');
            setLastChange(null);

            setloadingHotels(false);
        }
    };

    const handleConfigChange = (type, value) => {
        setConfig({ ...config, [type]: value });
        setLastChange(type);
    };

    useEffect(() => {
        if (!initialDataLoaded) {
            loadInitialConfig();
        }
    }, []);

    useEffect(() => {
        if (initialConfigData) {
            setLoadingInitialData(false);
            setConfigFromInitialAppState();
        }
    }, [initialConfigData]);

    useEffect(() => {
        if (config) {
            loadHotels().catch((err) => {});
            const checkInDateString = getDateString(config.checkInDate);
            const checkOutDateString = getDateString(config.checkOutDate);
            setSearchParams(`?${new URLSearchParams({ checkin: checkInDateString, checkout: checkOutDateString })}`);
        }
    }, [config]);

    useEffect(() => {
        if (hotels) {
            setloadingHotels(false);
        }
    }, [hotels]);

    return (
        <>
            <Toaster />
            <Header />
            {loadingInitialData || loadingHotels || !initialConfigData ? (
                <Loading />
            ) : (
                <>
                    <Banner
                        initialConfigData={initialConfigData}
                        comunes={comunes}
                        stelles={stelles}
                        fascias={fascias}
                        distances={distances}
                        config={config}
                        handleConfigChange={handleConfigChange}
                    />
                    {hotels.length ? (
                        <MainSection
                            hotels={hotels}
                            checkInDate={config.checkInDate}
                            checkOutDate={config.checkOutDate}
                            setDatePickerOpen={setDatePickerOpen}
                        />
                    ) : (
                        <h1 style={{ minHeight: '10rem', padding: '2rem' }}>Nessun hotel trovato</h1>
                    )}
                    <Footer
                        comunes={comunes}
                        initialConfigData={initialConfigData}
                        config={config}
                        stelles={stelles}
                        setConfig={setConfig}
                        datePickerOpen={datePickerOpen}
                    />
                </>
            )}
        </>
    );
}

export default Home;
