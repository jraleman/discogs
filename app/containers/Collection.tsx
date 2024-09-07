import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { convertCurrency, currencyStringToNumber, fetchCurrencyRate, formatCurrency } from "~/utils/helpers";
import CurrencyDropdown from "~/components/CurrencyDropdown";
import RecordFilter from "~/components/RecordFilter";
import CollectionStats from "~/components/CollectionStats";

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

    return (
      <div className="m-4">
        <div className="mx-auto max-w-screen-xl">
          <RecordFilter onSearch={handleSearch} />
          <CurrencyDropdown onCurrencyChange={handleCurrencyChange} />
          <CollectionStats filteredCount={filteredRecords.length} {...stats} />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4 py-8 mx-auto max-w-screen-xl lg:py-16 justify-items-center">
          {filteredRecords.map((record: any) => (
            <div key={record.id} className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img className=" rounded-t-lg max-h-80" src={record.basic_information.cover_image} alt={record.basic_information.title} />
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{record.basic_information.title}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{record.basic_information.artists[0].name}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{record.basic_information.year}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{record.basic_information.genres.join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}