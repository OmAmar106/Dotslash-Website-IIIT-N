import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Code, Trophy, ArrowRight, Clock, Award } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ue from "@/json/events.json"
import allContests from "@/json/contests.json"

const Home = () => {
	const navigate = useNavigate();

	const upcomingEvents = ue
		.filter(e => e.status === "upcoming")
		.sort((a, b) => {
			const [dayA, monthA, yearA] = a.date.split("-");
			const [dayB, monthB, yearB] = b.date.split("-");
			const timeA = a.time.split(" - ")[0];
			const timeB = b.time.split(" - ")[0];

			const dateA = new Date(`${yearA}-${monthA}-${dayA} ${timeA}`);
			const dateB = new Date(`${yearB}-${monthB}-${dayB} ${timeB}`);

			return Number(dateA) - Number(dateB);
		})
		.slice(0, 3);

	const upcomingContests = allContests
		.sort((a, b) => a.startTime - b.startTime)
		.slice(0, 3);

	const stats = [
		{ label: "Active Members", value: "15+", icon: Users },
		{ label: "Students Learning", value: "1,000+", icon: Code },
		{ label: "Contests Hosted", value: "15+", icon: Trophy },
		{ label: "Events Organized", value: "50+", icon: Calendar }
	];

	const pC = {
		"Codeforces": "bg-blue-500/20 text-blue-400",
		"Leetcode": "bg-orange-500/20 text-orange-400",
		"Codechef": "bg-amber-500/20 text-amber-400",
		"Atcoder": "bg-green-500/20 text-green-400",
		"Hackerrank": "bg-emerald-500/20 text-emerald-400"
	};

	const formatDate = (ms) => {
		const date = new Date(ms);
		const day = date.getDate();
		const suffix = (d => d % 10 === 1 && d !== 11 ? "st" : d % 10 === 2 && d !== 12 ? "nd" : d % 10 === 3 && d !== 13 ? "rd" : "th")(day);
		const month = date.toLocaleString("default", { month: "short" });
		return `${day}${suffix} ${month}`;
	};

	const formatDuration = (ms) => {
		const totalMinutes = Math.floor(ms / 60000);
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hours > 0 ? hours + "h " : ""}${minutes}m`;
	};

	return (
		<div className="min-h-screen">
			<section className="relative h-screen flex items-center justify-center overflow-hidden">
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80"></div>
					<div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5"></div>

					<div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-ping"></div>
					<div className="absolute top-3/4 left-3/4 w-3 h-3 bg-accent/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
					<div className="absolute top-1/2 left-1/6 w-1 h-1 bg-accent-secondary/50 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
					<div className="absolute top-1/6 right-1/4 w-2 h-2 bg-primary/30 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>

					<div className="absolute inset-0 opacity-[0.02]">
						<div className="h-full w-full" style={{
							backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
							backgroundSize: '40px 40px'
						}}></div>
					</div>

					<div className="absolute top-20 left-10 text-primary/20 text-6xl font-mono animate-float">{"{"}</div>
					<div className="absolute bottom-20 right-10 text-accent/20 text-6xl font-mono animate-float" style={{ animationDelay: '1s' }}>{"}"}</div>
					<div className="absolute top-1/3 right-20 text-accent-secondary/20 text-4xl font-mono animate-float" style={{ animationDelay: '2s' }}>{"</>"}</div>
					<div className="absolute bottom-1/3 left-20 text-primary/15 text-5xl font-mono animate-float" style={{ animationDelay: '0.5s' }}>{"[]"}</div>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-accent/10 text-8xl font-mono animate-pulse">{"()"}</div>
				</div>

				<div className="relative z-10 text-center max-w-4xl mx-auto px-4">
					<h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ whiteSpace: 'nowrap' }}>
						Welcome to{" "}
						<span className="dotslash-gradient">
							Dotslash &lt;./&gt;
						</span>
					</h1>
					<p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
						IIIT Nagpur's Coding Club - Where Learning Meets Innovation
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
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
							onClick={() => navigate('/about')}
						>
							Join Community
						</Button>
					</div>
				</div>
			</section>

			<section className="py-20 px-4">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{stats.map((stat, index) => (
							<Card key={index} className="glass-card p-6 text-center group hover:glow-effect transition-all duration-300">
								<stat.icon className="w-12 h-12 mx-auto mb-4 text-accent group-hover:scale-110 transition-transform" />
								<div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
								<div className="text-muted-foreground">{stat.label}</div>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 px-4">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gradient mb-4">Upcoming Events</h2>
						<p className="text-xl text-muted-foreground">Join us in our learning journey</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{upcomingEvents.map((event) => (
							<Card key={event.id} className="glass-card p-6 hover:glow-effect transition-all duration-300 group">
								<div className="flex items-center justify-between mb-4">
									<span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
										{event.type}
									</span>
									<div className="flex items-center text-muted-foreground text-sm">
										<Users className="w-4 h-4 mr-1" />
										100+
									</div>
								</div>

								<h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
									{event.title}
								</h3>

								<div className="space-y-2 text-muted-foreground">
									<div className="flex items-center">
										<Calendar className="w-4 h-4 mr-2 text-accent" />
										{event.date}
									</div>
									<div className="text-sm">{event.time}</div>
								</div>

								<Button
									className="w-full mt-4 bg-gradient-primary hover:opacity-90"
									onClick={() => navigate('/events')}
								>
									Register Now
								</Button>
							</Card>
						))}
					</div>

					<div className="text-center mt-12">
						<Button
							variant="outline"
							size="lg"
							className="border-glass-border/50 hover:bg-glass-card/50"
							onClick={() => navigate('/events')}
						>
							View All Events
							<ArrowRight className="w-5 h-5 ml-2" />
						</Button>
					</div>
				</div>
			</section>

			<section className="py-20 px-4">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gradient mb-4">Upcoming Contests</h2>
						<p className="text-xl text-muted-foreground">Participate in competitive programming contests</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{upcomingContests.map((contest) => (
							<Card key={contest.url} className="glass-card p-6 hover:glow-effect transition-all duration-300 group">
								<div className="flex items-center justify-between mb-4">
									<span className={`px-3 py-1 rounded-full text-sm font-medium ${pC[contest.site.charAt(0).toUpperCase() + contest.site.slice(1)]}`}>
										{contest.site.charAt(0).toUpperCase() + contest.site.slice(1)}
									</span>

								</div>

								<h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
									{contest.title}
								</h3>

								<div className="space-y-2 text-muted-foreground">
									<div className="flex items-center">
										<Calendar className="w-4 h-4 mr-2 text-accent" />
										{formatDate(contest.startTime)}
									</div>
									<div className="text-sm">{new Date(contest.startTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}</div>
									<div className="text-sm font-medium text-accent">
										Duration: {formatDuration(contest.duration)}
									</div>
								</div>


								<Button
									className="w-full mt-4 bg-gradient-primary hover:opacity-90"
									onClick={() => window.open(`https://${contest.site.toLowerCase()}.com`, '_blank')}
								>
									Register
								</Button>
							</Card>
						))}
					</div>

					<div className="text-center mt-12">
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline" size="lg" className="border-glass-border/50 hover:bg-glass-card/50">
									View All Contests
									<ArrowRight className="w-5 h-5 ml-2" />
								</Button>
							</DialogTrigger>
							<DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background/95 backdrop-blur-md border-glass-border/50">
								<DialogHeader>
									<DialogTitle className="text-2xl font-bold text-gradient mb-4">All Upcoming Contests</DialogTitle>
								</DialogHeader>
								<div className="space-y-4">
									{allContests.map((contest) => (
										<Card key={contest.url} className="glass-card p-6 hover:glow-effect transition-all duration-300">
											<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
												<div className="flex-1">
													<div className="flex items-center gap-3 mb-3">
														<Badge className={`${pC[contest.site.charAt(0).toUpperCase() + contest.site.slice(1)]} border-0`}>
															{contest.site.charAt(0).toUpperCase() + contest.site.slice(1)}
														</Badge>
													</div>

													<h3 className="text-xl font-semibold mb-2 text-foreground">
														{contest.title}
													</h3>

													<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
														<div className="flex items-center text-muted-foreground">
															<Calendar className="w-4 h-4 mr-2 text-accent" />
															{formatDate(contest.startTime)}
														</div>
														<div className="flex items-center text-muted-foreground">
															<Clock className="w-4 h-4 mr-2 text-accent" />
															{new Date(contest.startTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })}
														</div>

													</div>

													<div className="flex items-center gap-4 mt-3 text-sm">
														<div className="flex items-center text-muted-foreground">
															<Trophy className="w-4 h-4 mr-2 text-accent" />
															Duration: {formatDuration(contest.duration)}
														</div>
													</div>
												</div>

												<div className="lg:w-32">
													<Button
														className="w-full bg-gradient-primary hover:opacity-90"
														onClick={() => window.open(`https://${contest.site.toLowerCase()}.com`, '_blank')}
													>
														Register
													</Button>
												</div>
											</div>
										</Card>
									))}
								</div>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</section>

			<section className="py-20 px-4">
				<div className="max-w-4xl mx-auto text-center">
					<Card className="glass-card p-12">
						<h2 className="text-3xl font-bold text-gradient mb-4">Ready to Start Coding?</h2>
						<p className="text-xl text-muted-foreground mb-8">
							Join our community of passionate programmers and take your skills to the next level.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								className="bg-gradient-primary hover:opacity-90"
								onClick={() => navigate('/login')}
							>
								Get Started
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="border-glass-border/50 hover:bg-glass-card/50"
								onClick={() => navigate('/about')}
							>
								Learn More
							</Button>
						</div>
					</Card>
				</div>
			</section>
		</div>
	);
};

export default Home;