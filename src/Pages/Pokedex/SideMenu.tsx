import React from "react";

interface SideMenuProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  allTypes: string[];
}

const SideMenu: React.FC<SideMenuProps> = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  allTypes,
}) => {
  return (
    <div className="flex gap-[5.5rem] items-center justify-between">

      <div className="flex gap-1 items-center border-b-2 w-[11.5rem]">
        <img src="/public/search.png" alt="" className="size-8 p-1"/>
        <input
          type="text"
          placeholder="ENTER POKEMON"
          className="w-[8.8rem] bg-transparent outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="typeFilter" className="mr-3">
          TYPE
        </label>
        <select
          id="typeFilter"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="min-w-[7.5rem] max-w-[7.5rem] whitespace-nowrap bg-transparent py-[0.35rem] rounded-lg uppercase border-2"
        >
          <option value="All" className="bg-[rgb(30,30,30)]">
            All
          </option>
          {allTypes.map((type) => (
            <option
              key={type}
              value={type}
              className="bg-[rgb(30,30,30)] outline-none"
            >
              {type}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SideMenu;
