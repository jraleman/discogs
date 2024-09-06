import { useState } from 'react';

export type Props = {
  onSearch: (query: string) => void;
}

export default function RecordFilter({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value); // Pass the query up to the parent component
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input
        type="text"
        id="search"
        value={query}
        onChange={handleSearch}
        placeholder="Filter by artist, title, year, or genre"
      />
    </div>
  );
}
