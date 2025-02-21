"use client";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import axios from "axios";

export default function HomePage() {
  const [cards, setCards] = useState<any[]>([]);

  const loadCards = async () => {
    try {
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
      const { data } = await axios(`${serverUrl}/products`);
      setCards(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCards();
  }, []);

  return (
    <div className="mt-2 p-4">
      <h1 className="font-semibold bg-whitey/30 backdrop-blur-md rounded-md  text-4xl p-2 mb-4 truncate">
        Our products
      </h1>
      <div className="grid grid-cols-1 w-3/4 sm:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 rounded-md gap-6 justify-self-center">
        {cards.map((card) => {
          return (
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              price={card.price}
              stock={card.stock}
              imageUrl={card.image}
            />
          );
        })}
      </div>
    </div>
  );
}
