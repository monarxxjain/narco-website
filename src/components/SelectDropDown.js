import React, { useState } from "react";
import { AngleDown, AngleUp } from "./Icon";

function SelectDropDown({ selectedOption, selectItems, handleChange }) {
  const [activeSelectIndex, setActiveSelectIndex] = useState(
    (selectItems[2].price && 2) ||
      (selectItems[1].price && 1) ||
      (selectItems[0].price && 0)
  );
  const [selectOpen, setSelectOpen] = useState(false);

  if (!selectItems) return <></>;

  return (
    <h6>
      {selectItems[activeSelectIndex]?.name}
      {selectedOption.length > 0 ? (
        <>
          {selectOpen ? (
            <span className="relative">
              <span onClick={() => setSelectOpen(false)}>
                <AngleUp color="var(--title)" />
              </span>

              <ul className="bg-white rounded-md absolute p-2 top-0 left-0 w-[8rem]">
                {selectItems?.map((item, i) => (
                  <li
                    className=" "
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
