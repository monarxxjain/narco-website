import React, { useState } from "react";
import { CheckIcon, Minus, Plus } from "./Icon";

export const FaqsItems = ({ data, id }) => {
  const [open, setOpen] = useState(0);

  return (
    <div className="accordion" id={id}>
      {Array.isArray(data) &&
        data?.map(({ title, paragraph, text, data, supliment, icon }, i) => (
          <>
            {paragraph && (
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
                  className={`accordion-collapse collapse ${
                    i == 0 ? "show" : ""
                  }`}
                  data-bs-parent={`#${id}`}
                >
                  <div className="accordion-body">
                    {paragraph && (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: paragraph !== true ? paragraph : "",
                        }}
                      ></p>
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
                    {supliment && supliment.length && (
                      <ul>
                        {supliment?.map((item, i) => (
                          <li key={i}>
                            <p>
                              {item?.name} - {item?.price}
                              {item?.currency || "€"}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                    {data && data.length && (
                      <ul>
                        {data?.map((item, i) => (
                          <li key={i}>
                            <p>
                              Bambini da{" "}
                              {(data.length === 1 && "0") ||
                              data[i - 1]?.agelimit + 1 < data[i]?.agelimit
                                ? data[i - 1]?.agelimit + 1
                                : (data.length > 1 &&
                                    data[i - 2]?.agelimit + 1) ||
                                  0}{" "}
                              a {item?.agelimit} anni (esclusi):{" "}
                              {Math.abs(item?.discount)}
                              {(item?.discount &&
                                item?.discount > -1 &&
                                "%  di sconto") ||
                                "€ (al giorno)"}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
    </div>
  );
};

export default FaqsItems;
