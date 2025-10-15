import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Circle, ExternalLink, Filter, Search } from "lucide-react";
import problems from "@/json/problems.json";

const Problems = () => {
  const [selectedProblems, setSelectedProblems] = useState<number[]>(() => {
    const saved = sessionStorage.getItem("selectedProblems");
    return saved ? JSON.parse(saved) : [];
  });

  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterTopic, setFilterTopic] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    sessionStorage.setItem("selectedProblems", JSON.stringify(selectedProblems));
  }, [selectedProblems]);

  const difficulties = ["all", "easy", "medium", "hard"];
  const topics = ["all", "Arrays", "Trees", "Dynamic Programming", "Stack", "Graphs", "Sorting", "Searching"];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-muted";
    }
  };

  const toggleProblem = (problemId: number) => {
    setSelectedProblems((prev) =>
      prev.includes(problemId)
        ? prev.filter((id) => id !== problemId)
        : [...prev, problemId]
    );
  };

  const filteredProblems = problems
    .filter((problem) => {
      const matchesDifficulty = filterDifficulty === "all" || problem.difficulty === filterDifficulty;
      const matchesTopic = filterTopic === "all" || problem.topic === filterTopic;
      const matchesSearch =
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDifficulty && matchesTopic && matchesSearch;
    })
    // ✅ Move solved problems to bottom
    .sort((a, b) => {
      const aSolved = selectedProblems.includes(a.id);
      const bSolved = selectedProblems.includes(b.id);
      return Number(aSolved) - Number(bSolved);
    });

  const solvedCount = selectedProblems.length;
  const totalCount = problems.length;
  const progressPercentage = (solvedCount / totalCount) * 100;

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gradient mb-4">Practice Problems</h1>
          <p className="text-xl text-muted-foreground">Track your progress and improve your problem-solving skills</p>
        </div>

        <Card className="glass-card p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">{solvedCount}/{totalCount}</div>
              <div className="text-muted-foreground">Problems Solved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">{progressPercentage.toFixed(1)}%</div>
              <div className="text-muted-foreground">Progress</div>
            </div>
            <div className="text-center">
              <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                <div 
                  className="h-full bg-gradient-primary transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="text-muted-foreground mt-2">Completion Rate</div>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 mb-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input border border-glass-border/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-accent" />
                <span className="font-medium">Difficulty:</span>
                <div className="flex gap-2">
                  {difficulties.map((diff) => (
                    <Button
                      key={diff}
                      variant={filterDifficulty === diff ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterDifficulty(diff)}
                      className={filterDifficulty === diff ? "bg-gradient-primary" : ""}
                    >
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium">Topic:</span>
                <select
                  value={filterTopic}
                  onChange={(e) => setFilterTopic(e.target.value)}
                  className="px-3 py-1 bg-input border border-glass-border/30 rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic === "all" ? "All Topics" : topic}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {filteredProblems.map((problem) => (
            <Card key={problem.id} className="glass-card p-6 hover:glow-effect transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex items-center pt-1">
                  <Checkbox
                    checked={selectedProblems.includes(problem.id)}
                    onCheckedChange={() => toggleProblem(problem.id)}
                    className="w-5 h-5"
                  />
                  {selectedProblems.includes(problem.id) ? (
                    <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground ml-2" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3
                        className={`text-xl font-semibold mb-2 ${
                          selectedProblems.includes(problem.id)
                            ? "line-through text-muted-foreground"
                            : ""
                        }`}
                      >
                        {problem.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`${getDifficultyColor(problem.difficulty)} text-white border-0 capitalize`}>
                          {problem.difficulty}
                        </Badge>
                        <Badge variant="outline">{problem.topic}</Badge>
                        <Badge variant="secondary">{problem.platform}</Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(problem.link, "_blank")}
                      disabled={problem.link === "#"}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>

                  <p className="text-muted-foreground mb-4">{problem.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {problem.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProblems.length === 0 && (
          <Card className="glass-card p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No problems found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
          </Card>
        )}

        <Card className="glass-card p-8 text-center mt-12">
          <h2 className="text-2xl font-bold text-gradient mb-4">Missing a Problem?</h2>
          <p className="text-muted-foreground mb-6">
            Suggest new problems for our community to practice together.
          </p>
          <Button size="lg" className="bg-gradient-primary hover:opacity-90">
            Suggest Problem
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Problems;
