import clsx from "clsx";
import Icons from "./Icons";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import Button from "./Button";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};

const User = ({ className }: Props) => {
  const router = useRouter();
  const { isLoaded, user } = useUser();
  const { signOut } = useAuth();

  if (!isLoaded) {
    return (
      <div className={clsx("flex items-center", className)} aria-hidden>
        <div className="mr-2 h-6 w-6 animate-pulse rounded-full bg-secondary-600" />
        <div className="hidden h-4 w-20 animate-pulse rounded bg-secondary-600 md:block" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Menu as="div" className={clsx("relative", className)}>
      <Menu.Button className="flex items-center">
        {user && user.imageUrl && (
          <Image
            width={24}
            height={24}
            src={user.imageUrl ?? "/logo.svg"}
            alt=""
            className="mr-2 rounded-full"
          />
        )}
        {user && !user.imageUrl && (
          <div className="mr-2 h-6 w-6 rounded-full bg-secondary-600 uppercase text-white">
            {user.fullName?.charAt(0)}
          </div>
        )}
        {!user && (
          <div className="mr-2 h-6 w-6 rounded-full bg-secondary-600"></div>
        )}
        <p className="mr-1 hidden text-label md:block">{user?.firstName}</p>
        <Icons.ChevronDown className="h-2 w-2" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-3 origin-top-right rounded bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Button
            className="flex items-center gap-4 rounded-sm px-5 py-3 text-label hover:bg-secondary-100 active:bg-secondary-200"
            onClick={() => {
              signOut().then(() => {
                router.push("/");
              });
            }}
          >
            <Icons.DoorOut className="h-4 w-4" />
            Logout
          </Menu.Button>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default User;
