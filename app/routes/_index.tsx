import type { MetaFunction } from "@remix-run/node";
import { LoaderFunction } from "@remix-run/node";
import Collection from "~/components/Collection";
import { USERNAME } from "~/utils/constants";
import { fetchCollection, fetchCollectionValue } from "~/utils/helpers";

export const loader: LoaderFunction = async () => {
  const collection = await fetchCollection(USERNAME);
  const value = await fetchCollectionValue(USERNAME)
  return { collection, value };
};

export const meta: MetaFunction = () => {
  return [
    { title: "Discogs" },
    { name: "description", content: "Welcome to my records collection!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Discogs</h1>
      <Collection />
    </div>
  );
}
