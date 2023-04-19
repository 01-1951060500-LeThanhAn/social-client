import Skeleton from "react-loading-skeleton";

const SkeletonRightBar = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center py-5 px-6">
          <Skeleton duration={2} width={50} height={50} borderRadius={50} />

          <Skeleton
            duration={2}
            style={{
              marginLeft: "10px",
            }}
            width={130}
            height={30}
            borderRadius={10}
          />
        </div>

        <div className="2xl:ml-20 lg:hidden 2xl:block md:hidden">
          <Skeleton duration={2} width={80} height={30} />
        </div>
      </div>
    </>
  );
};

export default SkeletonRightBar;
