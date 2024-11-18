import moment from "moment";
import { useGetUser } from "../../hooks/useGetUser";
import { useGetProductQuestionsQuery } from "../../store/service/questionAnswer/questionAnswerApi";
import { useState } from "react";
import Input from "../../components/Common/Input";
import SubmitButton from "../../components/Common/SubmitButton";

const QuestionAnswer = () => {
  const { user } = useGetUser();
  const { data } = useGetProductQuestionsQuery(user?._id);
  const [currentQuestion, setCurrentQuestion] = useState(data?.[0]);

  return (
    <div className="grid grid-cols-12 gap-5 m-5 h-screen">
      <div className="col-span-4 h-[calc(100%-100px)] overflow-y-auto w-full border flex flex-col rounded-md bg-white">
        {data?.map((question) => (
          <div
            key={question?._id}
            onClick={() => setCurrentQuestion(question)}
            className={`px-5 py-5 cursor-pointer ${
              currentQuestion?._id === question?._id ? "bg-blue-50" : null
            }`}
          >
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-full border">
                <img
                  className="h-full w-full rounded-full"
                  src={question?.question?.userInfo?.userPhoto}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-1">
                <span
                  title={question?.question?.userInfo?.userName}
                  className="text-sm"
                >
                  {question?.question?.userInfo?.userName?.length > 20
                    ? `${question?.question?.userInfo?.userName?.slice(
                        0,
                        20
                      )}...`
                    : question?.question?.userInfo?.userName}
                </span>
                <span
                  title={question?.question?.userQuestion}
                  className="text-sm"
                >
                  {question?.question?.userQuestion.length > 20
                    ? `${question?.question?.userQuestion.slice(0, 20)}...`
                    : question?.question?.userQuestion}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs">
                  {moment(question?.createdAt).format("LT")}
                </span>
                {!Object.keys(question?.answer).length && (
                  <div className="flex flex-col items-center justify-center">
                    <span className="w-4 h-4 bg-stech text-white text-center rounded-full text-sm">
                      1
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-8 h-[calc(100%-100px)] overflow-y-auto w-full border rounded-md relative">
        <div>
          <div className="border-b flex gap-5 p-2">
            <img
              className="w-16 h-16"
              src={currentQuestion?.question?.productInfo?.productImage}
              alt=""
            />
            <span>{currentQuestion?.question?.productInfo?.title}</span>
          </div>
        </div>
        <div className="absolute bottom-0 w-full p-3">
          <div className="grid grid-cols-12">
          <div className="col-span-10">
          <Input className="border w-full rounded-none" />
          </div>
          <div className="col-span-2">
          <SubmitButton className="w-full rounded-none py-2.5">Send</SubmitButton>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionAnswer;
