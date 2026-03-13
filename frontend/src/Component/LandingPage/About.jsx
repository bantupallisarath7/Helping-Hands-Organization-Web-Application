const About = () => {
return (
  <div className="flex-1 overflow-y-auto bg-gray-50">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">

      {/* Heading */}
      <div className="text-center sm:text-left">

        <h2 className="text-xl sm:text-2xl font-bold text-red-900">
          About Us
        </h2>

        <p className="text-gray-500 text-sm sm:text-base mt-1 max-w-2xl">
          Learn more about our mission, vision, and how we support students in need.
        </p>

      </div>


      {/* About Content */}
      <div className="max-w-3xl text-gray-700 text-sm sm:text-base leading-relaxed space-y-6">

        <p>
          <strong>Helping Hands Organization (HHO)</strong> is a student-led nonprofit
          initiative based at <strong>RGUKT Ongole</strong>, committed to supporting
          students facing financial hardship due to health emergencies,
          educational needs, or personal crises.
        </p>

        <p>
          Founded on the principles of empathy, transparency, and
          community-driven action, HHO empowers students to launch verified
          fundraising campaigns. Funds are raised through strategically placed
          donation boxes across campus and online contributions, with every
          rupee accounted for and publicly documented.
        </p>

        <p>
          Our mission is to create a sustainable support system where students
          help fellow students — whether it's through financial aid, mentorship,
          or organizing awareness events. We believe that small acts of
          kindness can create a ripple effect of impact.
        </p>

        <p>
          From medical emergencies to academic support, HHO has helped hundreds
          of students overcome challenges and continue their educational
          journey with dignity and hope.
        </p>

      </div>


      {/* Contact Section */}
      <div className="space-y-6">

        <h3 className="text-lg sm:text-xl sm:text-center font-bold text-red-900">
          Get in Touch
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Address */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">

            <h4 className="text-red-900 font-semibold mb-2">
              Address
            </h4>

            <p className="text-gray-600 text-sm sm:text-base">
              Santhanutalapadu, 523225 <br />
              Andhra Pradesh, India
            </p>

          </div>


          {/* Phone */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">

            <h4 className="text-red-900 font-semibold mb-2">
              Phone
            </h4>

            <p className="text-gray-600 text-sm sm:text-base">
              +91 79819 37656
            </p>

          </div>


          {/* Email */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">

            <h4 className="text-red-900 font-semibold mb-2">
              Email
            </h4>

            <p className="text-gray-600 text-sm sm:text-base">
              <a
                href="mailto:hho@rguktong.ac.in"
                className="hover:text-red-900 hover:underline"
              >
                hho@rguktong.ac.in
              </a>
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>
);
};

export default About;