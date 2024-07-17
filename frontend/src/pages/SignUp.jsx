import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [formData, setFormData] = useState({
		name: "",
		reference: "",
		password: "",
	});

	const navigate = useNavigate();

	const theme = localStorage.getItem("theme");

	useEffect(() => {
		if (theme !== "dark") {
			document.body.style.background =
				theme === "dark" ? "#17153B" : "#f5f5f5";
		} else {
			document.body.style.background = "#17153B";
		}
		// document.body.style.backgroundSize = 'cover';
		return () => {
			document.body.style.background = null;
		};
	}, [theme]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		console.log(formData);
		try {
			const response = await fetch(
				"http://127.0.0.1:3000/api/auth/signup",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(formData),
				}
			);

			const result = await response.json();
			if (response.status === 201) {
				setLoading(false);
				navigate("/signin");
			}
			if (!response.ok) {
				throw new Error(result.message || "Something went wrong!");
			}

			// Handle success (e.g., redirect to login page)
			alert("Sign up successful!");
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
				<div className="flex dark:bg-custom-bg-200 dark:text-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-5xl w-full">
					<div
						className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
						style={{
							backgroundImage: `url(https://pbs.twimg.com/media/F2EQC-YXQAAOVkf?format=jpg&name=4096x4096)`,
						}}
					></div>
					<div className="w-full p-8 lg:w-1/2">
						<p className="text-xl text-gray-600 dark:text-white text-center">
							Welcome Back!
						</p>
						{error && (
							<div className="text-red-500 text-center mt-2">
								{error}
							</div>
						)}
						<form onSubmit={handleSubmit}>
							<div className="mt-4">
								<label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
									Name
								</label>
								<input
									className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
									type="text"
									placeholder="Enter your name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="mt-4">
								<label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
									Reference Number
								</label>
								<input
									className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
									type="text"
									placeholder="Enter a reference number"
									name="reference"
									value={formData.reference}
									onChange={handleChange}
									required
								/>
							</div>
							<div className="mt-4 flex flex-col justify-between">
								<div className="flex justify-between">
									<label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
										Password
									</label>
								</div>
								<input
									className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
									type="password"
									placeholder="Enter your password"
									name="password"
									value={formData.password}
									onChange={handleChange}
									required
								/>
								<a
									href="#"
									className="text-xs text-gray-500 dark:text-white hover:text-gray-900 text-end w-full mt-2"
								>
									Forget Password?
								</a>
							</div>
							<div className="mt-8">
								<button
									className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
									type="submit"
									disabled={loading}
								>
									{loading ? "Signing Up..." : "Sign Up"}
								</button>
							</div>
						</form>
						<div className="mt-4 flex items-center w-full text-center">
							<Link
								to="/signin"
								className="text-xs text-gray-500 dark:text-white capitalize text-center w-full"
							>
								Already have an account?
								<span className="text-blue-700 text-base">
									{" "}
									Sign In
								</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
