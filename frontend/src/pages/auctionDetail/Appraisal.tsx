const Appraisal = () => {
  return (
    <div className="p-4">
      <div className="">
        <h1 className="text-2xl">감정평가서</h1>
      </div>
      <div className="h-screen">
        <iframe
          src="../../../data/pdf/감정평가서.pdf"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Appraisal;
