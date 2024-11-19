const QuestionAnswerSkeleton = () => {
  return (
    <div className="grid grid-cols-12 gap-5 m-5 h-screen">
      {/* Sidebar Skeleton */}
      <div className="col-span-4 h-[calc(100%-100px)] overflow-y-auto w-full border flex flex-col rounded-md bg-white animate-pulse p-5 space-y-4">
        {[...Array(8).keys()].map((key) => (
          <div key={key} className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div className="flex-1">
              <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded mt-2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="col-span-8 h-[calc(100%-100px)] overflow-y-auto w-full border rounded-md relative bg-white animate-pulse p-5">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gray-300 rounded"></div>
          <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-6">
          <div className="w-full h-4 bg-gray-300 rounded"></div>
          <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
          <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default QuestionAnswerSkeleton;
