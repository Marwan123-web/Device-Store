import { useTranslation } from "react-i18next";

const Thankyou = () => {
  const { t } = useTranslation("common");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-600 mb-4">
          {t("orders.thankyou")}
        </h1>
        <p className="text-gray-700 mb-6">{t("orders.title")}</p>
        <img
          className="mx-auto mb-6 w-32 h-32"
          src="https://media.giphy.com/media/111ebonMs90YLu/giphy.gif"
          alt="Thank You"
        />
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-auto bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          {t("orders.backHome")}
        </button>
      </div>
    </div>
  );
};

export default Thankyou;
