import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Shield, Users, UserCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import * as jwt_decode from "jwt-decode";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [loginType, setLoginType] = useState("student");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, isLoading } = useAuth();
	const navigate = useNavigate();

	const loginTypes = [
		{
			id: "admin",
			name: "Admin",
			icon: Shield,
			description: "Full access to create resources and manage content",
			color: "bg-red-500"
		},
		{
			id: "student",
			name: "College Student",
			icon: Users,
			description: "Login with college email, potential for core member role",
			color: "bg-blue-500"
		},
		{
			id: "guest",
			name: "Guest",
			icon: UserCheck,
			description: "Limited access, cannot update leaderboard",
			color: "bg-green-500"
		}
	];

	const ac_login = async (email,password) => {
		// send a post request
		return "true";
	}

	const Google_login = async (userData) => {
		// send a post request along with the token to verify
		return "true";
	}

	const handleEmailLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !password) {
			toast.error("Please fill in all fields");
			return;
		}

		const token = await ac_login(email, password);

		if (token) {
			localStorage.setItem("authToken", token);
    		const userData = jwt_decode(token);
			toast.success("Welcome to Dotslash <./>");
			navigate("/");
		} else {
			toast.error("Invalid credentials. Try: student@iiitn.ac.in / 12345678");
		}
	};

	const handleGoogleLogin = async (userData) => {

		const token = await Google_login(userData);

		if (token) {
			localStorage.setItem("authToken", token);
    		const userData = jwt_decode(token);
			toast.success("Welcome to Dotslash <./>");
			navigate("/");
		} else {
			toast.error("Invalid credentials. Try: student@iiitn.ac.in / 12345678");
		}
	};

	return (
		<div className="min-h-screen pt-20 px-4 flex items-center justify-center">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<div className="flex justify-center mb-4">
					</div>
					<h1 className="text-3xl font-bold text-gradient mb-2">Welcome to <span className="dotslash-gradient">Dotslash &lt;./&gt;</span></h1>
					<p className="text-muted-foreground">Choose your login type to continue</p>
				</div>

				<Card className="glass-card p-6 mb-6">
					<h2 className="text-lg font-semibold mb-4 text-center">Select Login Type</h2>
					<div className="space-y-3">
						{loginTypes.map((type) => (
							<div
								key={type.id}
								onClick={() => setLoginType(type.id)}
								className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${loginType === type.id
									? "border-primary bg-primary/10 glow-effect"
									: "border-glass-border/30 hover:border-glass-border/50 hover:bg-muted/20"
									}`}
							>
								<div className="flex items-center space-x-3">
									<div className={`p-2 rounded-full ${type.color} bg-opacity-20`}>
										<type.icon className={`w-5 h-5 text-white`} />
									</div>
									<div className="flex-1">
										<div className="flex items-center space-x-2">
											<span className="font-medium">{type.name}</span>
											{loginType === type.id && (
												<Badge className="bg-primary text-primary-foreground border-0">
													Selected
												</Badge>
											)}
										</div>
										<p className="text-sm text-muted-foreground">{type.description}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</Card>

				<Card className="glass-card p-6">
					<Tabs defaultValue="google" className="w-full">
						<TabsList className="grid w-full grid-cols-2 mb-6">
							<TabsTrigger value="google">Google Login</TabsTrigger>
							<TabsTrigger value="email">Email Login</TabsTrigger>
						</TabsList>

            <TabsContent value="google" className="space-y-4">
              <div className="text-center space-y-4">
                <div className="text-4xl mb-4">🔐</div>
                <h3 className="font-semibold">Sign in with Google</h3>
                <p className="text-sm text-muted-foreground">
                  {loginType === "student" 
                    ? "Use your college email (@iiitn.ac.in) to login as a student"
                    : `Quick and secure login for ${loginTypes.find(t => t.id === loginType)?.name.toLowerCase()}`
                  }
                </p>
				
				<GoogleLogin
					onSuccess={async (credentialResponse) => {
						if (!credentialResponse?.credential) return;
						const token = credentialResponse.credential; 
						const base64Url = token.split('.')[1];
						const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
						const userData = JSON.parse(window.atob(base64));
						console.log("Email:", userData);
						if(loginType=="student"){
							if(userData.email.endsWith("@iiitn.ac.in")){}
							else{toast.error("Please use iiitn college mail id.");return;}
						}
						handleGoogleLogin(userData)
					}}
					onError={() => {
						// console.log("Google login failed");
						toast.error("Login Failed, Contact Admin.");
					}}
					/>

              </div>
            </TabsContent>

						<TabsContent value="email" className="space-y-4">
							<form onSubmit={handleEmailLogin} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder={loginType === "student" ? "your.name@iiitn.ac.in" : "Enter your email"}
										className="bg-input border-glass-border/30"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="password">Password</Label>
									<div className="relative">
										<Input
											id="password"
											type={showPassword ? "text" : "password"}
											placeholder="Enter your password"
											className="bg-input border-glass-border/30 pr-10"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											required
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<EyeOff className="h-4 w-4 text-muted-foreground" />
											) : (
												<Eye className="h-4 w-4 text-muted-foreground" />
											)}
										</Button>
									</div>
								</div>

								<Button type="submit" className="w-full bg-gradient-primary hover:opacity-90" size="lg" disabled={isLoading}>
									{isLoading ? "Signing In..." : "Sign In"}
								</Button>
							</form>

							<div className="text-center space-y-2">
								<Button variant="link" className="text-sm text-muted-foreground">
									Forgot your password?
								</Button>
							</div>
						</TabsContent>
					</Tabs>
				</Card>

				<Card className="glass-card p-4 mt-6">
					<div className="text-center text-sm text-muted-foreground">
						<p className="mb-2">🔒 Your data is secure and protected</p>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Login;