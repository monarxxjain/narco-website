import React, { useState } from "react";
import { AngleDown, AngleUp } from "./Icon";

function SelectDropDown({ selectedOption, selectItems, handleChange }) {
  const [activeSelectIndex, setActiveSelectIndex] = useState(
    (selectItems[0]?.price != 0 && "0") ||
    (selectItems[1]?.price != 0 && "1") ||
    (selectItems[2]?.price && "2")
  );
  const [selectOpen, setSelectOpen] = useState(false);

  if (!selectItems) return <></>;

  return (
    <h6 className="pointer">
      <p onClick={() => setSelectOpen(!selectOpen)}>{selectItems[activeSelectIndex]?.name}</p>
      {selectedOption.length > 0 ? (
        <>
          {selectOpen ? (
            <span className="relative">
              <span onClick={() => setSelectOpen(false)}>
                <AngleUp color="var(--title)" />
              </span>

              <ul className="bg-white rounded-md absolute p-2 top-8 left-[-12rem] w-[14rem]">
                {selectItems?.map((item, i) => (
                  item?.price != 0 && <li
                    className="breakdown-selector"
                    key={i}
                    onClick={() => {
                      setActiveSelectIndex(i);
                      handleChange(i);
                      setSelectOpen(false);
                    }}
                  >
                    {item.name}
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
