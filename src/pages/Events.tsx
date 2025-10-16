import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, Filter, ArrowRight } from "lucide-react";
import events from "@/json/events.json"

const Events = () => {
	const [activeTab, setActiveTab] = useState("upcoming");
	const [filterType, setFilterType] = useState("all");

	const eventTypes = [
		{ id: "all", name: "All Events" },
		{ id: "workshop", name: "Workshops" },
		{ id: "competition", name: "Competitions" },
	];

	const getTypeColor = (type: string) => {
		switch (type) {
			case "workshop":
				return "bg-blue-500";
			case "competition":
				return "bg-red-500";
			default:
				return "bg-muted";
		}
	};

	// const formatDate = (dateString: string) => {
	// 	const date = new Date(dateString);
	// 	const day = String(date.getDate()).padStart(2, '0');
	// 	const month = String(date.getMonth() + 1).padStart(2, '0');
	// 	const year = date.getFullYear();
	// 	return `${day}-${month}-${year}`;
	// };


	const filteredEvents = events.filter(event => {
		const matchesTab = event.status === activeTab;
		const matchesType = filterType === "all" || event.type === filterType;
		return matchesTab && matchesType;
	});

	const parseDate = (dateStr: string) => {
		const [day, month, year] = dateStr.split('-').map(Number);
		return new Date(year, month - 1, day);
	};

	const sortedEvents = filteredEvents.sort((a, b) => {
		if (activeTab !== "upcoming") {
			return parseDate(a.date).getTime() - parseDate(b.date).getTime();
		} else {
			return parseDate(b.date).getTime() - parseDate(a.date).getTime();
		}
	});


	return (
		<div className="min-h-screen pt-20 px-4">
			<div className="max-w-6xl mx-auto">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold text-gradient mb-4">Events</h1>
					<p className="text-xl text-muted-foreground">Join our community events and enhance your skills</p>
				</div>

				<div className="flex justify-center mb-8">
					<div className="flex bg-muted/20 rounded-lg p-1">
						<Button
							variant={activeTab === "upcoming" ? "default" : "ghost"}
							onClick={() => setActiveTab("upcoming")}
							className={activeTab === "upcoming" ? "bg-gradient-primary" : ""}
						>
							Upcoming Events
						</Button>
						<Button
							variant={activeTab === "completed" ? "default" : "ghost"}
							onClick={() => setActiveTab("completed")}
							className={activeTab === "completed" ? "bg-gradient-primary" : ""}
						>
							Past Events
						</Button>
					</div>
				</div>

				<Card className="glass-card p-6 mb-8">
					<div className="flex items-center gap-4 flex-wrap">
						<Filter className="w-5 h-5 text-accent" />
						<span className="font-medium">Filter by Type:</span>
						<div className="flex gap-2 flex-wrap">
							{eventTypes.map((type) => (
								<Button
									key={type.id}
									variant={filterType === type.id ? "default" : "outline"}
									size="sm"
									onClick={() => setFilterType(type.id)}
									className={filterType === type.id ? "bg-gradient-primary" : ""}
								>
									{type.name}
								</Button>
							))}
						</div>
					</div>
				</Card>

				<div className="grid md:grid-cols-2 gap-8">
					{sortedEvents.map((event) => (
						<Card key={event.id} className="glass-card p-6 hover:glow-effect transition-all duration-300 group">
							<div className="flex items-start justify-between mb-4">
								<div className="text-4xl">{event.image}</div>
								<div className="flex items-center gap-2">
									<Badge className={`${getTypeColor(event.type)} text-white border-0 capitalize`}>
										{event.type}
									</Badge>
									{event.status === "upcoming" && (
										<Badge variant="outline" className="border-accent text-accent">
											Upcoming
										</Badge>
									)}
								</div>
							</div>

							<h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
								{event.title}
							</h3>

							<p className="text-muted-foreground mb-4 leading-relaxed">
								{event.description}
							</p>

							<div className="space-y-3 mb-4">
								<div className="flex items-center text-sm">
									<Calendar className="w-4 h-4 mr-2 text-accent" />
									<span>{(event.date)}</span>
								</div>
								<div className="flex items-center text-sm">
									<Clock className="w-4 h-4 mr-2 text-accent" />
									<span>{event.time}</span>
								</div>
								<div className="flex items-center text-sm">
									<MapPin className="w-4 h-4 mr-2 text-accent" />
									<span>{event.location}</span>
								</div>
								{/* <div className="flex items-center text-sm">
									<Users className="w-4 h-4 mr-2 text-accent" />
									<span>{event.participants}/{event.maxParticipants} participants</span>
								</div> */}
							</div>

							<div className="text-sm text-muted-foreground mb-4">
								<span className="font-medium">Instructor:</span> {event.instructor}
							</div>

							<div className="flex flex-wrap gap-2 mb-6">
								{event.tags.map((tag, index) => (
									<Badge key={index} variant="secondary" className="text-xs">
										{tag}
									</Badge>
								))}
							</div>

							<div className="mb-4">
								{/* <div className="flex justify-between text-sm mb-1">
									<span>Participation</span>
									<span>{Math.round((event.participants / event.maxParticipants) * 100)}%</span>
								</div>
								<div className="w-full bg-muted rounded-full h-2">
									<div
										className="h-2 bg-gradient-primary rounded-full transition-all duration-300"
										style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
									></div>
								</div> */}
							</div>
							<a href={event.url} target="_blank" rel="noopener noreferrer" className="w-full">

								{event.status === "upcoming" ? (
									<Button className="w-full bg-gradient-primary hover:opacity-90">
										Register Now
										<ArrowRight className="w-4 h-4 ml-2" />
									</Button>
								) : (
									<Button variant="outline" className="w-full border-glass-border/50 hover:bg-glass-card/50">
										View Details
									</Button>

								)}
							</a>
						</Card>
					))}
				</div>

				{sortedEvents.length === 0 && (
					<Card className="glass-card p-12 text-center">
						<div className="text-6xl mb-4">📅</div>
						<h3 className="text-xl font-semibold mb-2">No events found</h3>
						<p className="text-muted-foreground">
							{activeTab === "upcoming"
								? "No upcoming events at the moment. Stay tuned for exciting events!"
								: "No past events match your filter criteria."}
						</p>
					</Card>
				)}

				<Card className="glass-card p-8 text-center mt-12">
					<h2 className="text-2xl font-bold text-gradient mb-4">Have an Event Idea?</h2>
					<p className="text-muted-foreground mb-6">
						Suggest new events or workshops that you'd like to see organized by Dotslash.
					</p>
					<Button size="lg" className="bg-gradient-primary hover:opacity-90">
						Suggest Event
					</Button>
				</Card>
			</div>
		</div>
	);
};

export default Events;