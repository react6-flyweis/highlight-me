import * as React from "react";
import type { Row } from "@tanstack/react-table";
import { EllipsisVerticalIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "../ui/menubar";
import { BlockUserDialog } from "./BlockUserDialog";
import SuspendUserDialog from "./SuspendUserDialog";
import SendWarningDialog from "./SendWarningDialog";
import type { UserItem } from "./allUsersColumns";
import { useNavigate } from "react-router";

export function ActionMenu({ row }: { row: Row<UserItem> }) {
  const [open, setOpen] = React.useState(false);
  const [targetUser, setTargetUser] = React.useState<string | undefined>(
    undefined
  );
  const [suspendOpen, setSuspendOpen] = React.useState(false);
  const [suspendTarget, setSuspendTarget] = React.useState<string | undefined>(
    undefined
  );
  const [warnOpen, setWarnOpen] = React.useState(false);
  const [warnTarget, setWarnTarget] = React.useState<string | undefined>(
    undefined
  );

  const openBlockDialog = () => {
    setTargetUser(row.original.name ?? row.original.username);
    setOpen(true);
  };

  const navigate = useNavigate();

  const openSuspendDialog = () => {
    setSuspendTarget(row.original.name ?? row.original.username);
    setSuspendOpen(true);
  };

  const handleConfirm = () => {
    // TODO: wire actual block API here (e.g. call backend and update UI)
    setOpen(false);
  };

  return (
    <>
      <Menubar className="border-0 bg-transparent shadow-none">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Button size="icon" variant="ghost">
              <EllipsisVerticalIcon className="size-5" />
            </Button>
          </MenubarTrigger>
          <MenubarContent className="text-center" align="end">
            <MenubarItem
              onSelect={() => {
                const id = row.original.id;
                navigate(`/users/profile/${id}`);
              }}
            >
              <span>View</span>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onSelect={openBlockDialog}>
              <span>Block</span>
            </MenubarItem>
            <MenubarSeparator />

            <MenubarItem onSelect={openSuspendDialog}>
              <span>Suspend</span>
            </MenubarItem>
            <MenubarSeparator />

            <MenubarItem
              onSelect={() => {
                setWarnTarget(row.original.name ?? row.original.username);
                setWarnOpen(true);
              }}
            >
              <span>Warn</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <BlockUserDialog
        open={open}
        onOpenChange={setOpen}
        userName={targetUser}
        onConfirm={handleConfirm}
      />

      <SuspendUserDialog
        open={suspendOpen}
        onOpenChange={setSuspendOpen}
        userName={suspendTarget}
        onConfirm={(values) => {
          // TODO: call suspend API and update UI
          // values: { duration: string; reason?: string }
          console.log("suspend", suspendTarget, values);
          setSuspendOpen(false);
        }}
      />

      <SendWarningDialog
        open={warnOpen}
        onOpenChange={setWarnOpen}
        userName={warnTarget}
        onConfirm={(values) => {
          // TODO: call warn API and update UI
          // values: { subject: string; message: string; sendAs: 'in_app' | 'email' }
          console.log("warn", warnTarget, values);
          setWarnOpen(false);
        }}
      />
    </>
  );
}
