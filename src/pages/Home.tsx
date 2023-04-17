import Consultation from "../components/Consultation/Consultation";
import BestSelling from "../components/Products/BestSelling";
import FeatureProducts from "../components/Products/FeatureProducts";
import Slider from "../components/slides/Slider";

const Home = () => {
  return (
    <div className="home">
      <Slider />
      <FeatureProducts />
      <Consultation />
      <BestSelling />
      {/* <Offers />
      <Whyme /> */}
    </div>
  );
};

export default Home;
