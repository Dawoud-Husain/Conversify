const ProfileBody = () => {
	return (
		<div className="flex flex-col justify-between flex-grow h-full pb-24">
			<div>
				<h2 className="text-lg font-semibold text-gray-900">COMPANY</h2>
				<p className="text-gray-600">Microsoft Inc., Silicon Valley</p>
			</div>

			<div>
				<h2 className="text-lg font-semibold text-gray-900">ABOUT</h2>
				<p className="text-gray-600">
					Hi, I'm Johnny, a Senior Product Manager at Microsoft, where I get to turn big ideas
					into even bigger innovations...
				</p>
			</div>

			<div>
				<h2 className="text-lg font-semibold text-gray-900">PREFERRED LANGUAGES</h2>
				<p className="text-gray-600">English, Français, Español</p>
			</div>
		</div>
	);
};
export default ProfileBody;
