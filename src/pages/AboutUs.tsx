import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Brain, ArrowLeft, Target, Users, Rocket, Heart } from "lucide-react";
import { useNavigate } from "react-router";

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b p-4 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl cursor-pointer" onClick={() => navigate("/")}>
            <Brain className="h-6 w-6 text-primary" />
            <span>RegimeSwitcher.AI</span>
          </div>
          <Button variant="outline" onClick={() => navigate("/")} size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            About Us
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Building the future of intelligent algorithmic trading
          </p>

          {/* Mission */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Our Mission
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              RegimeSwitcher.AI was founded with a singular mission: to democratize sophisticated algorithmic trading strategies by making them accessible to everyone. We believe that advanced AI-driven trading should not be limited to institutional investors and hedge funds. Our platform empowers individual traders with the same cutting-edge technology used by Wall Street professionals.
            </p>
          </section>

          {/* Story */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2024, RegimeSwitcher.AI emerged from a simple observation: traditional trading strategies often fail because they don't adapt to changing market conditions. Markets are dynamic, shifting between bull runs, bear markets, sideways consolidation, and volatile chaos. Yet most trading systems use static strategies that work well in one regime but fail catastrophically in others.
              </p>
              <p>
                Our team of AI researchers, quantitative traders, and software engineers came together to solve this problem. We developed a sophisticated system that uses Hidden Markov Models and LSTM neural networks to detect market regimes in real-time and automatically switch between optimal strategies for each market state.
              </p>
              <p>
                What started as a research project has evolved into a full-fledged trading platform, now serving traders worldwide with our AI-powered regime detection and dynamic strategy switching.
              </p>
            </div>
          </section>

          {/* Team */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Our Team
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="p-6 rounded-lg border bg-card"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Research Team</h3>
                <p className="text-muted-foreground text-sm">
                  PhDs in machine learning and quantitative finance, developing cutting-edge regime detection algorithms and predictive models.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-lg border bg-card"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Trading Experts</h3>
                <p className="text-muted-foreground text-sm">
                  Former hedge fund traders and quantitative analysts with decades of combined experience in algorithmic trading strategies.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="p-6 rounded-lg border bg-card"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Rocket className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Engineering Team</h3>
                <p className="text-muted-foreground text-sm">
                  Full-stack developers and blockchain engineers building scalable, secure infrastructure for real-time trading execution.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="p-6 rounded-lg border bg-card"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Team</h3>
                <p className="text-muted-foreground text-sm">
                  Dedicated support specialists and community managers ensuring every user has the best possible experience.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Values */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">🎯 Innovation First</h3>
                <p className="text-muted-foreground text-sm">
                  We constantly push the boundaries of what's possible with AI and algorithmic trading.
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">🔒 Security & Trust</h3>
                <p className="text-muted-foreground text-sm">
                  Your security is our top priority. We never store private keys and use industry-leading encryption.
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">🌍 Accessibility</h3>
                <p className="text-muted-foreground text-sm">
                  Advanced trading technology should be available to everyone, not just institutions.
                </p>
              </div>
              <div className="p-4 rounded-lg border bg-card">
                <h3 className="font-semibold mb-2">📊 Transparency</h3>
                <p className="text-muted-foreground text-sm">
                  We believe in open communication about our methods, performance, and limitations.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="p-8 rounded-lg border bg-primary/5 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-muted-foreground mb-6">
              Be part of the future of algorithmic trading. Connect your wallet and start trading smarter today.
            </p>
            <Button size="lg" onClick={() => navigate("/")}>
              Get Started
            </Button>
          </section>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>© 2024 RegimeSwitcher.AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
