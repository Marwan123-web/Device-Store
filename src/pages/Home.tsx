import Consultation from "../components/Consultation/Consultation";
import BestSelling from "../components/Products/BestSelling";
import FeatureProducts from "../components/Products/FeatureProducts";
import Slider from "../components/slides/Slider";
import WhyUs from "../components/US/WhyUs";

const Home = () => {
  return (
    <div className="home">
      <Slider />
      <FeatureProducts />
      <Consultation />
      <BestSelling />
      <WhyUs />
    </div>
  );
};

export default Home;
