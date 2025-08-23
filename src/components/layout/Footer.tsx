import { Mail, MapPin, Phone, Github, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-secondary/50 border-t border-glass-border/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gradient">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-accent" />
                <span>dotslash@iiitn.ac.in</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-accent" />
                <span>+91 12345 67890</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                <span>IIIT Nagpur, Maharashtra</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gradient">Quick Links</h3>
            <div className="space-y-2">
              {['Resources', 'Leaderboard', 'Events', 'Problems'].map((link) => (
                <button
                  key={link}
                  onClick={() => navigate(`/${link.toLowerCase()}`)}
                  className="block text-left text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gradient">Follow Us</h3>
            <div className="flex space-x-3">
              <Button size="sm" variant="outline" className="p-2">
                <Github className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="p-2">
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Join our community and stay updated with the latest in coding and technology.
            </p>
          </div>
        </div>

        <div className="border-t border-glass-border/30 mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Dotslash - IIIT Nagpur Coding Club. Built with ❤️ for learning.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;