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

	const handleGoogleLogin = () => {
		console.log("Google login initiated for:", loginType);
	};

	const handleEmailLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email || !password) {
			toast.error("Please fill in all fields");
			return;
		}

		const success = await login(email, password);

		if (success) {
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
                {/* <Button 
                  onClick={handleGoogleLogin}
                  className="w-full bg-gradient-primary hover:opacity-90"
                  size="lg"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button> */}
				<GoogleLogin
					onSuccess={async (credentialResponse) => {
						if (!credentialResponse?.credential) return;
						const token = credentialResponse.credential; 
						const base64Url = token.split('.')[1];
						const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
						const userData = JSON.parse(window.atob(base64));
						console.log("Google login success");
						console.log("Email:", userData.email);
						console.log("ID Token:", token);
					}}
					onError={() => {
						console.log("Google login failed");
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