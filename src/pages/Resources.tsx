import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, ExternalLink, Download, Filter } from "lucide-react";
import resources from "@/json/resource.json"

const Resources = () => {
	const [activeLevel, setActiveLevel] = useState("all");

	const levels = [
		{ id: "all", name: "All Levels", color: "bg-muted" },
		{ id: "beginner", name: "Beginner", color: "bg-green-500" },
		{ id: "intermediate", name: "Intermediate", color: "bg-yellow-500" },
		{ id: "advanced", name: "Advanced", color: "bg-red-500" }
	];

	const getTypeIcon = (type: string) => {
		switch (type) {
			case "video":
				return <Video className="w-5 h-5" />;
			case "course":
				return <BookOpen className="w-5 h-5" />;
			case "blog":
				return <BookOpen className="w-5 h-5" />;
			case "ebook":
				return <BookOpen className="w-5 h-5" />;
			default:
				return <BookOpen className="w-5 h-5" />;
		}
	};

	const getLevelColor = (level: string) => {
		switch (level) {
			case "beginner":
				return "bg-green-500";
			case "intermediate":
				return "bg-yellow-500";
			case "advanced":
				return "bg-red-500";
			default:
				return "bg-muted";
		}
	};

	const filteredResources = activeLevel === "all"
		? resources
		: resources.filter(resource => resource.level === activeLevel);

	return (
		<div className="min-h-screen pt-20 px-4">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<div className="relative">
						<h1 className="text-5xl font-bold text-gradient mb-6">Learning Resources</h1>
						<div className="absolute -top-2 -right-8 text-accent/30 text-6xl font-mono">{'{ }'}</div>
					</div>
					<p className="text-xl text-muted-foreground max-w-2xl mx-auto">
						Carefully curated resources designed to accelerate your coding journey from beginner to expert
					</p>
					<div className="mt-6 flex justify-center gap-4 text-sm text-muted-foreground">
						<span className="flex items-center gap-2">
							📚 {resources.length} Resources
						</span>
						<span className="flex items-center gap-2">
							🎯 3 Skill Levels
						</span>
						<span className="flex items-center gap-2">
							💻 Multiple Formats
						</span>
					</div>
				</div>

				<Card className="glass-card p-6 mb-8">
					<div className="flex items-center gap-4 flex-wrap">
						<Filter className="w-5 h-5 text-accent" />
						<span className="font-medium">Filter by Level:</span>
						<div className="flex gap-2 flex-wrap">
							{levels.map((level) => (
								<Button
									key={level.id}
									variant={activeLevel === level.id ? "default" : "outline"}
									size="sm"
									onClick={() => setActiveLevel(level.id)}
									className={activeLevel === level.id ? "bg-gradient-primary" : ""}
								>
									<div className={`w-3 h-3 rounded-full ${level.color} mr-2`}></div>
									{level.name}
								</Button>
							))}
						</div>
					</div>
				</Card>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredResources.map((resource, index) => (
						<Card key={resource.id} className="glass-card p-6 hover:glow-effect transition-all duration-500 group relative overflow-hidden animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
							{/* <div className="absolute top-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity">
								<div className="text-4xl font-mono text-primary">{resource.type === 'video' ? '▶' : null}</div>
							</div> */}

							<div className="flex items-start justify-between mb-4 relative z-10">
								<div className="flex items-center gap-2">
									<div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
										{getTypeIcon(resource.type)}
									</div>
									<Badge variant="outline" className="capitalize font-mono text-xs">
										{resource.type}
									</Badge>
								</div>
								<Badge className={`${getLevelColor(resource.level)} text-white border-0 capitalize shadow-lg`}>
									{resource.level}
								</Badge>
							</div>

							<h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
								{resource.title}
							</h3>

							<p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
								{resource.description}
							</p>

							<div className="flex items-center gap-2 text-sm text-accent mb-4 font-medium bg-accent/10 rounded-lg px-3 py-2">
								<div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
								{resource.duration}
							</div>

							<div className="flex flex-wrap gap-2 mb-6">
								{resource.tags.map((tag, index) => (
									<Badge key={index} variant="secondary" className="text-xs hover:bg-primary/20 transition-colors cursor-default">
										#{tag}
									</Badge>
								))}
							</div>

							<div className="flex gap-2">
								<Button
									size="sm"
									className="flex-1 bg-gradient-primary hover:opacity-90 hover:scale-105 transition-all text-white"
									onClick={() => window.open(resource.url, '_blank')}
								>
									<ExternalLink className="w-4 h-4 mr-2" />
									Access
								</Button>
								<Button
									size="sm"
									variant="outline"
									className="hover:bg-accent/10 hover:border-accent hover:text-foreground transition-all"
									onClick={() => window.open(resource.downloadUrl, '_blank')}
								>
									<Download className="w-4 h-4" />
								</Button>
							</div>
						</Card>
					))}
				</div>

				<div className="mt-16">
					<h2 className="text-3xl font-bold text-gradient text-center mb-8">Featured Video Tutorial</h2>
					<Card className="glass-card p-6 max-w-4xl mx-auto">
						<div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4 overflow-hidden">
							<iframe
								className="w-full h-full rounded-lg"
								src="https://www.youtube.com/embed/xAeiXy8-9Y8?si=gNR2iwJ8cKVZOr0h"
								title="YouTube video player"
								allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
								allowFullScreen
							></iframe>
						</div>
						<div className="text-center">
							<h3 className="text-xl font-semibold mb-2">New to CP?</h3>
							<p className="text-muted-foreground mb-4">
								Learn how to use Codeforces and get started with Competitive Programming.
							</p>
							<Button className="bg-gradient-primary hover:opacity-90">
								Watch Now
							</Button>
						</div>
					</Card>
				</div>


 				<div className="mt-16">
					<Card className="glass-card p-8 text-center">
						<h2 className="text-2xl font-bold text-gradient mb-4">Can't Find What You're Looking For?</h2>
						<p className="text-muted-foreground mb-6">
							Request specific resources or suggest new topics for our community to learn together.
						</p>
						<Button size="lg" className="bg-gradient-primary hover:opacity-90">
							Request Resource
						</Button>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Resources;