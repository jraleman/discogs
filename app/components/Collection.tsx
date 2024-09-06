import { useLoaderData } from "@remix-run/react";

export default function Collection() {
    const data = useLoaderData();

    // @ts-ignore
    const { collection } = data;
    return (
        <div>
            {collection.map((record: any) => (
                <div key={record.id}>
                    <img src={record.basic_information.cover_image} alt={record.basic_information.title} />
                    <h2>{record.basic_information.title}</h2>
                    <p>{record.basic_information.artists[0].name}</p>
                    <p>{record.basic_information.year}</p>
                    <p>{record.basic_information.genres.join(", ")}</p>
                    <p>Low: {record.lowest_price}, Mid: {record.median_price}, High: {record.highest_price}</p>
                </div>
            ))}
        </div>
    );
}