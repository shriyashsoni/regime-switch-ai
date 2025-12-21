import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Brain, ArrowLeft, Shield, Lock, Eye, Database } from "lucide-react";
import { useNavigate } from "react-router";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Last updated: December 2024
          </p>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Our Commitment to Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At RegimeSwitcher.AI, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Database className="h-6 w-6 text-primary" />
              Information We Collect
            </h2>
            <div className="space-y-6">
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-2">Wallet Information</h3>
                <p className="text-muted-foreground">
                  We collect your wallet address when you connect via MetaMask or Phantom. This information is used solely for authentication and to provide you with personalized trading analytics.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-2">Trading Data</h3>
                <p className="text-muted-foreground">
                  We store simulated trading data, including signals, trades, and performance metrics. This data is used to improve our AI models and provide you with accurate analytics.
                </p>
              </div>
              <div className="p-6 rounded-lg border bg-card">
                <h3 className="text-xl font-semibold mb-2">Usage Information</h3>
                <p className="text-muted-foreground">
                  We collect information about how you interact with our platform, including pages visited, features used, and time spent on the platform. This helps us improve user experience.
                </p>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary" />
              How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>To provide and maintain our trading platform services</li>
              <li>To authenticate your identity and secure your account</li>
              <li>To generate personalized trading signals and analytics</li>
              <li>To improve our AI models and platform features</li>
              <li>To communicate important updates and notifications</li>
              <li>To comply with legal obligations and prevent fraud</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Lock className="h-6 w-6 text-primary" />
              Data Security
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>End-to-end encryption for all data transmission</li>
              <li>Secure storage with encrypted databases</li>
              <li>Regular security audits and penetration testing</li>
              <li>No storage of private keys or seed phrases</li>
              <li>Multi-factor authentication options</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use third-party services to provide our platform functionality, including Convex for backend services and wallet providers (MetaMask, Phantom) for authentication. These services have their own privacy policies, and we encourage you to review them.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Right to access your personal data</li>
              <li>Right to correct inaccurate data</li>
              <li>Right to delete your data (right to be forgotten)</li>
              <li>Right to export your data</li>
              <li>Right to opt-out of data collection</li>
            </ul>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at:
            </p>
            <p className="text-primary font-semibold mt-2">privacy@regimeswitcher.ai</p>
          </section>

          {/* Updates */}
          <section className="p-6 rounded-lg border bg-muted/50">
            <h3 className="font-semibold mb-2">Policy Updates</h3>
            <p className="text-sm text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
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
