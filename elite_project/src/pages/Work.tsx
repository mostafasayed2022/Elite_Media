import { motion } from "framer-motion";
import { useWork } from "../hooks/queries/useWork";
import { STAGGER_CONTAINER } from "../constants/animations";
import { Container } from "../components/ui/Container";
import { Skeleton } from "../components/ui/Skeleton";
import { PageHero } from "../components/ui/PageHero";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import WorkCard from "../components/work/WorkCard";
import "../Css/Work.css";

const Work = () => {
  const { data: works, isLoading, isError } = useWork();

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="work-page"
    >
      <Header />

      {/* Hero Section */}
      <PageHero
        badge="Portfolio"
        title="Our Work"
        centered
      />

      {/* Portfolio Grid */}
      <section className="work-section">
        <Container>
          <div className="section-header">
            <h2 className="section-title">Show Everything</h2>
            <div className="divider" style={{ width: '100%', height: '1px', backgroundColor: '#eee', margin: '20px 0' }} />
          </div>

          {isLoading ? (
            <div className="work-grid">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} style={{ height: '400px', backgroundColor: '#eee', borderRadius: '40px' }} />
              ))}
            </div>
          ) : (
            <motion.div 
              variants={STAGGER_CONTAINER}
              className="work-grid"
            >
              {works?.map((item, index) => (
                <WorkCard key={item.id} item={item} index={index} />
              ))}
            </motion.div>
          )}
        </Container>
      </section>

      <Footer />
    </motion.div>
  );
};

export default Work;
