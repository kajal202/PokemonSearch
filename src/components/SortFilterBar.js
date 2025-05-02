import "./SortFilterBar.css"

const SortFilterBar = ({
  types,
  selectedTypes,
  setSelectedTypes,
  sortOptions,
  selectedSort,
  setSelectedSort
}) => {

  //  type selection
  const handleTypeClick = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // Clears all selected types
  const handleClearTypes = () => {
    setSelectedTypes([]);
  };


  const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD"
  };


  return (
    <div className="sort-filter-bar">
      <div className="type-filter"> 
        <label>Filter by Types:</label>
        <br/>
        <button
          className={`type-btn all ${selectedTypes.length === 0 ? "active" : ""}`}
          style={{
            backgroundColor: selectedTypes.length === 0 ? "#444" : "#f0f0f0",
            color: selectedTypes.length === 0 ? "white" : "#333",
            border: "2px solid #999"
          }}
          onClick={handleClearTypes}
        >
          All
        </button>
     

      {types.map((type) => (

        <button
          key={type}
          className={`type-btn ${selectedTypes.includes(type) ? "active" : ""}`}
          style={{
            backgroundColor: selectedTypes.includes(type)
              ? typeColors[type] || "#ccc"
              : "#f0f0f0",
            color: selectedTypes.includes(type) ? "white" : "#333",
            border: `2px solid ${typeColors[type] || "#ccc"}`
          }}
          onClick={() => handleTypeClick(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>

      ))}
       </div>
      <br />
      <label>Sort by:</label>
      <select
        onChange={(e) => setSelectedSort(e.target.value)}
        value={selectedSort}
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
};


export default SortFilterBar;