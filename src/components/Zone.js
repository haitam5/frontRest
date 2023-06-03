import React, { useState, useEffect } from 'react';

const Card = ({ onSave, villeOptions }) => {
  const [name, setName] = useState('');
  const [ville, setVille] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleVilleChange = (event) => {
    setVille(event.target.value);
  };

  const handleSave = () => {
    const newItem = {
      nom: name,
      ville: {
        id: parseInt(ville)
      }
    };

    fetch('http://localhost:8081/api/zones/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((data) => {
        onSave(data);
        setName('');
        setVille('');
      })
      .catch((error) => {
        console.error('Error adding zone:', error);
      });
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">Add Zone</h2>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter zone name"
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <select
        value={ville}
        onChange={handleVilleChange}
        className="p-2 border border-gray-300 rounded mb-4"
      >
        <option value="">Select a ville</option>
        {villeOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nom}
          </option>
        ))}
      </select>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 rounded"
      >
        Save
      </button>
    </div>
  );
};

const ListView = ({ items }) => {
  return (
    <div className="list-view">
      <h2 className="text-xl font-bold mb-4">List View</h2>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 border border-gray-300 rounded">
            <div className="font-bold mb-2">ID: {item.id}</div>
            <div className="mb-2">Name: {item.nom}</div>
            <div className="text-sm">Ville: {item.ville ? item.ville.nom : ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
}; 

function Zone() {
  const [listItems, setListItems] = useState([]);
  const [villeOptions, setVilleOptions] = useState([]);

  const handleSave = (item) => {
    setListItems([...listItems, item]);
  };

  useEffect(() => {
    fetch('http://localhost:8081/api/villes')
      .then((response) => response.json())
      .then((data) => {
        setVilleOptions(data);
      })
      .catch((error) => {
        console.error('Error fetching ville options:', error);
      });

    fetch('http://localhost:8081/api/zones/')
      .then((response) => response.json())
      .then((data) => {
        console.log('List items:', data);
        setListItems(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="app">
      <Card onSave={handleSave} villeOptions={villeOptions} />
      <ListView items={listItems} />
    </div>
  );
}

export default Zone;