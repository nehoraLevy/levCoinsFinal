import React, { useState } from "react";
import SelectSearch, { fuzzySearch } from "react-select-search";
import "./select-search.css";

export const SelectSearchComponent = () => {
  const [value, setValue] = useState("annie.cruz");
  const [multipleValues, setMultipleValues] = useState([]);

  const options = [
    {
      name: "Annie Cruz",
      value: "annie.cruz",
      photo: "https://randomuser.me/api/portraits/women/60.jpg"
    },
    {
      name: "Eli Shelton",
      disabled: true,
      value: "eli.shelton",
      photo: "https://randomuser.me/api/portraits/men/7.jpg"
    },
    {
      name: "Loretta Rogers",
      value: "loretta.rogers",
      photo: "https://randomuser.me/api/portraits/women/51.jpg"
    },
    {
      name: "Lloyd Fisher",
      value: "lloyd.fisher",
      photo: "https://randomuser.me/api/portraits/men/34.jpg"
    },
    {
      name: "Tiffany Gonzales",
      value: "tiffany.gonzales",
      photo: "https://randomuser.me/api/portraits/women/71.jpg"
    }
  ];

  async function onAsyncChange(selectedValue) {
    console.log("userSelected value is = ", selectedValue);

    // but maybe after some validation done on BE actual value didn't change (equals to previous)
    await new Promise((res) => setTimeout(() => res(), 1000));

    console.log(
      "still reusing previous value for SelectSearch = ",
      options[0].value
    );
    setValue(options[0].value);
  }

  return (
    <div className="App">
      <h1>Testing &lt;Select/&gt;</h1>
      <div style={{ margin: "0 auto", width: 300 }}>
        <SelectSearch
          options={options}
          value={value}
          onChange={onAsyncChange}
          search
          filterOptions={fuzzySearch}
          placeholder="Search something"
        />
      </div>
      <div style={{ margin: "0 auto", width: 300, marginTop: 100 }}>
        <SelectSearch
          multiple={true}
          printOptions={"on-focus"}
          closeOnSelect={false}
          options={options}
          value={multipleValues}
          onChange={setMultipleValues}
          search
          filterOptions={fuzzySearch}
          placeholder="Search something"
        />
      </div>
    </div>
  );
};

