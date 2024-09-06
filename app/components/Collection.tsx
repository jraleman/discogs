import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { convertCurrency, currencyStringToNumber, formatCurrency } from "~/utils/helpers";
import { CurrencyDropdown } from "./CurrencyDropdown";

export default function Collection() {
    const data = useLoaderData();
    // @ts-ignore
    const { collection, value } = data;
    const [val, setVal] = useState({
        min: value.minimum,
        med: value.median,
        max: value.maximum,
    });

    const handleCurrencyChange = async (newCurrency: string) => {
        // TODO: Refactor code
        const min = await convertCurrency(currencyStringToNumber(value.minimum), 'USD', newCurrency);
        const med = await convertCurrency(currencyStringToNumber(value.median), 'USD', newCurrency);
        const max = await convertCurrency(currencyStringToNumber(value.maximum), 'USD', newCurrency);

        setVal({ 
            min: formatCurrency(min, newCurrency),
            med: formatCurrency(med, newCurrency),
            max: formatCurrency(max, newCurrency), 
        });
    };

    const albumArtStyle = {
        width: '200px',
        height: '200px',
    };

    return (
        <div>
            <CurrencyDropdown onCurrencyChange={handleCurrencyChange} />
            <h2>💽 {collection.length} | 💸 {val.min}, 💰 {val.med}, 🤑 {val.max}</h2>
            {collection.map((record: any) => (
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