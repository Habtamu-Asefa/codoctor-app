

const Header = () => {
  return (
    <div className="flex justify-center ml-48 rounded-full w-1/2 mb-6 mt-12 border-black">
      <div className="h-52 w-52 bg-[url('/header-2.png')] bg-cover bg-center rounded-full sticky bottom-0">
        <div className="flex justify-center space-x-4 p-4 mt-6">
          <h2 className="text-2xl font-sans text-gray-300 py-2 font-bold mt-8">
           Welcome !!!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Header;
