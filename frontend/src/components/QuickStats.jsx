// import React, { useContext } from 'react'
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
// import { BookOpen, Brain } from 'lucide-react'
// import { StoreContext } from './context/StoreContext'

// const QuickStats = () => {

//   const {dueCardsLength, cardsCount, deckCount} = useContext(StoreContext);

//   return (
//     <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Due Today</CardTitle>
//           <BookOpen className='h-4 w-4 text-indigo-600' />
//         </CardHeader>
//         <CardContent>
//           <div className='text-2xl font-bold'>{dueCardsLength}</div>
//           <p className='text-xs text-gray-500'>Cards to review</p>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
//           <Brain className='h-4 w-4 text-indigo-600' />
//         </CardHeader>
//         <CardContent>
//           <div className='text-2xl font-bold'>{cardsCount}</div>
//           <p className='text-xs text-gray-500'>Across {deckCount} decks</p>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default QuickStats



// import React, { useContext } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { BookOpen, Brain, ArrowUpRight } from "lucide-react";
// import { StoreContext } from "./context/StoreContext";

// const QuickStats = () => {
//   const { dueCardsLength, cardsCount, deckCount } =
//     useContext(StoreContext);

//   return (
//     <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">

//       {/* =====================================================
//           DUE TODAY
//       ====================================================== */}

//       <Card
//         className="
//           group
//           relative
//           overflow-hidden
//           rounded-2xl
//           border
//           border-white/[0.08]
//           bg-white/[0.025]
//           shadow-[0_10px_40px_rgba(0,0,0,0.15)]
//           backdrop-blur-sm
//           transition-all
//           duration-500
//           hover:-translate-y-1
//           hover:border-violet-500/30
//           hover:bg-violet-500/[0.025]
//           hover:shadow-[0_20px_60px_rgba(76,29,149,0.12)]
//         "
//       >

//         {/* Card glow */}
//         <div
//           className="
//             pointer-events-none
//             absolute
//             -right-16
//             -top-16
//             h-32
//             w-32
//             rounded-full
//             bg-violet-600/10
//             blur-3xl
//             opacity-0
//             transition-opacity
//             duration-500
//             group-hover:opacity-100
//           "
//         />

//         <CardHeader className="relative flex flex-row items-center justify-between space-y-0 px-6 pt-6 pb-3">

//           <CardTitle className="text-sm font-medium text-gray-400">
//             Due Today
//           </CardTitle>

//           <div
//             className="
//               flex
//               h-9
//               w-9
//               items-center
//               justify-center
//               rounded-xl
//               border
//               border-violet-500/20
//               bg-violet-500/[0.08]
//               text-violet-400
//               transition-all
//               duration-300
//               group-hover:border-violet-400/30
//               group-hover:bg-violet-500/[0.13]
//               group-hover:text-violet-300
//             "
//           >
//             <BookOpen className="h-4 w-4" />
//           </div>

//         </CardHeader>

//         <CardContent className="relative px-6 pb-6">

//           <div className="mt-2 flex items-end gap-2">

//             <span className="text-4xl font-semibold tracking-tight text-white">
//               {dueCardsLength}
//             </span>

//           </div>

//           <p className="mt-2 text-xs text-gray-500">
//             Cards to review
//           </p>

//           {/* Bottom accent */}
//           <div
//             className="
//               mt-5
//               h-px
//               w-0
//               bg-gradient-to-r
//               from-violet-500/60
//               to-transparent
//               transition-all
//               duration-500
//               group-hover:w-full
//             "
//           />

//         </CardContent>
//       </Card>


//       {/* =====================================================
//           TOTAL CARDS
//       ====================================================== */}

//       <Card
//         className="
//           group
//           relative
//           overflow-hidden
//           rounded-2xl
//           border
//           border-white/[0.08]
//           bg-white/[0.025]
//           shadow-[0_10px_40px_rgba(0,0,0,0.15)]
//           backdrop-blur-sm
//           transition-all
//           duration-500
//           hover:-translate-y-1
//           hover:border-violet-500/30
//           hover:bg-violet-500/[0.025]
//           hover:shadow-[0_20px_60px_rgba(76,29,149,0.12)]
//         "
//       >

//         {/* Card glow */}
//         <div
//           className="
//             pointer-events-none
//             absolute
//             -right-16
//             -top-16
//             h-32
//             w-32
//             rounded-full
//             bg-indigo-600/10
//             blur-3xl
//             opacity-0
//             transition-opacity
//             duration-500
//             group-hover:opacity-100
//           "
//         />

//         <CardHeader className="relative flex flex-row items-center justify-between space-y-0 px-6 pt-6 pb-3">

//           <CardTitle className="text-sm font-medium text-gray-400">
//             Total Cards
//           </CardTitle>

