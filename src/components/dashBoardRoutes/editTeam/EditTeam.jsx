import { useState, useEffect } from "react"; // Import useState and useEffect
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";

export function EditTeam({ refetch, currentUserTeams }) {
  // State to manage the team name
  const axiosCommon = UseAxiosCommon();
  const [teamName, setTeamName] = useState("");

  // Effect to set the team name when currentUserTeams changes
  useEffect(() => {
    if (currentUserTeams) {
      setTeamName(currentUserTeams.teamName || ""); // Set to empty string if undefined
    }
  }, [currentUserTeams]);

  const handleChange = (e) => {
    setTeamName(e.target.value); // Update state on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Check if the ID is defined
    if (!currentUserTeams?._id) {
      console.error("No valid team ID found.");
      return; // Exit if ID is undefined
    }

    try {
      const response = await fetch(`/update/${currentUserTeams._id}`, { // Update the API endpoint
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teamName }), // Send the updated team name
      });

      // Log the response for debugging
      const responseBody = await response.json();
      if (!response.ok) {
        throw new Error(`Failed to update team name: ${responseBody.message}`);
      }

      console.log("Edited Team Name:", responseBody); // Log the result from the API

      // Call refetch() if needed to refresh the data
      refetch();
    } catch (error) {
      console.error("Error updating team name:", error);
      // Optionally, show a notification or alert to the user
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white rounded-lg shadow-md transition-transform transform hover:scale-105" variant="outline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Team</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}> {/* Attach the submit handler */}
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="team-name" className="text-sm font-medium text-gray-700">
                Team Name
              </Label>
              <Input
                id="team-name"
                name="team-name"
                value={teamName} // Controlled input value
                onChange={handleChange} // Handle input changes
                className="border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 transition duration-200"
                placeholder="Enter team name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              className="flex justify-center items-center w-full bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200 p-2"
            >
              Edit Team
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
