function Menu({ show, onClose, children }) {
  return (
    <div
      style={{
        transform: show ? "translateX(0%)" : "translateX(-200%)",
        zIndex: show ? 1000 : -1,
      }}
      className="absolute left-0 right-0 mx-4 md:-mx-3 top-1/4 md:w-full h-[500px] z-10 transition-all duration-500 flex justify-center items-center transform"
    >
      <div className="container mx-auto max-w-2xl h-full rounded-3xl bg-white border-2 border-black py-6 px-4">
        <button
          onClick={() => {
            onClose(false);
          }}
          className="w-12 h-12 mb-4 font-bold rounded-full bg-slate-600"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Menu;
