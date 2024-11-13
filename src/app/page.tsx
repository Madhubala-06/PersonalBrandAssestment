import Head from "next/head";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import PersonalBrandingModal from "./components/Question/Question";
export default function Home() {
  return (
    <div className="">
       <Head>
       <title>Kreatoors</title>
       </Head>
       <Navbar />
       <HeroSection/>
       <PersonalBrandingModal/>
    </div>
  );
}