//           <div
//             className="
//               flex
//               h-9
//               w-9
//               items-center
//               justify-center
//               rounded-xl
//               border
//               border-indigo-500/20
//               bg-indigo-500/[0.08]
//               text-indigo-400
//               transition-all
//               duration-300
//               group-hover:border-indigo-400/30
//               group-hover:bg-indigo-500/[0.13]
//               group-hover:text-indigo-300
//             "
//           >
//             <Brain className="h-4 w-4" />
//           </div>

//         </CardHeader>

//         <CardContent className="relative px-6 pb-6">

//           <div className="mt-2 flex items-end gap-2">

//             <span className="text-4xl font-semibold tracking-tight text-white">
//               {cardsCount}
//             </span>

//           </div>

//           <p className="mt-2 text-xs text-gray-500">
//             Across {deckCount} {deckCount === 1 ? "deck" : "decks"}
//           </p>

//           {/* Bottom accent */}
//           <div
//             className="
//               mt-5
//               h-px
//               w-0
//               bg-gradient-to-r
//               from-indigo-500/60
//               to-transparent
//               transition-all
//               duration-500
//               group-hover:w-full
//             "
//           />

//         </CardContent>
//       </Card>

//     </div>
//   );
// };

// export default QuickStats;


import React, { useContext } from "react";
import { BookOpen, Brain, ArrowRight, Sparkles } from "lucide-react";
import { StoreContext } from "./context/StoreContext";

const QuickStats = () => {
  const { dueCardsLength, cardsCount, deckCount } =
    useContext(StoreContext);

  return (
    <section className="relative mb-8 overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.015]">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-violet-600/[0.07] blur-[100px]" />

      <div className="relative p-6 sm:p-7">

        {/* Section heading */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-violet-400" />

              <p className="text-sm font-medium text-violet-400">
                Your learning overview
              </p>
            </div>

            <h2 className="mt-1 text-xl font-semibold tracking-tight text-white">
              Keep your momentum going
            </h2>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-xs text-gray-600">
              Today
            </p>

            <p className="text-sm font-medium text-gray-400">
              Ready when you are
            </p>
          </div>

        </div>


        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2">

          {/* Due Today */}
          <div
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.08]
              bg-[#0a0a0f]/80
              p-5
              transition-all
              duration-300
              hover:border-violet-500/30
              hover:bg-violet-500/[0.025]
            "
          >

            {/* Glow */}
            <div className="
              pointer-events-none
              absolute
              -right-10
              -top-10
              h-28
              w-28
              rounded-full
              bg-violet-600/10
              blur-3xl
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            " />

            <div className="relative flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-gray-400">
                  Due Today
                </p>

                <div className="mt-3 flex items-baseline gap-2">

                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {dueCardsLength}
                  </span>

                  <span className="text-xs text-gray-600">
                    cards
                  </span>

                </div>

                <p className="mt-1 text-xs text-gray-500">
                  {dueCardsLength === 0
                    ? "You're all caught up"
                    : "Cards waiting for review"}
                </p>

              </div>


              <div className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-violet-500/20
                bg-violet-500/[0.08]
                text-violet-400
                transition-all
                duration-300
                group-hover:border-violet-400/30
                group-hover:bg-violet-500/[0.14]
              ">
                <BookOpen className="h-4 w-4" />
              </div>

            </div>

          </div>


          {/* Total Cards */}
          <div
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.08]
              bg-[#0a0a0f]/80
              p-5
              transition-all
              duration-300
              hover:border-indigo-500/30
              hover:bg-indigo-500/[0.025]
            "
          >

            {/* Glow */}
            <div className="
              pointer-events-none
              absolute
              -right-10
              -top-10
              h-28
              w-28
              rounded-full
              bg-indigo-600/10
              blur-3xl
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            " />

            <div className="relative flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-gray-400">
                  Total Cards
                </p>

                <div className="mt-3 flex items-baseline gap-2">

                  <span className="text-4xl font-semibold tracking-tight text-white">
                    {cardsCount}
                  </span>

                  <span className="text-xs text-gray-600">
                    cards
                  </span>

                </div>

                <p className="mt-1 text-xs text-gray-500">
                  Across {deckCount}{" "}
                  {deckCount === 1 ? "deck" : "decks"}
                </p>

              </div>


              <div className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-indigo-500/20
                bg-indigo-500/[0.08]
                text-indigo-400
                transition-all
                duration-300
                group-hover:border-indigo-400/30
                group-hover:bg-indigo-500/[0.14]
              ">
                <Brain className="h-4 w-4" />
              </div>

            </div>

          </div>

        </div>


        {/* Bottom status */}
        <div className="
          mt-5
          flex
          items-center
          justify-between
          rounded-xl
          px-4
          py-3
        ">

          <div className="flex items-center gap-2">

            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />

            <p className="text-xs text-gray-500">
              Spaced repetition is ready for your next session.
            </p>

          </div>


        </div>

      </div>

    </section>
  );
};

export default QuickStats;