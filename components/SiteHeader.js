import UploadModal from "./UploadModal";

export default function SiteHeader() {
  return (
    <nav className="bg-black py-5 px-20 lg:flex space-y-8 lg:space-y-0 text-center lg:text-left text-gray-300 justify-between font-medium">
      {/* logo on the left side of nav */}
      <a href="#" className="font-extrabold text-xl text-white">
        Resplash{" "}
        <span className="opacity-40 font-light italic">
          (An Unsplash Clone)
        </span>
      </a>

      {/* right side of nav */}
      <div>
        <a href="#" className="py-4 px-6 text-gray-200">
          Login/Signup
        </a>

        <UploadModal />
      </div>
    </nav>
  );
}
