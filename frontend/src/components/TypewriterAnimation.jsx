// import React, { useEffect, useState } from "react";

// const TypewriterAnimation = ({
//   texts,
//   typingSpeed = 150,
//   deletingSpeed = 50,
//   pause = 2000,
// }) => {
//   const [displayedText, setDisplayedText] = useState("");
//   const [index, setIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);

//   useEffect(() => {
//     const current = texts[index % texts.length];
//     let timeout;

//     if (isDeleting) {
//       timeout = setTimeout(() => {
//         setDisplayedText(current.substring(0, displayedText.length - 1));
//         if (displayedText.length - 1 === 0) {
//           setIsDeleting(false);
//           setIndex((prev) => (prev + 1) % texts.length);
//         }
//       }, deletingSpeed);
//     } else {
//       timeout = setTimeout(() => {
//         setDisplayedText(current.substring(0, displayedText.length + 1));
//         if (displayedText.length + 1 === current.length) {
//           setTimeout(() => setIsDeleting(true), pause);
//         }
//       }, typingSpeed);
//     }
//     return () => clearTimeout(timeout);
//   }, [displayedText, isDeleting, texts, index, typingSpeed, deletingSpeed, pause]);

//   return <span className="border-r-2 border-gray-400 pr-1">
//     {displayedText}
//   </span>;
// };

// export default TypewriterAnimation;

import React, { useEffect, useState } from "react";

const TypewriterAnimation = ({ text, typingSpeed = 150 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingDone(true);
    }
  }, [currentIndex, text, typingSpeed]);

  return (
    <span className="pr-1 heading">
      {displayedText}
      {!isTypingDone && (
        <span className="border-r-2 border-gray-400 animate-pulse"></span>
      )}
    </span>
  );
};

export default TypewriterAnimation;
