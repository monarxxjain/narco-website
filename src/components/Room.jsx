import React, { useEffect, useState } from 'react';
import Input from './Input';

function Room({ roomData, id, removeRoom, handleUpdateRoom }) {
    const [options, setOptions] = useState({});

    useEffect(() => {
        setOptions({
            adults: Array.from({ length: 4 - roomData.noofChildren }, (_, index) => ({
                val: index + 1,
                text: index + 1,
            })),
            chilren: Array.from({ length: 4 - roomData.noofAdults + 1 }, (_, index) => ({ val: index, text: index })),
            ages: Array.from({ length: 17 }, (_, index) => ({ val: index + 1, text: index + 1 })),
        });
    }, [roomData]);

    const handleAgeChange = (i, value) => {
        const changedAges = roomData.ages.map((age, index) => {
            if (index === i) return value;
            else return age;
        });
        // setRoomData(() => ({ ...roomData, ages: changedAges }));
        handleUpdateRoom({ ...roomData, ages: changedAges }, id);
    };

    const handleChange = (e) => {
        // setRoomData({ ...roomData, [e.target.name]: e.target.value });
        handleUpdateRoom({ ...roomData, [e.target.name]: e.target.value }, id);
    };

    const handleNoofChildren = (value) => {
        const dataDiff = value - roomData.noofChildren;
        let ages = roomData.ages;
        if (dataDiff <= 0) ages = ages.slice(0, value);
        else {
            ages = ages.concat(Array(dataDiff).fill(12));
        }

        handleUpdateRoom({ ...roomData, ages, noofChildren: value }, id);
    };
    return (
        <div>
            <h5 className="text-base mt-4 r-title">
                {`Numero di persone (Stanza ${id + 1})`}{' '}
                {id > 0 && (
                    <button
                        className="border-0 outline-0 bg-transparent text-danger d-none d-sm-inline-block"
                        onClick={() => removeRoom(id)}
                    >
                        Rimuovi stanza {id + 1}
                    </button>
                )}
            </h5>
            <div className="row g-3">
                <div className="col-sm-6 col-md-3 col-lg-2">
                    <Input
                        name="noofAdults"
                        select
                        handleChange={handleChange}
                        value={roomData.noofAdults}
                        label="Adulti"
                        options={options.adults}
                    />
                </div>
                <div className="col-sm-6 col-md-3 col-lg-2">
                    <Input
                        name="noofChildren"
                        value={roomData.noofChildren}
                        label="Bambini"
                        handleChange={(e) => {
                            handleNoofChildren(e.target.value);
                        }}
                        select
                        options={options.chilren}
                    />
                </div>

                {Array.from({ length: roomData.noofChildren }, (_, index) => index).map((i) => (
                    <div className="col-sm-6 col-md-3 col-lg-2">
                        <Input
                            value={roomData.ages[i]}
                            handleChange={(e) => {
                                handleAgeChange(i, e.target.value);
                            }}
                            select
                            options={options.ages}
                            label={`Età ${i + 1}`}
                            placeholder="DD/MM/YY"
                        />
                    </div>
                ))}
            </div>
            <div className="text-center mt-2">
                {id > 0 ? (
                    <button
                        className="border-0 outline-0 bg-transparent text-danger d-sm-none"
                        onClick={() => removeRoom(id)}
                    >
                        Rimuovi stanza {id + 1}
                    </button>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Room;
