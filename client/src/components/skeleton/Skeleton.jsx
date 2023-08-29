import './Skeleton.scss'

export default function Skeleton({ type }) {
    const homeItems = 3;

    const SkeletonHome = () => <div className="skeleton__homeCard"></div>;

    if (type === "home") {
        const skeletons = Array.from({ length: homeItems }, (_, index) => (
            <SkeletonHome key={index} />
        ));

        return skeletons;
    }

    return null;
}