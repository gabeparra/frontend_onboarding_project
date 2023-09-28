import React, { useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { Item } from "../../../server/database/schema";
import { useSearchBarStore } from "../zustand/searchBarStore";

const fetchItems = async (): Promise<Item[]> => {
  const response = await fetch("http://localhost:8080/items");
  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }
  return response.json();
};

export const Index: React.FC = () => {

  const { data: items, error } = useQuery(['items'], fetchItems);
  const { searchTerm, setShowSearchBar } = useSearchBarStore();

  useEffect(() => {
    setShowSearchBar(true); // Show search bar when Index component is mounted
    return () => {
      setShowSearchBar(false); // Hide search bar when Index component is unmounted
    };
  }, [setShowSearchBar]);

  const filteredItems = items?.filter((item) => 
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];


  return (
    <div className="px-8">
      <p>
        I'm the home page! Make me the prettiest of them all! Feel free to
        display some exciting items on this page too!
      </p>
      <div className="grid grid-cols-3 gap-4">
        {error ? (
          <p>There was an error loading the items</p>
        ) : !items ? (
          <p>Loading...</p>
        ) : (
          filteredItems.map((item, index, array) => (
            <div key={item.itemId} className="item bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{item.itemName}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-gray-800 font-bold">${item.price}</p>
              <img
                src={item.image}
                alt={item.itemName}
                className={`w-full h-96 object-contain rounded ${index === array.length - 1 ? "last-image-class" : ""}`}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
