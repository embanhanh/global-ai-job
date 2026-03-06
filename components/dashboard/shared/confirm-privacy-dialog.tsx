"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmPrivacyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmPrivacyDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
}: ConfirmPrivacyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0a0a14] border-white/10 text-white max-w-md rounded-3xl">
        <DialogHeader className="space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-2">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            Xác nhận không public hồ sơ
          </DialogTitle>
          <DialogDescription className="text-white/60 text-base leading-relaxed">
            Khi tắt chế độ này, hồ sơ của bạn sẽ không xuất hiện trong kết quả
            tìm kiếm của nhà tuyển dụng. Bạn có chắc chắn muốn tiếp tục?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-3 sm:gap-0 mt-6">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1 rounded-xl border-white/5 bg-white/5 hover:bg-white/10"
          >
            Hủy
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold"
          >
            Xác nhận
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
