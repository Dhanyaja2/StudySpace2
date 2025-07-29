import React, { useContext } from "react";
import { BookOpen, TrendingUp, Users } from "lucide-react";
import { StoreContext } from "../components/context/StoreContext";
import AuthModal from "../components/auth/AuthModal";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const HomePage = () => {

  const {setShowAuthModal, showAuthModal} = useContext(StoreContext);

  return (
    <div>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
          <h2 className="text-5xl font-bold mb-6 text-white">
            Master Any Subject with
            <span className="text-indigo-600"> Smart Repetition</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Harness the power of spaced repetition to learn faster and remember
            longer. Our scientifically-proven system adapts to your learning
            pace.
          </p>
          <Button variant="animate" onClick={() => setShowAuthModal(true)}>
            Start Learning Today
          </Button>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Why StudySpace Works
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Smart Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Our algorithm schedules reviews at the optimal time based on
                  your performance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Detailed analytics show your learning progress and identify
                  areas for improvement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-indigo-600 mb-4" />
                <CardTitle>Speed Memorization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Create personalized study decks to boost your learning
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {}
    </div>
  );
};

export default HomePage;
