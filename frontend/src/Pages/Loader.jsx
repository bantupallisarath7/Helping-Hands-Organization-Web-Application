import logo from "../assets/favicon.svg";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      
      <div className="flex flex-col items-center space-y-6">

        {/* Spinner + Logo */}
        <div className="relative flex items-center justify-center">

          {/* Outer Glow */}
          <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-red-200 blur-2xl opacity-40"></div>

          {/* Spinner */}
          <div className="absolute w-28 h-28 sm:w-32 sm:h-32 border-[3px] border-red-700 border-t-transparent rounded-full animate-spin"></div>

          {/* Logo */}
          <div className="flex items-center justify-center bg-white rounded-full shadow-lg p-3 sm:p-4">
            <img
              src={logo}
              alt="HHO Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
            />
          </div>

        </div>

        {/* Loading Text */}
        <p className="text-sm sm:text-base text-gray-600 font-medium animate-pulse">
          Loading, please wait...
        </p>

      </div>

    </div>
  );
};

export default Loader;