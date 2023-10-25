import React, { useEffect, useState } from 'react';
import { AngleDown, AngleUp } from './Icon';

function SelectDropDown({ selectedOption, selectItems, handleChange }) {
    const [activeSelectIndex, setActiveSelectIndex] = useState(selectedOption);
    const [selectOpen, setSelectOpen] = useState(false);

    useEffect(() => {
        setActiveSelectIndex(selectedOption);
    }, [selectedOption]);
    if (!selectItems) return <></>;
    return (
        <h6>
            {selectItems[activeSelectIndex]?.text}
            {selectItems.length > 0 ? (
                <>
                    {selectOpen ? (
                        <span className="relative">
                            <span onClick={() => setSelectOpen(false)}>
                                <AngleUp color="var(--title)" />
                            </span>

                            <ul className="bg-white rounded-md absolute p-2 top-0 left-0 w-[8rem]">
                                {selectItems.map((item, i) => (
                                    <li
                                        className="mt-2 cursor-pointer w-100  hover:text-orange-400 "
                                        key={i}
                                        onClick={() => {
                                            setActiveSelectIndex(i);
                                            handleChange(i);
                                            setSelectOpen(false);
                                        }}
                                    >
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        </span>
                    ) : selectItems.length > 1 ? (
                        <span onClick={() => setSelectOpen(true)}>
                            <AngleDown color="var(--title)" />
                        </span>
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <></>
            )}
        </h6>
    );
}

export default SelectDropDown;
