import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ userInfo }) => {
  const hasPhoto = userInfo?.profilePhotoUrl;

  return (
    <div className="flex items-center cursor-pointer rounded-full md:rounded-md hover:bg-gray-100 transition px-2 py-1 md:px-3 md:py-2">
      
      {/* Profile Image / Initials */}
      {hasPhoto ? (
        <img
          src={userInfo.profilePhotoUrl}
          alt={userInfo.fullName}
          loading="lazy"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover"
          onError={(e) => (e.target.style.display = "none")}
        />
      ) : (
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-red-900 text-white flex items-center justify-center font-semibold text-sm md:text-base">
          {getInitials(userInfo.fullName)}
        </div>
      )}

      {/* Name (hidden on mobile) */}
      <div className="hidden md:block ml-3">
        <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
          {userInfo.fullName}
        </p>
      </div>

    </div>
  );
};

export default ProfileInfo;