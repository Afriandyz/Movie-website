import search_icon from "../assets/search.svg";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        <img src={search_icon} alt="" />

        <input
          type="text"
          placeholder="Search For a Movie"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          maxLength={"60"}
          minLength={"2"}
        />
      </div>
    </div>
  );
};

export default Search;
