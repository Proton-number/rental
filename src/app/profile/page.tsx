import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { SquarePen, Lock, Trash2 } from "lucide-react";

function page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-2 sm:p-4 max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <Card className="p-4 sm:p-6 md:p-10 shadow-md ">
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col items-center sm:items-start w-full sm:flex-row gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="rounded-full"
                />
                <AvatarFallback className="flex justify-center items-center ">
                  CN
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left flex-grow space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xl font-bold">John Doe</p>
                  <span className="inline-block px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700 font-medium uppercase">
                    agent
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    johndoe@example.com
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    New York, USA
                  </p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Edit Profile"
                    className="cursor-pointer"
                  >
                    <SquarePen className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="johndoe@example.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="New York, USA" />
                    </div>
                  </div>
                  <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                    Save Changes
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Card>
        <Card className=" mt-8 p-4 sm:p-6 md:p-10 shadow-md">
          <h2 className="font-semibold text-2xl">Settings</h2>
          <div className="space-y-4">
            <div className="flex gap-2 items-center">
              <Lock className="w-4 h-4" />
              <h2 className="font-bold">Change Password</h2>
            </div>
            <Input placeholder="Current Password" className="p-5" />
            <Input placeholder="New Password" className="p-5" />
            <Input placeholder="Confirm New Password" className="p-5" />
            <Button className="w-auto bg-emerald-600 text-white hover:bg-emerald-700 px-6 py-2 cursor-pointer">
              Save Settings
            </Button>
            <div className="border-t pt-6 mt-6">
              <Button
                variant="destructive"
                className="w-auto flex items-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" /> Delete Account
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default page;
