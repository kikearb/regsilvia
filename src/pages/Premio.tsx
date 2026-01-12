export const Premio = () => {
  return (
    <div className="premio-bg relative flex min-h-screen w-full items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      <div className="relative z-10 flex max-w-xl flex-col items-center gap-4 text-center text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Tu premio es...ta por llegar
        </h1>
        <p className="text-base sm:text-lg">
          ¡La lechuza se perdió por el camino!
        </p>
        <p className="text-base sm:text-lg">Maldito pajarraco...</p>
      </div>
    </div>
  );
};
