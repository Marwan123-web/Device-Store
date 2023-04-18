import React from "react";

const Herotext = ({ text, bg }: { text: string; bg?: string }) => {
  return (
    <section
      className={`flex items-center justify-center h-[20rem] ${
        bg ? bg : "herobg"
      }`}
    >
      <h1 className="text-6xl font-semibold text-gray-50">{text}</h1>
    </section>
  );
};

export default Herotext;
