import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MyTeam from "../../myTeam/MyTeam";

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
            <div className="lg:flex lg:flex-row flex-col lg:justify-between w-full py-10">
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-700 bg-gray-300 px-3 py-2 w-72 rounded-md">
                        Your Work Space
                    </h2>
                </div>
                <div className="flex-1 flex lg:justify-end justify-start mt-4 lg:mt-0">
                    <h2 className="text-xl font-bold text-gray-700 bg-gray-300 px-3 py-2 w-72 rounded-md">
                        FlowMate Work Space
                    </h2>
                </div>
            </div>
    
            {/* Task Section */}
            <div className="flex lg:flex-row flex-col lg:justify-start justify-center gap-4">
                {/* {filteredBoards.length === 0 ? (
                    <div className="text-gray-500">No tasks added recently</div>
                ) : (
                    filteredBoards.map((todo) => (
                        <Link
                            key={todo._id}
                            to={`/dashboard/createBoard/${todo._id}`}
                            className="p-2 mb-2 bg-white rounded-md flex justify-between items-center h-40 w-60 shadow-lg hover:shadow-sky-100"
                        >
                            <h1 className="text-2xl font-bold text-start p-5">{todo.boardName}</h1>
                        </Link>
                    ))
                )} */}
                {/* sajib add this components */}
                <MyTeam/>
            </div>
        </div>
    );
    
};

export default BoardSystem;
