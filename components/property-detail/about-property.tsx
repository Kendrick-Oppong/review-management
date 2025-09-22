"use client";

import { useState } from "react";

export const AboutProperty = () => {
  const [expanded, setExpanded] = useState(false);

  const secondParagraph =
    "Located on Rua do Crucifixo in the heart of Lisbon, this inviting flat features 1 double bed in the bedroom and 2 air mattresses in the living room. Perfect for up to 4 guests, it’s just steps from shops, restaurants, and Lisbon’s top attractions.";

  const truncateLength = 80;

  return (
    <div className="mb-8 bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        About this property
      </h2>

      {/*  visible first paragraph */}
      <p className="text-gray-700 mb-4">
        Located on Rua do Crucifixo in central Lisbon, this cozy 1-bedroom flat
        offers comfort and convenience. Enjoy a bright living space, a
        well-equipped kitchen, and easy access to shops, restaurants, and major
        attractions—all just steps away.
      </p>

      {/* Second paragraph with slice */}
      <p className="text-gray-700 mb-4">
        {expanded
          ? secondParagraph
          : `${secondParagraph.slice(0, truncateLength)}...`}
        {!expanded && (
          <button
            className="text-blue-600 hover:text-blue-800 ml-1"
            onClick={() => setExpanded(true)}
          >
            Read more
          </button>
        )}
      </p>

      {expanded && (
        <>
          <p className="text-gray-700 mb-4">
            Rua do Crucifixo is located in the vibrant Baixa district, right in
            the heart of Lisbon. Surrounded by historic buildings, cafes, shops,
            and restaurants, it offers easy access to popular sights like Praça
            do Comércio, the Santa Justa Lift, and the Tagus River. With
            excellent transport links nearby, it’s the perfect base for
            exploring the city.
          </p>
          <ul className="text-gray-700 list-none mb-4 list-inside">
            <li>Organi Chiado - 2 minute walk</li>
            <li>Feel Rio - 1 minute walk</li>
            <li>Baixa-Chiado - 1 minute walk</li>
          </ul>

          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => setExpanded(false)}
          >
            Show less
          </button>
        </>
      )}
    </div>
  );
};
