import Skeleton from "react-loading-skeleton";

const SkeletonWeather = () => {
  return (
    <>
      <div className="fixed lg:w-[300px] 2xl:w-[380px] mt-5 lg:mx-5 2xl:mx-8 h-[600px] rounded-lg shadow-md bg-white">
        <Skeleton duration={2} height={600} />
      </div>
    </>
  );
};

export default SkeletonWeather;
