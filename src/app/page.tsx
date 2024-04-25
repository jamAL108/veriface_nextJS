import Image from "next/image";
import Home from '@/components/Home';
import Footer from '@/components/Footer';
import Deepfake from '@/components/Deepfake';
import Instruction from '@/components/instruction';
import Navbar from '@/components/Navbar';
import Games from '@/components/Games';
import Creator from '@/components/creator';
export default function Aooo() {
  return (
    <div className="flex justify-center items-center flex-col overflow-hidden w-full">
    <Navbar/>
    <Home/>
    <Instruction/>
    <Deepfake/>
    <Games/>
    <Creator/>
    <Footer/>
   </div>
  );
}
