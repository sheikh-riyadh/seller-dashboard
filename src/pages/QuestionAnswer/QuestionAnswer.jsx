import moment from "moment";
import { useGetSeller } from "../../hooks/useGetSeller";
import {
  useGetProductQuestionsQuery,
  useProductAnswerMutation,
} from "../../store/service/questionAnswer/questionAnswerApi";
import { useEffect, useState } from "react";
import Input from "../../components/Common/Input";
import SubmitButton from "../../components/Common/SubmitButton";
import { FaClipboard, FaMousePointer } from "react-icons/fa";
import QuestionAnswerSkeleton from "../../components/Skeleton/QuestionAnswer/QuestionAnswerSkeleton";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const QuestionAnswer = () => {
  const [currentQuestion, setCurrentQuestion] = useState();

  const { seller } = useGetSeller();
  const query = new URLSearchParams({
    sellerId: seller?._id,
    email: seller?.email,
  }).toString();

  const { data, isLoading } = useGetProductQuestionsQuery(query);

  const [answer, { isLoading: answerLoading }] = useProductAnswerMutation();
  const { handleSubmit, register, reset } = useForm();

  const handleAnswer = async (data) => {
    const newData = {
      _id: currentQuestion?._id,
      data: {
        sellerName: seller?.fullName,
        answer: data?.answer,
        sellerId: seller?._id,
        logo: seller?.logo,
        email: seller?.email,
      },
    };
    try {
      const res = await answer(newData);
      if (res?.error) {
        toast.error("Something went wrong 😓", { id: "answer_error" });
      } else {
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong 😓", { id: error });
    }
  };

  useEffect(() => {
    setCurrentQuestion(data?.[0]);
  }, [data]);

  return (
    <>
      {!isLoading ? (
        <>
          {data?.length ? (
            <div className="grid md:grid-cols-12 gap-5 m-5 h-screen">
              <div className="md:col-span-4 h-[calc(100%-100px)] custom-bar overflow-y-auto w-full flex flex-col rounded-sm bg-widget">
                {data?.map((question) => (
                  <div
                    key={question?._id}
                    onClick={() => {
                      setCurrentQuestion(question);
                    }}
                    className={`px-5 py-5 cursor-pointer ${
                      currentQuestion?._id === question?._id
                        ? "bg-[#0000002d] text-white"
                        : "text-white"
                    }`}
                  >
                    <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-full border">
                        <img
                          className="h-full w-full rounded-full"
                          src={question?.question?.userInfo?.userPhoto}
                          alt="user_photo"
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
                        {!question?.answer?.answer ? (
                          <span
                            title={question?.question?.userQuestion}
                            className="text-sm"
                          >
                            {question?.question?.userQuestion.length > 20
                              ? `${question?.question?.userQuestion.slice(
                                  0,
                                  20
                                )}...`
                              : question?.question?.userQuestion}
                          </span>
                        ) : (
                          <span
                            title={question?.answer?.answer}
                            className="text-sm"
                          >
                            {question?.answer?.answer?.length > 20
                              ? `${question?.answer?.answer?.slice(0, 20)}...`
                              : question?.answer?.answer}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-3">
                        {!Object?.keys(question?.answer).length && (
                          <div className="flex flex-col items-center justify-center">
                            <span className="w-4 h-4 bg-danger text-white text-center rounded-full text-sm">
                              1
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="md:col-span-8 h-[calc(100%-100px)] custom-bar overflow-y-auto w-full rounded-sm relative bg-widget">
                <div>
                  <div className="border-b flex gap-5 p-2">
                    <img
                      className="w-16 h-16"
                      src={currentQuestion?.question?.productInfo?.productImage}
                      alt="product_image"
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-white">
                        {currentQuestion?.question?.productInfo?.title}
                      </span>
                      <div className="flex items-center gap-3 text-accent">
                        <span className="text-sm font-semibold">
                          Q :{" "}
                          {moment(currentQuestion?.createdAt).format(
                            "MMMM D YYYY"
                          )}
                        </span>
                        {currentQuestion?.answer?.answer && (
                          <span className="text-sm font-semibold">
                            A :{" "}
                            {moment(currentQuestion?.updatedAt).format(
                              "MMMM D YYYY"
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-10 w-full absolute">
                  <div className=" flex flex-col gap-3 w-3/6">
                    <div className="w-8 h-8">
                      <img
                        className="w-full h-full rounded-full"
                        src={currentQuestion?.question?.userInfo?.userPhoto}
                        alt="user"
                      />
                    </div>
                    <div className="bg-[#171f12] p-3 rounded-md relative">
                      <span className="text-white">
                        {currentQuestion?.question?.userQuestion}
                      </span>
                      <FaMousePointer className="absolute -top-2.5 text-xl -rotate-12 text-[#171f12]" />
                    </div>
                  </div>

                  {currentQuestion?.answer?.answer ? (
                    <div className="flex flex-col justify-end items-end gap-3">
                      <div className="bg-stech p-3 rounded-md relative">
                        <span className="text-white">
                          {currentQuestion?.answer?.answer}
                        </span>
                        <FaMousePointer className="absolute -bottom-3 right-0 text-xl -rotate-180 text-stech" />
                      </div>
                      <div className="w-8 h-8">
                        <img
                          className="w-full h-full rounded-full"
                          src={seller?.photo}
                          alt="user"
                        />
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="absolute bottom-0 w-full p-3">
                  <form
                    onSubmit={handleSubmit(handleAnswer)}
                    className="grid grid-cols-12"
                  >
                    <div className="col-span-10">
                      <Input
                        {...register("answer")}
                        required
                        className="w-full bg-[#1C2822] text-white rounded-sm"
                        autoFocus
                      />
                    </div>
                    <div className="col-span-2">
                      <SubmitButton
                        isLoading={answerLoading}
                        className="w-full rounded-none py-2.5"
                      >
                        Send
                      </SubmitButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-5 flex-col items-center justify-center h-80 bg-widget m-5">
              <FaClipboard className="text-8xl text-white" />
              <span className="font-medium text-xl text-accent capitalize">
                No data found
              </span>
            </div>
          )}
        </>
      ) : (
        <QuestionAnswerSkeleton />
      )}
    </>
  );
};

export default QuestionAnswer;
