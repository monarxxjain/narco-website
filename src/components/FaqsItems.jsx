import React, { useState } from "react";
import { CheckIcon, Minus, Plus } from "./Icon";

export const FaqsItems = ({ data, id }) => {
  console.log(data);
  const [open, setOpen] = useState(0);
  return (
    <div className="accordion" id={id}>
      {Array.isArray(data) &&
        data?.map(({ title, paragraph, text, icon }, i) => (
          <div className="accordion-item" key={i}>
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#accordion-${id}-${i}`}
                aria-expanded="true"
                onClick={() => {
                  i == open ? setOpen(null) : setOpen(i);
                }}
              >
                {/* data-bs-toggle="collapse" data-bs-target="#collapseOne"
							aria-expanded="true" ="collapseOne" */}
                <span className="me-2">{title} </span>
                <span className="plus ms-auto">
                  {open !== i ? <Plus /> : <Minus />}
                </span>
              </button>
            </h2>
            <div
              id={`accordion-${id}-${i}`}
              className={`accordion-collapse collapse ${i == 0 ? "show" : ""}`}
              data-bs-parent={`#${id}`}
            >
              <div className="accordion-body">
                {paragraph && (
                  <p dangerouslySetInnerHTML={{ __html: paragraph }}></p>
                )}
                {text?.length ? (
                  <ul>
                    {text?.map((item, i) => (
                      <li key={i}>
                        <CheckIcon /> {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FaqsItems;
