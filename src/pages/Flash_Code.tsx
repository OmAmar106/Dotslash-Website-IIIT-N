import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Code, Trophy, ArrowRight, Clock, Award } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Flash_Code = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: "Competitive Programming Workshop",
      date: "Dec 20, 2024",
      time: "2:00 PM - 5:00 PM",
      participants: 45,
      type: "Workshop"
    },
    {
      id: 2,
      title: "Hack-a-thon 2024",
      date: "Dec 25, 2024",
      time: "9:00 AM - 9:00 PM",
      participants: 120,
      type: "Competition"
    },
    {
      id: 3,
      title: "Web Development Bootcamp",
      date: "Jan 2, 2025",
      time: "10:00 AM - 4:00 PM",
      participants: 80,
      type: "Bootcamp"
    }
  ];

  const upcomingContests = [
    {
      id: 1,
      title: "Codeforces Round #918 (Div. 2)",
      platform: "Codeforces",
      platformColor: "bg-blue-500/20 text-blue-400",
      date: "Dec 22, 2024",
      time: "8:05 PM IST",
      duration: "2h 15m",
      rating: "800-2100"
    },
    {
      id: 2,
      title: "Weekly Contest 374",
      platform: "LeetCode",
      platformColor: "bg-orange-500/20 text-orange-400",
      date: "Dec 24, 2024",
      time: "8:00 AM IST",
      duration: "1h 30m",
      rating: "1200-2500"
    },
    {
      id: 3,
      title: "CodeChef Starters 113",
      platform: "CodeChef",
      platformColor: "bg-amber-500/20 text-amber-400",
      date: "Dec 27, 2024",
      time: "8:00 PM IST",
      duration: "3h 00m",
      rating: "1000-2200"
    }
  ];

  const allContests = [
    {
      id: 1,
      title: "Codeforces Round #918 (Div. 2)",
      platform: "Codeforces",
      platformColor: "bg-blue-500/20 text-blue-400",
      date: "Dec 22, 2024",
      time: "8:05 PM IST",
      duration: "2h 15m",
      rating: "800-2100",
      description: "Regular Codeforces round with problems suitable for Div. 2 participants",
      problems: 6,
      participants: "12,000+",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Weekly Contest 374",
      platform: "LeetCode",
      platformColor: "bg-orange-500/20 text-orange-400",
      date: "Dec 24, 2024",
      time: "8:00 AM IST",
      duration: "1h 30m",
      rating: "1200-2500",
      description: "LeetCode's weekly contest featuring algorithmic problems",
      problems: 4,
      participants: "8,000+",
      status: "upcoming"
    },
    {
      id: 3,
      title: "CodeChef Starters 113",
      platform: "CodeChef",
      platformColor: "bg-amber-500/20 text-amber-400",
      date: "Dec 27, 2024",
      time: "8:00 PM IST",
      duration: "3h 00m",
      rating: "1000-2200",
      description: "CodeChef's regular monthly contest with diverse problem set",
      problems: 8,
      participants: "5,000+",
      status: "upcoming"
    },
    {
      id: 4,
      title: "AtCoder Beginner Contest 334",
      platform: "AtCoder",
      platformColor: "bg-green-500/20 text-green-400",
      date: "Dec 29, 2024",
      time: "5:30 PM IST",
      duration: "1h 40m",
      rating: "400-1600",
      description: "Beginner-friendly contest from AtCoder",
      problems: 6,
      participants: "3,000+",
      status: "upcoming"
    },
    {
      id: 5,
      title: "HackerRank Weekly Contest",
      platform: "HackerRank",
      platformColor: "bg-emerald-500/20 text-emerald-400",
      date: "Jan 2, 2025",
      time: "9:00 PM IST",
      duration: "2h 00m",
      rating: "1000-2000",
      description: "Weekly programming contest by HackerRank",
      problems: 5,
      participants: "2,500+",
      status: "upcoming"
    },
    {
      id: 6,
      title: "Educational Codeforces Round 160",
      platform: "Codeforces",
      platformColor: "bg-blue-500/20 text-blue-400",
      date: "Jan 5, 2025",
      time: "8:05 PM IST",
      duration: "2h 15m",
      rating: "900-2300",
      description: "Educational round focusing on algorithmic concepts",
      problems: 7,
      participants: "10,000+",
      status: "upcoming"
    }
  ];

  const stats = [
    { label: "Active Members", value: "250+", icon: Users },
    { label: "Problems Solved", value: "1,500+", icon: Code },
    { label: "Contests Hosted", value: "25+", icon: Trophy },
    { label: "Events Organized", value: "50+", icon: Calendar }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5"></div>
          
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-ping"></div>
          <div className="absolute top-3/4 left-3/4 w-3 h-3 bg-accent/30 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-accent-secondary/50 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/6 right-1/4 w-2 h-2 bg-primary/30 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="h-full w-full" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="absolute top-20 left-10 text-primary/20 text-6xl font-mono animate-float">{"{"}</div>
          <div className="absolute bottom-20 right-10 text-accent/20 text-6xl font-mono animate-float" style={{animationDelay: '1s'}}>{"}"}</div>
          <div className="absolute top-1/3 right-20 text-accent-secondary/20 text-4xl font-mono animate-float" style={{animationDelay: '2s'}}>{"</>"}</div>
          <div className="absolute bottom-1/3 left-20 text-primary/15 text-5xl font-mono animate-float" style={{animationDelay: '0.5s'}}>{"[]"}</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-accent/10 text-8xl font-mono animate-pulse">{"()"}</div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Welcome to{" "}
            <span className="dotslash-gradient">
              Flash Code by Dotslash &lt;./&gt;
            </span>
          </h1>
          {/* <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in" style={{animationDelay: '0.2s'}}>
            IIIT Nagpur's Coding Club - Where Learning Meets Innovation
          </p> 
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{animationDelay: '0.4s'}}>
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 hover:scale-105 transition-all"
              onClick={() => navigate('/resources')}
            >
              Explore Resources
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 border-glass-border/50 hover:bg-glass-card/50 hover:scale-105 transition-all"
              onClick={() => navigate('/login')}
            >
              Join Community
            </Button>
          </div> */}
        </div>
      </section>

    </div>
  );
};

export default Flash_Code;