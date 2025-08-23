import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Users, Target, Award } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      role: "Faculty Advisor",
      department: "Computer Science",
      bio: "Professor with 15 years of experience in algorithms and competitive programming.",
      avatar: "👨‍🏫",
      skills: ["Algorithms", "Research", "Mentoring"],
      social: {
        email: "rajesh@iiitn.ac.in",
        linkedin: "#",
        github: "#"
      }
    },
    {
      id: 2,
      name: "Ananya Sharma",
      role: "President",
      year: "3rd Year CSE",
      bio: "Passionate about competitive programming and web development. Leading the club towards new heights.",
      avatar: "👩‍💻",
      skills: ["Leadership", "Full Stack", "CP"],
      achievements: ["ACM ICPC Regionals", "Google Summer of Code"],
      social: {
        email: "ananya@student.iiitn.ac.in",
        linkedin: "#",
        github: "#"
      }
    },
    {
      id: 3,
      name: "Arjun Patel",
      role: "Vice President",
      year: "3rd Year CSE",
      bio: "Machine learning enthusiast and algorithm optimizer. Organizing workshops and coding contests.",
      avatar: "👨‍💻",
      skills: ["Machine Learning", "Python", "Algorithms"],
      achievements: ["Codeforces Expert", "Kaggle Expert"],
      social: {
        email: "arjun@student.iiitn.ac.in",
        linkedin: "#",
        github: "#"
      }
    },
    {
      id: 4,
      name: "Priya Singh",
      role: "Technical Head",
      year: "2nd Year CSE",
      bio: "Frontend developer and UI/UX designer. Creating amazing experiences for club members.",
      avatar: "👩‍🎨",
      skills: ["React", "UI/UX", "JavaScript"],
      achievements: ["Hackathon Winner", "Open Source Contributor"],
      social: {
        email: "priya@student.iiitn.ac.in",
        linkedin: "#",
        github: "#"
      }
    },
    {
      id: 5,
      name: "Rohit Verma",
      role: "Event Coordinator",
      year: "2nd Year CSE",
      bio: "Event management expert and community builder. Organizing engaging events and workshops.",
      avatar: "👨‍💼",
      skills: ["Event Management", "Public Speaking", "Python"],
      achievements: ["TEDx Speaker", "Event Organizer"],
      social: {
        email: "rohit@student.iiitn.ac.in",
        linkedin: "#",
        github: "#"
      }
    },
    {
      id: 6,
      name: "Sneha Gupta",
      role: "Content Creator",
      year: "1st Year CSE",
      bio: "Creating educational content and tutorials for the coding community.",
      avatar: "👩‍📚",
      skills: ["Content Writing", "Video Editing", "Java"],
      achievements: ["Tech Blogger", "YouTube Creator"],
      social: {
        email: "sneha@student.iiitn.ac.in",
        linkedin: "#",
        github: "#"
      }
    }
  ];

  const clubStats = [
    { label: "Active Members", value: "250+", icon: Users },
    { label: "Events Organized", value: "50+", icon: Target },
    { label: "Awards Won", value: "25+", icon: Award },
    { label: "Years Active", value: "5+", icon: Target }
  ];

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gradient mb-4">About <span className="dotslash-gradient">
              Dotslash &lt;./&gt;
            </span></h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            IIIT Nagpur's premier coding club dedicated to fostering a culture of learning, 
            innovation, and excellence in computer science and programming.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-bold text-gradient mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To create an inclusive learning environment where students can develop their programming skills, 
              engage in competitive coding, and collaborate on innovative projects that solve real-world problems.
            </p>
          </Card>
          <Card className="glass-card p-8">
            <h2 className="text-2xl font-bold text-gradient mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To be the leading coding community that produces skilled programmers, innovative thinkers, 
              and future tech leaders who contribute meaningfully to the technology industry.
            </p>
          </Card>
        </div>

        {/* Club Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {clubStats.map((stat, index) => (
            <Card key={index} className="glass-card p-6 text-center group hover:glow-effect transition-all duration-300">
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Team Members */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gradient mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground">
              The passionate individuals driving Dotslash forward
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.id} className="glass-card p-6 hover:glow-effect transition-all duration-300 group">
                {/* Avatar and Role */}
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <Badge className="bg-gradient-primary text-primary-foreground border-0 mb-1">
                    {member.role}
                  </Badge>
                  {member.year && (
                    <p className="text-sm text-muted-foreground">{member.year}</p>
                  )}
                  {member.department && (
                    <p className="text-sm text-muted-foreground">{member.department}</p>
                  )}
                </div>

                {/* Bio */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {member.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                {member.achievements && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Achievements:</p>
                    <div className="space-y-1">
                      {member.achievements.map((achievement, index) => (
                        <div key={index} className="text-xs text-accent flex items-center">
                          <Award className="w-3 h-3 mr-1" />
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Links */}
                <div className="flex justify-center space-x-3 pt-4 border-t border-glass-border/30">
                  <Button size="sm" variant="outline" className="p-2">
                    <Mail className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2">
                    <Github className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* What We Do */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gradient text-center mb-8">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card p-6 text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-3">Competitive Programming</h3>
              <p className="text-muted-foreground">
                Regular contests, training sessions, and participation in national level competitions.
              </p>
            </Card>
            <Card className="glass-card p-6 text-center">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold mb-3">Workshops & Training</h3>
              <p className="text-muted-foreground">
                Hands-on workshops on latest technologies, frameworks, and programming languages.
              </p>
            </Card>
            <Card className="glass-card p-6 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-3">Project Development</h3>
              <p className="text-muted-foreground">
                Collaborative projects, hackathons, and open-source contributions.
              </p>
            </Card>
          </div>
        </div>

        {/* Join Us */}
        <Card className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold text-gradient mb-4">Want to Join Our Team?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for passionate individuals who want to contribute to our mission 
            of building a strong coding community at IIIT Nagpur.
          </p>
          <Button size="lg" className="bg-gradient-primary hover:opacity-90">
            Apply for Core Team
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default About;