"use client";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Incomes } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Plus } from "lucide-react";

function CreateIncomes({ refreshData }) {
  const [emojiIcon, setEmojiIcon] = useState("💰");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const { user } = useUser();

  const onCreateIncomes = async () => {
    const result = await db
      .insert(Incomes)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: Incomes.id });

    if (result) {
      refreshData();
      toast.success("New Income Source Created!", {
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
        <div className="group h-full w-full">
          <div className="h-[180px] w-full bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-dashed border-purple-200 hover:border-purple-300 cursor-pointer transition-all duration-300 hover:shadow-md flex flex-col items-center justify-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-medium text-center text-gray-700 group-hover:text-gray-900 text-sm md:text-base">
              Create New Income Source
            </h2>
          </div>
        </div>
      </DialogTrigger>
      
      <DialogContent className="rounded-xl w-[90vw] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg text-gray-800">New Income Source</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Track your regular income streams
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Icon</label>
            <div className="relative">
              <Button
                variant="outline"
                className="text-xl p-4 h-12 w-12 rounded-full hover:bg-gray-50 border-gray-300"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
              >
                {emojiIcon}
              </Button>
              {openEmojiPicker && (
                <div className="absolute z-20 mt-2">
                  <EmojiPicker
                    width={280}
                    height={320}
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
            <label className="text-sm font-medium text-gray-700">Source Name</label>
            <Input
              className="h-10 focus-visible:ring-purple-400"
              placeholder="e.g. YouTube, Freelance"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Monthly Amount ($)</label>
            <Input
              className="h-10 focus-visible:ring-purple-400"
              type="number"
              placeholder="e.g. 2500"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-start mt-6">
          <DialogClose asChild>
            <Button
              disabled={!(name && amount)}
              onClick={onCreateIncomes}
              className="w-full h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white text-sm"
            >
              Create Income Source
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateIncomes;