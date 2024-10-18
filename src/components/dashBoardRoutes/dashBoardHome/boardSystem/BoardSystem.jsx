import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyTeam from "../../myTeam/MyTeam";
import PageHeader from "@/components/pageHeader/PageHeader";

const BoardSystem = () => {
    const axiosCommon = UseAxiosCommon();
    const user = useSelector((state) => state.auth.user);
    const [error, setError] = useState(null);

    const { data: board = [], isLoading, isError } = useQuery({
        queryKey: ["boards"],
        queryFn: async () => {
            const res = await axiosCommon.get(`/createBoard?email=${user.email}`);
            return res.data;
        },
        onError: (err) => setError(err.message),
    });

    // Loading state while fetching user data
    if (isLoading) {
        return <div>Loading user data...</div>;
    }

    // Error state handling
    if (isError) {
        return <div>Error: {error}</div>;
    }

    const filteredBoards = board.filter((b) => b.email === user.email);

    return (
        <div className="mx-auto">
            {/* Header Section */}
            <div className="flex lg:flex-row flex-col lg:justify-start justify-center gap-4">
                <PageHeader
                    title="Your Work Space"
                    breadcrumb="FlowMate Work Space" />
                {/* Task Section */}
                <div className="flex lg:flex-row flex-col lg:justify-start justify-center gap-4">

                    {/* sajib add this components */}
                    <MyTeam />

                </div>
            </div>
        </div>
    );

};

export default BoardSystem;
