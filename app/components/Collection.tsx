import { useLoaderData } from "@remix-run/react";

export default function Collection() {
    const data = useLoaderData();

    // @ts-ignore
    const { collection, value } = data;

    const albumArtStyle = {
        width: '200px',
        height: '200px',
    };

    return (
        <div>
            <h2>💽 {collection.length} | 💸 {value.minimum}, 💰 {value.median}, 🤑 {value.maximum}</h2>
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