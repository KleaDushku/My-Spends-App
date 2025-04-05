"use client";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function EditBudget({ budgetInfo, refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const { user } = useUser();

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo?.icon);
      setAmount(budgetInfo.amount);
      setName(budgetInfo.name);
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    const result = await db
      .update(Budgets)
      .set({
        name: name,
        amount: amount,
        icon: emojiIcon,
      })
      .where(eq(Budgets.id, budgetInfo.id))
      .returning();

    if (result) {
      refreshData();
      toast.success("Budget Updated Successfully!", {
        style: {
          background: 'rgba(74, 222, 128, 0.9)',
          color: '#fff',
          border: 'none'
        }
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800">
          <PenBox className="w-4 h-4" />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-gray-800">Update Budget</DialogTitle>
          <DialogDescription className="text-gray-600">
            Make changes to your budget details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Icon</label>
            <div className="relative">
              <Button
                variant="outline"
                className="text-2xl p-6 rounded-full hover:bg-gray-100 border-gray-300"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
              >
                {emojiIcon || "😊"}
              </Button>
              {openEmojiPicker && (
                <div className="absolute z-20 mt-2">
                  <EmojiPicker
                    width={300}
                    height={350}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Budget Name</label>
            <Input
              className="focus-visible:ring-gray-400"
              placeholder="e.g. Home Decor"
              defaultValue={budgetInfo?.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Budget Amount</label>
            <Input
              className="focus-visible:ring-gray-400"
              type="number"
              defaultValue={budgetInfo?.amount}
              placeholder="e.g. 5000"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-start mt-6">
          <DialogClose asChild>
            <Button
              disabled={!(name && amount)}
              onClick={onUpdateBudget}
              className="w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white shadow-md"
            >
              Update Budget
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditBudget;