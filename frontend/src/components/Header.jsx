import { ArrowRight, Brain } from "lucide-react";
import TypewriterAnimation from "./TypewriterAnimation";
import { useContext } from "react";
import { StoreContext } from "./context/StoreContext";
import { Button } from "./ui/button";
import AuthModal from "./auth/AuthModal";


const Header = () => {
  const { showAuthModal, setShowAuthModal } = useContext(StoreContext);

  return (
    <div className="fixed top-4 left-1/2 z-50 w-[94%] -translate-x-1/2 rounded-3xl p-[1px] overflow-hidden sm:top-6 sm:w-[90%] sm:rounded-[100px]">

      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-[2px] bg-[linear-gradient(90deg,#7C3AED,#4F46E5,#A855F7,#7C3AED)] bg-[length:300%_100%] animate-borderGlow opacity-40" />

      {/* Animated border */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#7C3AED,#4F46E5,#A855F7,#7C3AED)] bg-[length:300%_100%] animate-borderGlow" />

      {/* Header content */}
      <div className="relative z-10 flex items-center justify-between rounded-3xl bg-[#0B0B12]/98 px-3 py-3 sm:rounded-[100px] sm:p-5">

        {/* Logo */}
        <div className="flex min-w-0 items-center">

          <Brain
            className="mr-1.5 h-9 w-9 shrink-0 text-indigo-500 glow-animation sm:mr-2 sm:h-[50px] sm:w-[50px]"
          />

          <div className="truncate text-lg font-bold text-white sm:text-2xl">
            <TypewriterAnimation
              text="StudySpace"
              typingSpeed={100}
            />
          </div>

        </div>


        {/* Buttons */}
        <div className="ml-2 flex shrink-0 items-center gap-1.5 sm:gap-4">

          <Button
            onClick={() => setShowAuthModal(true)}
            variant="glass"
            className="h-8 px-2.5 text-xs sm:h-9 sm:px-4 sm:text-sm"
          >
            Sign In
          </Button>


          <Button
            onClick={() => setShowAuthModal(true)}
            variant="animate"
            className="h-8 px-2.5 text-xs sm:h-9 sm:px-4 sm:text-sm"
          >
            Get Started

            <ArrowRight
              className="h-3.5 w-3.5 sm:h-4 sm:w-4"
            />
          </Button>

        </div>

      </div>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
};

export default Header;