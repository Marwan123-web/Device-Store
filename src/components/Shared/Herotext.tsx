import { useTranslation } from "react-i18next";

const Herotext = ({ text, bg }: { text: string; bg?: string }) => {
  const { t } = useTranslation("common");

  return (
    <section
      className={`flex items-center justify-center h-[20rem] ${
        bg ? bg : "herobg"
      }`}
    >
      <h1 className="text-6xl font-semibold text-gray-50">{t(text)}</h1>
    </section>
  );
};

export default Herotext;
