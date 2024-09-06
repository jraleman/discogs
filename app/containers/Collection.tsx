import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { convertCurrency, currencyStringToNumber, fetchCurrencyRate, formatCurrency } from "~/utils/helpers";
import CurrencyDropdown from "~/components/CurrencyDropdown";
import RecordFilter from "~/components/RecordFilter";

export default function Collection() {
  const { collection, value } = useLoaderData<{ collection: any[], value: any }>();
  const [stats, setStats] = useState({
    count: collection.length,
    min: value.minimum,
    med: value.median,
    max: value.maximum,
  });
  const [filteredRecords, setFilteredRecords] = useState(collection);

  const handleCurrencyChange = async (newCurrency: string) => {
    const rate = await fetchCurrencyRate('USD', newCurrency);
    const min = convertCurrency(currencyStringToNumber(value.minimum), rate);
    const med = convertCurrency(currencyStringToNumber(value.median), rate);
    const max = convertCurrency(currencyStringToNumber(value.maximum), rate);

    setStats({
      count: stats.count,
      min: formatCurrency(min, newCurrency),
      med: formatCurrency(med, newCurrency),
      max: formatCurrency(max, newCurrency), 
    });
  };

    const handleSearch = (query: string) => {
      if (!query) {
        setFilteredRecords(collection); // Reset to all records if query is empty
        return;
      }
  
      const lowerCaseQuery = query.toLowerCase();
      
      const filtered = collection.filter((record: any) => {
        const artist = record.basic_information.artists[0].name.toLowerCase();
        const title = record.basic_information.title.toLowerCase();
        const year = record.basic_information.year.toString();
        const genres = record.basic_information.genres.join(", ").toLowerCase();
  
        // Check if any of the fields (artist, title, year, or genre) contains the query
        return (
          artist.includes(lowerCaseQuery) ||
          title.includes(lowerCaseQuery) ||
          year.includes(lowerCaseQuery) ||
          genres.includes(lowerCaseQuery)
        );
      });
  
      setFilteredRecords(filtered);
    };

    const albumArtStyle = {
      width: '200px',
      height: '200px',
    };

    return (
      <div>
        <RecordFilter onSearch={handleSearch} />
        <h2>💽 {filteredRecords.length} / {stats.count}</h2>
        <CurrencyDropdown onCurrencyChange={handleCurrencyChange} />
        <h2>💸 {stats.min} | 💰 {stats.med} | 🤑 {stats.max}</h2>
        {filteredRecords.map((record: any) => (
          <div key={record.id}>
            <hr />
            <h3>{record.basic_information.title}</h3>
            <h4>{record.basic_information.artists[0].name}</h4>
            <h5>{record.basic_information.year}</h5>
            <h6>{record.basic_information.genres.join(", ")}</h6>
            <img style={albumArtStyle} src={record.basic_information.cover_image} alt={record.basic_information.title} />
          </div>
        ))}
      </div>
    );
}