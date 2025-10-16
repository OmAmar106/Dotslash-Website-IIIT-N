import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Award, Filter } from "lucide-react";

const Gallery = () => {
	const [activeFilter, setActiveFilter] = useState("all");
	const galleryItems = []
	// const galleryItems = [
	//   {
	//     id: 1,
	//     title: "Hack-a-thon 2023 Winners",
	//     date: "2023-12-15",
	//     category: "achievement",
	//     description: "Our team secured 1st place in the inter-college hackathon with an innovative healthcare solution.",
	//     image: "🏆",
	//     participants: ["Team Alpha", "Team Beta", "Team Gamma"],
	//     tags: ["Hackathon", "1st Place", "Healthcare"]
	//   },
	//   {
	//     id: 2,
	//     title: "ACM ICPC Regional Qualification",
	//     date: "2023-11-20",
	//     category: "achievement",
	//     description: "Three teams from Dotslash qualified for ACM ICPC regionals, marking our best performance yet.",
	//     image: "🎯",
	//     participants: ["Team Recursive", "Team Binary", "Team Algo"],
	//     tags: ["ACM ICPC", "Competitive Programming", "Regional"]
	//   },
	//   {
	//     id: 3,
	//     title: "Web Development Workshop",
	//     date: "2023-10-08",
	//     category: "event",
	//     description: "Hands-on workshop on modern web development with React and Node.js, attended by 80+ students.",
	//     image: "💻",
	//     participants: ["80+ Students", "Industry Experts", "Core Team"],
	//     tags: ["Workshop", "Web Development", "React"]
	//   },
	//   {
	//     id: 4,
	//     title: "Code Golf Championship",
	//     date: "2023-09-22",
	//     category: "event",
	//     description: "Fun coding event where participants wrote the shortest code possible to solve challenges.",
	//     image: "⛳",
	//     participants: ["120+ Participants", "Creative Solutions", "Fun Coding"],
	//     tags: ["Code Golf", "Fun Event", "Creativity"]
	//   },
	//   {
	//     id: 5,
	//     title: "Google Summer of Code Selection",
	//     date: "2023-08-10",
	//     category: "achievement",
	//     description: "Five students from Dotslash got selected for Google Summer of Code 2023.",
	//     image: "🌟",
	//     participants: ["Ananya S.", "Arjun P.", "Priya K.", "Rohit V.", "Sneha G."],
	//     tags: ["GSoC", "Open Source", "Google"]
	//   },
	//   {
	//     id: 6,
	//     title: "AI/ML Workshop Series",
	//     date: "2023-07-15",
	//     category: "event",
	//     description: "Comprehensive workshop series on AI and Machine Learning fundamentals and applications.",
	//     image: "🤖",
	//     participants: ["60+ Attendees", "ML Engineers", "Research Students"],
	//     tags: ["AI", "Machine Learning", "Workshop Series"]
	//   },
	//   {
	//     id: 7,
	//     title: "Inter-College Programming Contest",
	//     date: "2023-06-05",
	//     category: "achievement",
	//     description: "Hosted our annual programming contest with participation from 15+ colleges across Maharashtra.",
	//     image: "🏅",
	//     participants: ["300+ Participants", "15 Colleges", "Cash Prizes"],
	//     tags: ["Programming Contest", "Inter-College", "Host Event"]
	//   },
	//   {
	//     id: 8,
	//     title: "Open Source Contribution Drive",
	//     date: "2023-05-20",
	//     category: "event",
	//     description: "Community event focused on teaching students how to contribute to open source projects.",
	//     image: "🌐",
	//     participants: ["45 Contributors", "20+ Repositories", "First PRs"],
	//     tags: ["Open Source", "GitHub", "Community"]
	//   },
	//   {
	//     id: 9,
	//     title: "Tech Talk: Industry Insights",
	//     date: "2023-04-12",
	//     category: "event",
	//     description: "Industry professionals shared insights about current tech trends and career opportunities.",
	//     image: "🎤",
	//     participants: ["Industry Speakers", "100+ Attendees", "Q&A Session"],
	//     tags: ["Tech Talk", "Industry", "Career Guidance"]
	//   }
	// ];

	const categories = [
		{ id: "all", name: "All", icon: "📸" },
		{ id: "achievement", name: "Achievements", icon: "🏆" },
		{ id: "event", name: "Events", icon: "📅" }
	];

	const filteredItems = activeFilter === "all"
		? galleryItems
		: galleryItems.filter(item => item.category === activeFilter);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	return (
		<div className="min-h-screen pt-20 px-4">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gradient mb-4">Gallery</h1>
					<p className="text-xl text-muted-foreground">Celebrating our achievements and memorable moments</p>
				</div>

				{/* Stats Overview */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
					<Card className="glass-card p-6 text-center">
						<div className="text-3xl mb-2">🏆</div>
						<div className="text-2xl font-bold text-gradient">60+</div>
						<div className="text-muted-foreground text-sm">Members</div>
					</Card>
					<Card className="glass-card p-6 text-center">
						<div className="text-3xl mb-2">📅</div>
						<div className="text-2xl font-bold text-gradient">20+</div>
						<div className="text-muted-foreground text-sm">Events Hosted</div>
					</Card>
					<Card className="glass-card p-6 text-center">
						<div className="text-3xl mb-2">👥</div>
						<div className="text-2xl font-bold text-gradient">2000+</div>
						<div className="text-muted-foreground text-sm">Participants</div>
					</Card>
					<Card className="glass-card p-6 text-center">
						<div className="text-3xl mb-2">🎯</div>
						<div className="text-2xl font-bold text-gradient">5+</div>
						<div className="text-muted-foreground text-sm">Years Active</div>
					</Card>
				</div>

				{/* Category Filter */}
				<Card className="glass-card p-6 mb-8">
					<div className="flex items-center gap-4 flex-wrap">
						<Filter className="w-5 h-5 text-accent" />
						<span className="font-medium">Filter by Category:</span>
						<div className="flex gap-2 flex-wrap">
							{categories.map((category) => (
								<Button
									key={category.id}
									variant={activeFilter === category.id ? "default" : "outline"}
									size="sm"
									onClick={() => setActiveFilter(category.id)}
									className={activeFilter === category.id ? "bg-gradient-primary" : ""}
								>
									<span className="mr-2">{category.icon}</span>
									{category.name}
								</Button>
							))}
						</div>
					</div>
				</Card>

				{/* Gallery Grid */}
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredItems.map((item) => (
						<Card key={item.id} className="glass-card overflow-hidden hover:glow-effect transition-all duration-300 group">
							{/* Image/Icon Section */}
							<div className="relative h-48 bg-gradient-card flex items-center justify-center">
								<div className="text-6xl group-hover:scale-110 transition-transform duration-300">
									{item.image}
								</div>
								<div className="absolute top-4 right-4">
									<Badge
										className={`${item.category === "achievement" ? "bg-yellow-500" : "bg-blue-500"} text-white border-0`}
									>
										{item.category === "achievement" ? (
											<Award className="w-3 h-3 mr-1" />
										) : (
											<Calendar className="w-3 h-3 mr-1" />
										)}
										{item.category}
									</Badge>
								</div>
							</div>

							{/* Content */}
							<div className="p-6">
								<div className="flex items-center justify-between mb-3">
									<h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
										{item.title}
									</h3>
									<div className="flex items-center text-sm text-muted-foreground">
										<Calendar className="w-4 h-4 mr-1" />
										{formatDate(item.date)}
									</div>
								</div>

								<p className="text-muted-foreground text-sm leading-relaxed mb-4">
									{item.description}
								</p>

								{/* Participants */}
								<div className="mb-4">
									<div className="flex items-center text-sm font-medium mb-2">
										<Users className="w-4 h-4 mr-1 text-accent" />
										Participants:
									</div>
									<div className="space-y-1">
										{item.participants.slice(0, 3).map((participant, index) => (
											<div key={index} className="text-xs text-muted-foreground">
												• {participant}
											</div>
										))}
										{item.participants.length > 3 && (
											<div className="text-xs text-accent">
												+{item.participants.length - 3} more
											</div>
										)}
									</div>
								</div>

								{/* Tags */}
								<div className="flex flex-wrap gap-2 mb-4">
									{item.tags.map((tag, index) => (
										<Badge key={index} variant="secondary" className="text-xs">
											{tag}
										</Badge>
									))}
								</div>

								{/* Action Button */}
								<Button
									variant="outline"
									size="sm"
									className="w-full border-glass-border/50 hover:bg-glass-card/50"
								>
									View Details
								</Button>
							</div>
						</Card>
					))}
				</div>

				{filteredItems.length === 0 && (
					<Card className="glass-card p-12 text-center">
						<div className="text-6xl mb-4">📸</div>
						<h3 className="text-xl font-semibold mb-2">No items found</h3>
						<p className="text-muted-foreground">
							No gallery items match the selected category.
						</p>
					</Card>
				)}

				

				{/* Upload Section */}
				<Card className="glass-card p-8 text-center mt-12">
					<h2 className="text-2xl font-bold text-gradient mb-4">Share Your Moments</h2>
					<p className="text-muted-foreground mb-6">
						Have photos from our events? Share them with the community!
					</p>
					<Button size="lg" className="bg-gradient-primary hover:opacity-90">
						Upload Photos
					</Button>
				</Card>
			</div>
		</div>
	);
};

export default Gallery;