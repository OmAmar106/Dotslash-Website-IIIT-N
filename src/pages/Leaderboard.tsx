import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Filter, SortAsc, Search } from "lucide-react";
import leaderboardData from "@/json/leaderboard.json";

const Leaderboard = () => {
  const [filterContest, setFilterContest] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortAsc, setSortAsc] = useState(false);
  const rowsPerPage = 20;

  const contests = [
    { id: "all", name: "Overall Ranking" },
    { id: "Community Contest 1", name: "Community Contest 1" },
    { id: "Community Contest 2", name: "Community Contest 2" },
    { id: "Community Contest 3", name: "Community Contest 3" },
    { id: "Community Contest 4", name: "Community Contest 4" }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">{rank}</span>;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Legend": return "bg-gradient-to-r from-yellow-500 to-orange-500";
      case "Master": return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "Expert": return "bg-gradient-to-r from-blue-500 to-cyan-500";
      case "Specialist": return "bg-gradient-to-r from-green-500 to-emerald-500";
      default: return "bg-muted";
    }
  };

  const processedData = useMemo(() => {
    let data = leaderboardData.filter(
      user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortField = filterContest === "all" ? "totalScore" : filterContest;

    data.sort((a, b) => {
      const aScore = a[sortField] ?? 0;
      const bScore = b[sortField] ?? 0;
      return sortAsc ? aScore - bScore : bScore - aScore;
    });

    return data.map((user, index) => ({ ...user, rank: index + 1 }));
  }, [searchQuery, sortAsc, filterContest]);

  const totalPages = Math.ceil(processedData.length / rowsPerPage);
  const paginatedData = processedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  useEffect(() => setCurrentPage(1), [searchQuery, filterContest]);

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">Leaderboard</h1>
          <p className="text-xl text-muted-foreground">Compete, Learn, and Climb the Ranks</p>
        </div>

        {/* Filters */}
        <Card className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 flex-wrap">
              <Filter className="w-5 h-5 text-accent" />
              <span className="font-medium">Filter by Contest:</span>
              <div className="flex flex-wrap gap-2">
                {contests.map(contest => (
                  <Button
                    key={contest.id}
                    variant={filterContest === contest.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterContest(contest.id)}
                    className={filterContest === contest.id ? "bg-gradient-primary" : ""}
                  >
                    {contest.name}
                  </Button>
                ))}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setSortAsc(!sortAsc)}>
              <SortAsc className="w-4 h-4 mr-2" />
              Sort by Score {sortAsc ? "↑" : "↓"}
            </Button>
          </div>
        </Card>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {processedData.slice(0, 3).map(user => (
            <Card
              key={user.rank}
              className={`glass-card p-6 text-center relative overflow-hidden ${user.rank === 1 ? "ring-2 ring-yellow-500/50 glow-effect" : ""}`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary"></div>
              <div className="mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
              </div>
              <div className="flex items-center justify-center mb-2">
                {getRankIcon(user.rank)}
                <span className="ml-2 text-2xl font-bold">#{user.rank}</span>
              </div>
              <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
              <p className="text-muted-foreground text-sm mb-3">@{user.username}</p>
              <div className="text-3xl font-bold text-gradient mb-2">{user.totalScore}</div>
              <Badge className={`${getBadgeColor(user.badge)} text-white border-0`}>{user.badge}</Badge>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card className="glass-card">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-accent" />
                Full Rankings
              </h2>
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-input border border-glass-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-glass-border/30">
                    <th className="text-left py-4 px-2">Rank</th>
                    <th className="text-left py-4 px-2">User</th>
                    <th className="text-center py-4 px-2">Total Score</th>
                    <th className="text-center py-4 px-2">Contest 1</th>
                    <th className="text-center py-4 px-2">Contest 2</th>
                    <th className="text-center py-4 px-2">Contest 3</th>
                    <th className="text-center py-4 px-2">Contest 4</th>
                    <th className="text-left py-4 px-2">Badge</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map(user => (
                    <tr key={user.rank} className="border-b border-glass-border/30 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-2">{getRankIcon(user.rank)}</td>
                      <td className="py-4 px-2">
                        <div className="flex items-center">
						<div className="relative w-10 h-10 mr-3">
							{user.rank === 1 && (
							<span className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-lg">
								👑
							</span>
							)}
							<img
							src={user.avatar}
							alt={user.name}
							className="w-10 h-10 rounded-full object-cover"
							/>
						</div>
						<div>
							<div className="font-medium">{user.name}</div>
							<div className="text-sm text-muted-foreground">@{user.username}</div>
						</div>
						</div>

                      </td>
                      <td className="py-4 px-2 text-center"><span className="text-xl font-bold text-gradient">{user.totalScore}</span></td>
                      <td className="py-4 px-2 text-center text-muted-foreground">{user['Community Contest 1']}</td>
                      <td className="py-4 px-2 text-center text-muted-foreground">{user['Community Contest 2']}</td>
                      <td className="py-4 px-2 text-center text-muted-foreground">{user['Community Contest 3']}</td>
                      <td className="py-4 px-2 text-center text-muted-foreground">{user['Community Contest 4']}</td>
                      <td className="py-4 px-2">
                        <Badge className={`${getBadgeColor(user.badge)} text-white border-0`}>{user.badge}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  size="sm"
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
