const ProfileBody = ({ profile }) => {
  return (
    <div className="flex flex-col justify-between flex-grow h-full pb-24">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">COMPANY</h2>
        <p className="text-gray-600">{profile.company}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900">ABOUT</h2>
        <p className="text-gray-600">{profile.about}</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          PREFERRED LANGUAGES
        </h2>
        <p className="text-gray-600">{profile.language}</p>
      </div>
    </div>
  );
};
export default ProfileBody;
