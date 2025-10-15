import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Filter, SortAsc } from "lucide-react";
import leaderboardData from "@/json/leaderboard.json";

const Leaderboard = () => {
  const [sortBy, setSortBy] = useState("overall");
  const [filterContest, setFilterContest] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  const contests = [
    { id: "all", name: "Overall Ranking" },
    { id: "Community Contest 1", name: "Community Contest 1" },
    { id: "Community Contest 2", name: "Community Contest 2" },
    { id: "Community Contest 3", name: "Community Contest 3" },
    { id: "Community Contest 4", name: "Community Contest 4" },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-muted-foreground font-bold">
            {rank}
          </span>
        );
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Legend":
        return "bg-gradient-to-r from-yellow-500 to-orange-500";
      case "Master":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      case "Expert":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      case "Specialist":
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      default:
        return "bg-muted";
    }
  };

  const displayedRows = leaderboardData.slice(0, currentPage * rowsPerPage);
  const isLastPage = displayedRows.length >= leaderboardData.length;

  const handleLoadMore = () => {
    if (!isLastPage) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage(1);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">Leaderboard</h1>
          <p className="text-xl text-muted-foreground">
            Compete, Learn, and Climb the Ranks
          </p>
        </div>

        {/* Filters */}
        <Card className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-accent" />
              <span className="font-medium">Filter by Contest:</span>
              <div className="flex flex-wrap gap-2">
                {contests.map((contest) => (
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
            <Button variant="outline" size="sm">
              <SortAsc className="w-4 h-4 mr-2" />
              Sort by Score
            </Button>
          </div>
        </Card>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {leaderboardData.slice(0, 3).map((user) => (
            <Card
              key={user.rank}
              className={`glass-card p-6 text-center relative overflow-hidden ${
                user.rank === 1 ? "ring-2 ring-yellow-500/50 glow-effect" : ""
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary"></div>
              <div className="text-4xl mb-4">{user.avatar}</div>
              <div className="flex items-center justify-center mb-2">
                {getRankIcon(user.rank)}
                <span className="ml-2 text-2xl font-bold">#{user.rank}</span>
              </div>
              <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
              <p className="text-muted-foreground text-sm mb-3">@{user.username}</p>
              <div className="text-3xl font-bold text-gradient mb-2">{user.totalScore}</div>
              <Badge className={`${getBadgeColor(user.badge)} text-white border-0`}>
                {user.badge}
              </Badge>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card className="glass-card">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Trophy className="w-6 h-6 mr-2 text-accent" />
              Full Rankings
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-glass-border/30">
                    <th className="text-left py-4 px-2">Rank</th>
                    <th className="text-left py-4 px-2">User</th>
                    <th className="text-left py-4 px-2">Total Score</th>
                    <th className="text-left py-4 px-2">Contest 1</th>
                    <th className="text-left py-4 px-2">Contest 2</th>
                    <th className="text-left py-4 px-2">Contest 3</th>
                    <th className="text-left py-4 px-2">Contest 4</th>
                    <th className="text-left py-4 px-2">Badge</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedRows.map((user) => (
                    <tr
                      key={user.rank}
                      className="border-b border-glass-border/30 hover:bg-muted/20 transition-colors"
                    >
                      <td className="py-4 px-2">
                        <div className="flex items-center">{getRankIcon(user.rank)}</div>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{user.avatar}</span>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">@{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className="text-xl font-bold text-gradient">{user.totalScore}</span>
                      </td>
                      <td className="py-4 px-2 text-muted-foreground">{user['Community Contest 1']}</td>
                      <td className="py-4 px-2 text-muted-foreground">{user['Community Contest 2']}</td>
                      <td className="py-4 px-2 text-muted-foreground">{user['Community Contest 3']}</td>
                      <td className="py-4 px-2 text-muted-foreground">{user['Community Contest 4']}</td>
                      <td className="py-4 px-2">
                        <Badge className={`${getBadgeColor(user.badge)} text-white border-0`}>
                          {user.badge}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        {/* Load More / Show Less */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            className="border-glass-border/50 hover:bg-glass-card/50"
            onClick={handleLoadMore}
          >
            {isLastPage ? "Show Less" : "Load More Rankings"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
