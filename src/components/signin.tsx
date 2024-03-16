import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

function SignIn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <h1 className="hover:underline cursor-pointer decoration-4 underline-offset-8 font-bold hover:decoration-purple-600">
          Sign In
        </h1>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Search your horizon!</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 space-y-3">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                id="email"
                className="w-full px-3 py-2 border autofill:bg-white"
                placeholder="Email"
                type="email"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                id="password"
                className="w-full px-3 py-2 border"
                placeholder="Password"
                type="password"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SignIn;
