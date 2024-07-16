import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import toast from "react-hot-toast";

const Login = () => {
  const cardRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const formRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(
      cardRefs.map((ref) => ref.current),
      {
        duration: 1,
        x: 0,
        y: 0,
        scale: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    )
      .to(
        cardRefs[0].current,
        { x: "-48%", y: "-48%", duration: 1, ease: "power3.inOut" },
        "-=0.8"
      )
      .to(
        cardRefs[1].current,
        { x: "48%", y: "-48%", duration: 1, ease: "power3.inOut" },
        "-=0.8"
      )
      .to(
        cardRefs[2].current,
        { x: "-48%", y: "48%", duration: 1, ease: "power3.inOut" },
        "-=0.8"
      )
      .to(
        cardRefs[3].current,
        { x: "48%", y: "48%", duration: 1, ease: "power3.inOut" },
        "-=0.8"
      )
      .to(
        cardRefs.map((ref) => ref.current),
        {
          width: "100%",
          height: "100%",
          borderRadius: 0,
          duration: 1,
          ease: "power3.inOut",
        }
      )
      .to(formRef.current, { opacity: 1, duration: 0.5 });
  }, []);

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-white overflow-hidden">
      <div className="absolute w-full h-full flex justify-center items-center">
        {cardRefs.map((ref, index) => (
          <div
            key={index}
            ref={ref}
            className="bg-gray-900 rounded-lg w-1/4 h-1/4 absolute"
            style={{
              transform: `translate(${index % 2 === 0 ? "-200%" : "200%"}, ${
                index < 2 ? "-200%" : "200%"
              })`,
            }}
          ></div>
        ))}
      </div>
      <div
        ref={formRef}
        className="bg-white shadow-2xl rounded-md px-8 pt-6 pb-8 mb-4 w-full max-w-md z-10"
        style={{ opacity: 0 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">
            LogIn
          </span>
        </h2>
        <form>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <i className="fas fa-user mr-2"></i>Username
            </label>
            <div>
              <input
                id="username"
                type="text"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              <i className="fas fa-lock mr-2"></i>Password
            </label>
            <div>
              <input
                id="password"
                type="password"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => toast.success("Successfully login!")}
              type="button"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              LogIn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
