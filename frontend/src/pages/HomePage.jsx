import React, { useContext } from "react";
import {
  ArrowRight,
  BookOpen,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";

import { StoreContext } from "../components/context/StoreContext";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const HomePage = () => {
  const { setShowAuthModal } = useContext(StoreContext);

  const features = [
    {
      icon: BookOpen,
      title: "Smart Scheduling",
      description:
        "Our intelligent algorithm schedules reviews at the right time based on your learning performance.",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description:
        "Understand your learning habits with clear insights into progress, retention, and areas to improve.",
    },
    {
      icon: Users,
      title: "Learn Your Way",
      description:
        "Create personalized study decks and build a learning system that adapts to your pace.",
    },
  ];

  return (
    <main className="relative overflow-hidden bg-[#050507] text-white">

      {/* =====================================================
          BACKGROUND AMBIENT GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />

        <div className="absolute left-[-200px] top-[500px] h-[400px] w-[400px] rounded-full bg-indigo-600/[0.06] blur-[120px]" />

        <div className="absolute right-[-200px] top-[700px] h-[400px] w-[400px] rounded-full bg-violet-600/[0.05] blur-[120px]" />
      </div>


      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative pt-44 pb-24">

        <div className="mx-auto max-w-6xl px-6 text-center">

          {/* Small badge */}

          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/[0.07] px-4 py-2 text-sm text-violet-200 shadow-[0_0_20px_rgba(124,58,237,0.08)]">
              <Sparkles className="h-4 w-4 text-violet-400" />

              <span>Smart learning, built around you</span>
            </div>
          </div>


          {/* Heading */}

          <h1 className="mx-auto max-w-5xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">

            Master Any Subject with{" "}

            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-violet-500 bg-clip-text text-transparent">
              Smart Repetition
            </span>

          </h1>


          {/* Description */}

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-400 sm:text-xl">
            Harness the power of spaced repetition to learn faster,
            remember longer, and build knowledge that actually sticks.
          </p>


          {/* CTA */}

          <div className="mt-10 flex justify-center">

            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowAuthModal(true)}
              className="group px-7 py-6"
            >
              Start Learning Today

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>

          </div>


          {/* Small supporting text */}

          <p className="mt-5 text-sm text-gray-600">
            Personalized learning • Spaced repetition • Progress tracking
          </p>

        </div>
      </section>


      {/* =====================================================
          FEATURES
      ====================================================== */}

      <section className="relative pb-28">

        <div className="mx-auto max-w-6xl px-6">

          {/* Section heading */}

          <div className="mb-12 text-center">

            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-violet-400">
              Why StudySpace
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              A smarter way to learn
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-500">
              Everything you need to turn studying into a consistent,
              personalized learning system.
            </p>

          </div>


          {/* Feature cards */}

          <div className="grid gap-6 md:grid-cols-3">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="
                    group
                    relative
                    overflow-hidden
                    border border-white/[0.08]
                    bg-white/[0.025]
                    backdrop-blur-sm
                    transition-all
                    duration-500
                    hover:-translate-y-1
                    hover:border-violet-500/30
                    hover:bg-violet-500/[0.035]
                    hover:shadow-[0_20px_60px_rgba(76,29,149,0.12)]
                  "
                >

                  {/* Card glow */}

                  <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-violet-600/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />


                  <CardContent className="relative p-8">

                    {/* Icon */}

                    <div
                      className="
                        mb-7
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-violet-500/20
                        bg-violet-500/[0.08]
                        text-violet-400
                        transition-all
                        duration-500
                        group-hover:border-violet-400/30
                        group-hover:bg-violet-500/[0.13]
                        group-hover:text-violet-300
                      "
                    >
                      <Icon className="h-6 w-6" />
                    </div>


                    {/* Title */}

                    <h3 className="mb-3 text-xl font-semibold text-white">
                      {feature.title}
                    </h3>


                    {/* Description */}

                    <p className="text-[15px] leading-7 text-gray-500">
                      {feature.description}
                    </p>


                    {/* Bottom accent */}

                    <div className="mt-7 h-px w-0 bg-gradient-to-r from-violet-500/60 to-transparent transition-all duration-500 group-hover:w-full" />

                  </CardContent>

                </Card>
              );
            })}

          </div>


          {/* =================================================
              BOTTOM TRUST / VALUE STRIP
          ================================================== */}

          <div className="mt-8 grid overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] sm:grid-cols-3">

            <div className="border-b border-white/[0.07] px-6 py-5 text-center sm:border-b-0 sm:border-r">
              <p className="text-sm font-medium text-gray-300">
                Personalized
              </p>

              <p className="mt-1 text-xs text-gray-600">
                Adapts to your pace
              </p>
            </div>


            <div className="border-b border-white/[0.07] px-6 py-5 text-center sm:border-b-0 sm:border-r">
              <p className="text-sm font-medium text-gray-300">
                Science-backed
              </p>

              <p className="mt-1 text-xs text-gray-600">
                Spaced repetition
              </p>
            </div>


            <div className="px-6 py-5 text-center">
              <p className="text-sm font-medium text-gray-300">
                Progress focused
              </p>

              <p className="mt-1 text-xs text-gray-600">
                See your improvement
              </p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default HomePage;