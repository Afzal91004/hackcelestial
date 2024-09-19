import React, { useState } from "react";
import { PlusSquare } from "lucide-react";
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

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div>
      <div className="p-14 py-24 border-black border-2 items-center flex justify-center bg-gray-300 rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed">
        <PlusSquare onClick={() => setOpenDialog(true)} />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input className="my-2" placeholder="Ex FullStack Resume" />
            </DialogDescription>
            <div className="right-0 flex justify-end gap-5">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button>Add</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
