
import { useAuthContext } from "../../context/AuthContext";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileBodyEdit = ({ profile }) => {
	const navigate = useNavigate();
	const { authUser } = useAuthContext();

	// State to track textarea values
	const [company, setCompany] = useState("");
	const [about, setAbout] = useState("");
	const [languages, setLanguages] = useState("");

	useEffect(() => {
		if (profile) {
		  setCompany(profile.company || "");
		  setAbout(profile.about || "");
		  setLanguages(profile.languages || "");
		}
	  }, [profile]); // Runs when profile changes

	const saveProfile = async (company, about, languages) => {
		try {
			const response = await fetch("/api/users/edit-profile", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ company, about, languages, userId: authUser._id }),
			});
			const data = await response.json();
			console.log("Profile updated!", data);
		} catch (error) {
			console.error("Error updating profile:", error);
		}

		navigate("/profile/" + authUser._id); // Go back to profile page
	};

	return (
		<div className="flex flex-col justify-between overflow-hidden h-full pb-24 pr-24">
			<div>
				<h2 className="text-lg font-semibold text-gray-900 pb-2">COMPANY</h2>
				<textarea
					className="textarea textarea-bordered w-1/2 h-1/2 resize-none overflow-hidden"
					// defaultValue={authUser.company}
					value={company}
					onChange={(e) => setCompany(e.target.value)} // Update state when typing
				/>
			</div>
			<br />
			<div>
				<h2 className="text-lg font-semibold text-gray-900 pb-2">ABOUT</h2>
				<textarea
					className="textarea textarea-bordered w-full resize-none"
					// defaultValue={authUser.about}
					value={about}
					onChange={(e) => setAbout(e.target.value)} // Update state when typing
				/>
			</div>
			<br />
			<div>
				<h2 className="text-lg font-semibold text-gray-900 pb-2">PREFERRED LANGUAGES</h2>
				<textarea
					className="textarea textarea-bordered w-1/2 h-1/2 resize-none"
					// defaultValue={authUser.languages}
					value={languages}
					onChange={(e) => setLanguages(e.target.value)} // Update state when typing
				/>
			</div>
			{/* Save Button */}
			<button
				onClick={() => saveProfile(company, about, languages)} // Pass company value when clicked
				className="btn w-44 h-8 px-8 font-semibold rounded-full btn-no-outline btn-no-outline:hover"
				style={{ fontFamily: "var(--header-font)" }}
			>
				Save Changes
			</button>
		</div>
	);
};

export default ProfileBodyEdit;


// import { useAuthContext } from "../../context/AuthContext";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useUpdateProfile from "../../hooks/useUpdateProfile";

// const ProfileBodyEdit = ({ profile }) => {
// 	// const { updateProfile, loading } = useUpdateProfile();
// 	const navigate = useNavigate();

// 	// Local state to track textarea values
// 	const { authUser, setAuthUser } = useAuthContext();
// 	// const [imageUrl, setImageUrl] = useState("");
// 	const [company, setCompany] = useState(profile.company || "");
// 	// const [about, setAbout] = useState(profile.about || "");
// 	// const [preferredLanguages, setPreferredLanguages] = useState(profile.preferredLanguages || "");

// 	const saveProfile = async (company) => {

// 		try {
// 			const response = await fetch(
// 			  "/api/profile/",
// 			  {
// 				method: "PUT",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify({ company, userId: authUser._id }),
// 			  }
// 			);
// 			const data = await response.json();
// 			console.log("Profile updated!", data);
	  
// 		  } catch (error) {
// 			console.error("Error updating profile:", error);
// 		  }

// 		// const profileData = { company };
// 		// const profileData = { company, about, preferredLanguages };
// 		// await updateProfile(profileData);
// 		navigate("/"); 
// 	};

// 	return (
// 		<div className="flex flex-col justify-between overflow-hidden h-full pb-24 pr-24">
// 			<div>
// 				<h2 className="text-lg font-semibold text-gray-900 pb-2">COMPANY</h2>
// 				<textarea
// 					className="textarea textarea-bordered w-1/2 h-1/2 resize-none overflow-hidden"
// 					value={company}
// 					onClick={saveProfile(target.value)}
// 				/>
// 			</div>
// 			<br />
// 			<div>
// 				<h2 className="text-lg font-semibold text-gray-900 pb-2">ABOUT</h2>
// 				<textarea
// 					className="textarea textarea-bordered w-full resize-none overflow-hidden"
// 					// value={about}
// 					// onChange={(e) => setAbout(e.target.value)}
// 				/>
// 			</div>
// 			<br />
// 			<div>
// 				<h2 className="text-lg font-semibold text-gray-900 pb-2">PREFERRED LANGUAGES</h2>
// 				<textarea
// 					className="textarea textarea-bordered w-1/2 h-1/2 resize-none overflow-hidden"
// 					// value={preferredLanguages}
// 					// onChange={(e) => setPreferredLanguages(e.target.value)}
// 				/>
// 			</div>

// 			<button
// 				onClick={saveProfile}
// 				disabled={loading}
// 				className="btn w-44 h-8 px-8 font-semibold rounded-full btn-no-outline btn-no-outline:hover"
// 				style={{ fontFamily: "var(--header-font)" }}
// 			>
// 				{loading ? "Saving..." : "Save Changes"}
// 			</button>
// 		</div>
// 	);
// };

// export default ProfileBodyEdit;



// import { useState, useEffect } from "react";
// import useUpdateProfile, { updateProfile } from "../../hooks/useUpdateProfile";


// const ProfileBodyEdit = ({ profile }) => {

// 	const saveProfile = async () => {
// 		const profileData = {
// 			company: document.querySelector('textarea').value,
// 			about: document.querySelectorAll('textarea')[1].value,
// 			preferredLanguages: document.querySelectorAll('textarea')[2].value,
// 		};
// 		useUpdateProfile (profileData);
// 	};

// 	return (
// 		<div className="flex flex-col justify-between overflow-hidden h-full pb-24 pr-24">
// 			<div>
// 				<h2 className="text-lg font-semibold text-gray-900 pb-2">COMPANY</h2>
// 				<textarea className="textarea textarea-bordered w-1/2 h-1/2 resize-none overflow-hidden" defaultValue={profile.company}>
// 				</textarea>
// 			</div>
// 			<br/>
// 			<div>
// 				<h2 className="text-lg font-semibold text-gray-900 pb-2">ABOUT</h2>
// 				<textarea className="textarea textarea-bordered w-full resize-none overflow-hidden"></textarea>
// 			</div>
// 			<br/>
// 			<div>
// 				<h2 className="text-lg font-semibold text-gray-900 pb-2">PREFERRED LANGUAGES</h2>
// 				<textarea className="textarea textarea-bordered w-1/2 h-1/2 resize-none overflow-hidden"></textarea>
// 			</div>

// 			<button onClick={saveProfile} className="btn w-44 h-8 px-8 font-semibold rounded-full btn-no-outline btn-no-outline:hover" style={{ fontFamily: "var(--header-font)" }}>
// 			Save Changes
// 			</button>
// 		</div>

// 	);
// };
// export default ProfileBodyEdit;
