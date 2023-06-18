import React, { useState, useEffect } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  useEffect(() => {
    fetchPets();
  }, []);

  const onChangeType = ({ target: { value } }) => {
    setFilters({ type: value });
  };

  const fetchPets = () => {
    let endpoint = 'http://localhost:3001/pets';

    if (filters.type !== 'all') {
      endpoint += `?type=${filters.type}`;
    }

    fetch(endpoint)
      .then(res => res.json())
      .then(pets => setPets(pets));
  };

  const onFindPetsClick = () => {
    fetchPets();
  };

  const onAdoptPet = petId => {
    const petsUpdated = pets.map(pet => 
      pet.id === petId ? { ...pet, isAdopted: true } : pet
    );
    setPets(petsUpdated);
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick} />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
