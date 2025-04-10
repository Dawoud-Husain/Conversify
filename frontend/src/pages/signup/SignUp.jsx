import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState, useEffect } from "react";
import useSignup from "../../hooks/useSignup";
import useGeoLocation from "react-ipgeolocation";
import useGetLanguages from "../../hooks/useGetLanguages";

const SignUp = () => {
  const { languages, loading: languagesLoading } = useGetLanguages();
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    confirmPassword: "",
    gender: "",
    timezone: "UTC",
    country: "unknown",
    language: "en", // default to English
  });

  const { loading, signup } = useSignup();
  const location = useGeoLocation();

  useEffect(() => {
    const detectedTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setInputs((prev) => ({
      ...prev,
      country: location.country,
      timezone: detectedTimeZone,
    }));
  }, [location]);

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <h1
        className="text-5xl font-semibold text-center mb-4"
        style={{ color: "var(--dark-yellow)", fontFamily: "var(--logo-font)" }}
      >
        Conversify
      </h1>
      <br />
      <div
        className="w-full p-6 rounded-lg shadow-2xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0"
        style={{ backgroundColor: "#EEEEEE" }}
      >
        <h1
          className="text-3xl font-semibold text-center"
          style={{
            color: "var(--dark-yellow)",
            fontFamily: "var(--header-font)",
          }}
        >
          Sign Up
        </h1>
        <br />

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span
                className="text-base label-text"
                style={{ color: "var(--darker-yellow)" }}
              >
                First Name
              </span>
            </label>
            <input
              type="text"
              placeholder="John"
              className="w-full input input-bordered h-10 custom-input"
              value={inputs.firstName}
              onChange={(e) =>
                setInputs({ ...inputs, firstName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span
                className="text-base label-text"
                style={{ color: "var(--darker-yellow)" }}
              >
                Last Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Doe"
              className="w-full input input-bordered h-10 custom-input"
              value={inputs.lastName}
              onChange={(e) =>
                setInputs({ ...inputs, lastName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span
                className="text-base label-text"
                style={{ color: "var(--darker-yellow)" }}
              >
                Email
              </span>
            </label>
            <input
              type="text"
              placeholder="johndoe@gmail.com"
              className="w-full input input-bordered h-10 custom-input"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>

          <div>
            <label className="label p-2">
              <span
                className="text-base label-text"
                style={{ color: "var(--darker-yellow)" }}
              >
                Phone Number
              </span>
            </label>
            <input
              type="text"
              placeholder="123-456-789"
              className="w-full input input-bordered h-10 custom-input"
              value={inputs.phoneNumber}
              onChange={(e) =>
                setInputs({ ...inputs, phoneNumber: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2">
              <span
                className="text-base label-text"
                style={{ color: "var(--darker-yellow)" }}
              >
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full input input-bordered h-10 custom-input"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span
                className="text-base label-text"
                style={{ color: "var(--darker-yellow)" }}
              >
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10 custom-input"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span
                className="text-base label-text"
                style={{ color: "var(--darker-yellow)" }}
              >
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10 custom-input"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          {/* Language Dropdown */}
          <div>
            <label className="label p-2">
              <span
                className="text-base label-text"
                style={{ color: "var(--darker-yellow)" }}
              >
                Preferred Language
              </span>
            </label>
            {languagesLoading ? (
              <p className="text-sm text-gray-500">Loading languages...</p>
            ) : (
              <select
                className="w-full input input-bordered h-10 custom-input"
                value={inputs.language}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, language: e.target.value }))
                }
              >
                <option value="">Select a language</option>
                {languages.map((lang) => (
                  <option key={lang.language} value={lang.language}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <Link
            to={"/login"}
            className="text-sm hover:underline mt-2 inline-block"
            style={{ color: "var(--light-grey)" }}
          >
            Already have an account?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 btn-hover-darken"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
