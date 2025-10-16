import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Users, Target, Award } from "lucide-react";
import teamMembers from "@/json/team.json";
import { SiCodechef, SiCodeforces, SiLeetcode, SiLinkedin, SiGithub } from "react-icons/si";

const About = () => {

	const clubStats = [
		{ label: "Active Members", value: "15+", icon: Users },
		{ label: "Events Organized", value: "10+", icon: Target },
		{ label: "Awards Won", value: "25+", icon: Award },
		{ label: "Years Active", value: "7+", icon: Target }
	];

	return (
		<div className="min-h-screen pt-20 px-4">
			<div className="max-w-7xl mx-auto">

				<div className="text-center mb-16">
					<h1 className="text-4xl font-bold text-gradient mb-4">About <span className="dotslash-gradient">
						Dotslash &lt;./&gt;
					</span></h1>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						IIIT Nagpur's premier coding club dedicated to fostering a culture of learning,
						innovation, and excellence in computer science and programming.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-8 mb-16">
					<Card className="glass-card p-8">
						<h2 className="text-2xl font-bold text-gradient mb-4">Our Mission</h2>
						<p className="text-muted-foreground leading-relaxed">
							To create an inclusive learning environment where students can develop their programming skills and
							engage in competitive coding.
						</p>
					</Card>
					<Card className="glass-card p-8">
						<h2 className="text-2xl font-bold text-gradient mb-4">Our Vision</h2>
						<p className="text-muted-foreground leading-relaxed">
							To be the leading coding community that produces skilled programmers, innovative thinkers,
							and future competitive programmers.
						</p>
					</Card>
				</div>

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
								<div className="text-center mb-4">
									<img
										src={member.avatar}
										alt={member.name}
										className="w-48 h-48 mx-auto rounded-full object-cover mb-4" />
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

								<p className="text-muted-foreground text-sm leading-relaxed mb-4">
									{member.bio}
								</p>

								{member.interests && member.interests.length > 0 && (
									<div className="mb-4">
										<p className="text-sm font-medium mb-2">Interests:</p>
										<div className="flex flex-wrap gap-1">
											{member.interests.map((interest, index) => (
												<Badge key={index} variant="secondary" className="text-xs">
													{interest}
												</Badge>
											))}
										</div>
									</div>
								)}

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

								<div className="flex justify-center space-x-3 pt-4 border-t border-glass-border/30">
									{member.social?.email && (
										<a href={`mailto:${member.social.email}`} target="_blank" rel="noopener noreferrer">
											<Button size="sm" variant="outline" className="p-2">
												<Mail className="w-4 h-4" />
											</Button>
										</a>
									)}

									{member.social?.github && (
										<a href={member.social.github} target="_blank" rel="noopener noreferrer">
											<Button size="sm" variant="outline" className="p-2">
												<Github className="w-4 h-4" />
											</Button>
										</a>
									)}

									{member.social?.codechef && (
										<a href={member.social.codechef} target="_blank" rel="noopener noreferrer">
											<Button size="sm" variant="outline" className="p-2">
												<SiCodechef className="w-4 h-4" />
											</Button>
										</a>
									)}
									{member.social?.codeforces && (
										<a href={member.social.codeforces} target="_blank" rel="noopener noreferrer">
											<Button size="sm" variant="outline" className="p-2">
												<SiCodeforces className="w-4 h-4" />
											</Button>
										</a>
									)}
									{member.social?.leetcode && (
										<a href={member.social.leetcode} target="_blank" rel="noopener noreferrer">
											<Button size="sm" variant="outline" className="p-2">
												<SiLeetcode className="w-4 h-4" />
											</Button>
										</a>
									)}

									{member.social?.linkedin && (
										<a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
											<Button size="sm" variant="outline" className="p-2">
												<Linkedin className="w-4 h-4" />
											</Button>
										</a>
									)}
									
								</div>
							</Card>
						))}
					</div>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
					{clubStats.map((stat, index) => (
						<Card key={index} className="glass-card p-6 text-center group hover:glow-effect transition-all duration-300">
							<stat.icon className="w-12 h-12 mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" />
							<div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
							<div className="text-muted-foreground">{stat.label}</div>
						</Card>
					))}
				</div>



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