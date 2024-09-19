import React, { useState } from "react";
import { Loader2, PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "../../../service/GlobalApi";
import { useUser } from "@clerk/nextjs";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    try {
      setLoading(true);
      const uuid = uuidv4();
      const data = {
        data: {
          title: resumeTitle,
          resumeId: uuid,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
        },
      };

      // Make sure to pass the data as an argument
      const response = await GlobalApi.CreateNewResume(data);
      console.log("Resume created successfully:", response.data);
      setLoading(false);
      setOpenDialog(false); // Close the dialog on success
    } catch (error) {
      if (error.response) {
        setLoading(false);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error creating resume:", error.response.data);
        console.error("Status code:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error creating resume:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error creating resume:", error.message);
      }
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <div className="p-14 py-24 border-black border-2 items-center flex justify-center bg-gray-300 rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed">
            <PlusSquare />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Add a title for your new resume
              <Input
                className="my-2"
                placeholder="Ex FullStack Resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="right-0 flex justify-end gap-5">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
