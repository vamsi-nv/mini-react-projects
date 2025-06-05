import { useState } from "react";
import data from "./data.js";

function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multipleItems, setMultipleItems] = useState([]);

  const handleSingleSelection = (id) => {
    console.log(id);
    setSelected(id === selected ? null : id);
  };

  const handleMultiSelection = (id) => {
    {
      let cpyMultipleItems = [...multipleItems];
      const findIndexOfCurrentItem = cpyMultipleItems.indexOf(id);
      findIndexOfCurrentItem < 0
        ? cpyMultipleItems.push(id)
        : cpyMultipleItems.splice(findIndexOfCurrentItem, 1);

      setMultipleItems(cpyMultipleItems);
    }
  };

  console.log(selected, multipleItems);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-4/5 sm:w-2xl">
        <h1 className="text-4xl font-semibold mb-15">Accordian</h1>
        <button
          onClick={() => {
            if (enableMultiSelection) {
              setMultipleItems([]);
              setSelected(multipleItems[multipleItems.length - 1] ?? null); // leave the last selected items open
            } else {
              setSelected(null);
            }

            setEnableMultiSelection(!enableMultiSelection);
          }}
          className="bg-blue-500 text-white py-2 px-3 rounded-full cursor-pointer mb-4"
        >
          {!enableMultiSelection
            ? "Enable Multi-Selection"
            : "Disable Multi-Selection"}
        </button>
        {data && data.length > 0 ? (
          data.map((dataItem, index) => (
            <div
              key={index}
              className="shadow p-5 w-full mb-4 border rounded border-gray-300"
            >
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="flex items-center justify-between text-xl font-semibold mb-2 cursor-pointer"
              >
                <h1>{dataItem.question}</h1>
                <span>
                  {enableMultiSelection
                    ? multipleItems.includes(dataItem.id)
                      ? "-"
                      : "+"
                    : selected === dataItem.id
                    ? "-"
                    : "+"}
                </span>
              </div>
              {selected === dataItem.id ||
              multipleItems.indexOf(dataItem.id) !== -1 ? (
                <div>{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}

export default Accordian;
