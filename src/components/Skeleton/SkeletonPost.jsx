import Skeleton from "react-loading-skeleton";

const BannerSkeleton = () => {
  return (
    <>
      <div className="2xl:w-full  w-full rounded-sm -mt-1 lg:h-[450px] md:h-[350px] h-[250px] overflow-hidden">
        <Skeleton duration={2} height={450} width={"100%"} />
      </div>
    </>
  );
};

export default BannerSkeleton;
