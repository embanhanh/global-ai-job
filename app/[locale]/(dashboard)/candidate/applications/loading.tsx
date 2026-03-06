import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-64 bg-white/5" />
      </div>

      <div className="rounded-2xl border border-white/5 bg-[#0a0a14]/40 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="w-[40%] text-white/50 font-bold">
                <Skeleton className="h-4 w-20 bg-white/10" />
              </TableHead>
              <TableHead className="text-white/50 font-bold">
                <Skeleton className="h-4 w-24 bg-white/10" />
              </TableHead>
              <TableHead className="text-white/50 font-bold">
                <Skeleton className="h-4 w-24 bg-white/10" />
              </TableHead>
              <TableHead className="text-white/50 font-bold">
                <Skeleton className="h-4 w-20 bg-white/10" />
              </TableHead>
              <TableHead className="text-right text-white/50 font-bold px-6">
                <Skeleton className="h-4 w-20 ml-auto bg-white/10" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i} className="border-white/5 hover:bg-transparent">
                <TableCell>
                  <Skeleton className="h-5 w-48 bg-white/5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-32 bg-white/5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24 bg-white/5" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-24 rounded-full bg-white/5" />
                </TableCell>
                <TableCell className="px-6">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-28 bg-white/5" />
                    <Skeleton className="h-8 w-8 bg-white/5" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
