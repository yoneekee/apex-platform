import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MediaGallery from "@/components/detail/MediaGallery";
import ProductInfo from "@/components/detail/ProductInfo";
import ExpandableDetails from "@/components/detail/ExpandableDetails";
import NarrativeSection from "@/components/detail/NarrativeSection";
import KeyHighlights from "@/components/detail/KeyHighlights";
import RelatedItems from "@/components/detail/RelatedItems";
import MobileQuickAction from "@/components/detail/MobileQuickAction";

const DetailView = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero: Split layout */}
      <section className="pt-24 md:pt-28 pb-12">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            <MediaGallery />
            <div className="space-y-10">
              <ProductInfo />
              <ExpandableDetails />
            </div>
          </div>
        </div>
      </section>

      <NarrativeSection />
      <KeyHighlights />
      <RelatedItems />
      <Footer />
      <MobileQuickAction />
    </div>
  );
};

export default DetailView;
