// import { Brain } from "lucide-react";


// const Footer = () => {
//   return (
//     <footer className="bg-gray-900/30 text-white py-5">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <div className="flex items-center justify-center mb-4">
//           <Brain className="h-6 w-6 mr-2" />
//           <span className="text-lg font-semibold">StudySpace</span>
//         </div>
//         <p className="text-gray-400">
//           Empowering learners worldwide with intelligent spaced repetition.
//         </p>
//       </div>
//     </footer>
//   );
// };
// export default Footer;



import { Brain } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-violet-500/10 bg-[#08080D] text-white">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[500px] -translate-x-1/2 rounded-full bg-violet-600/[0.07] blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-12 sm:px-8">

        {/* Main footer content */}
        <div className="flex flex-col items-center text-center">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-violet-500/20
                bg-violet-500/[0.08]
                shadow-[0_0_25px_rgba(124,58,237,0.12)]
              "
            >
              <Brain className="h-5 w-5 text-violet-400" />
            </div>

            <span className="text-xl font-semibold tracking-tight">
              StudySpace
            </span>

          </div>


          {/* Tagline */}
          <p className="mt-5 max-w-md text-sm leading-6 text-gray-500 sm:text-[15px]">
            Empowering learners to learn smarter, remember longer,
            and build knowledge that lasts.
          </p>


          {/* Divider */}
          <div className="my-8 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />


          {/* Bottom row */}
          <div className="flex w-full max-w-3xl flex-col items-center justify-between gap-3 text-xs text-gray-600 sm:flex-row">

            <p>
              © {new Date().getFullYear()} StudySpace. All rights reserved.
            </p>

            <div className="flex items-center gap-2">
              <span>Built for better learning</span>
              <span className="text-violet-500">•</span>
              <span>Learn smarter</span>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;