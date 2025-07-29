import { Brain } from "lucide-react";


const Footer = () => {
  return (
    <footer className="bg-gray-900/30 text-white py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Brain className="h-6 w-6 mr-2" />
          <span className="text-lg font-semibold">StudySpace</span>
        </div>
        <p className="text-gray-400">
          Empowering learners worldwide with intelligent spaced repetition.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
