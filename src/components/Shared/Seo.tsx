import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Seo = ({
  description,
  title,
  image,
}: {
  description: string | undefined;
  title: string | undefined;
  image: string | undefined;
}) => {
  const { i18n } = useTranslation("common");

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      <meta name="title" content={title} />
      <meta name="og:title" content={title} />
      <meta name="twitter:title" content={title} />

      <meta name="image" content={image} />
      <meta name="og:image" content={image} />
      <meta name="og:image:secure_url" content={image} />
      <meta name="twitter:image" content={image} />

      <meta name="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={title} />
      <meta name="og:url" content={window.location.href} />

      <link rel="canonical" href={window.location.href} />
      <link
        rel="alternate"
        href={window.location.href}
        hrefLang={i18n.language}
      />
    </Helmet>
  );
};

export default Seo;
