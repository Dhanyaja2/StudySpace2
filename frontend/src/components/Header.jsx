import { Brain } from "lucide-react";
import TypewriterAnimation from "./TypewriterAnimation";
import { useContext, useState } from "react";
import { StoreContext } from "./context/StoreContext";
import AuthModal from "./auth/AuthModal";
import { Button } from "./ui/button";

const Header = () => {
  const { showAuthModal, setShowAuthModal, open, setOpen } = useContext(StoreContext);

  // if (showAuthModal) {
  //   return (
  //     <AuthModal
  //       isOpen={showAuthModal}
  //       onClose={() => setShowAuthModal(false)}
  //     />
  //   );
  // }

  return (
    <div className="relative">
      <div className="w-[90%] flex mx-auto items-center p-5 justify-between">
        <div className="flex items-center">
          <div>
            <Brain
              width={50}
              height={50}
              className="text-indigo-500 mr-2 glow-animation "
            />
          </div>
          {/* <h1 className="font-bold text-2xl text-gray-200">StudySpace</h1> */}
          <div className="text-2xl font-bold text-white">
            <TypewriterAnimation text="StudySpace" typingSpeed={100} />
          </div>
        </div>
        <div className="space-x-4">
          <Button onClick={() => setShowAuthModal(true)} variant="animate">Sign In</Button>
          <Button onClick={() => setShowAuthModal(true)} variant="animate">Get Started</Button>
        </div>
      </div>

      {showAuthModal ? (
        <div>
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
