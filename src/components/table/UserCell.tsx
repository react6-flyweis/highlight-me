import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserCell({
  name,
  avatar,
  username,
}: {
  name: string;
  avatar: string;
  username: string;
}) {
  return (
    <div className="relative flex items-center gap-2">
      <Avatar className="size-12">
        <AvatarImage alt={name} src={avatar} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span>{name}</span>
        <span className="text-muted-foreground">@{username}</span>
      </div>
    </div>
  );
}
