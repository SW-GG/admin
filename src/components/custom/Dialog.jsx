import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CustomConfirm from './Confirm';

const CustomDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">주문요청작성하기</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[768px]">
        <DialogHeader>
          <DialogTitle>주문요청</DialogTitle>
          <DialogDescription>
            주문 번호와 주문자 전화번호를 입력해주세요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              주문번호
            </Label>
            <Input id="name" placeholder="1" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              주문자 전화번호
            </Label>
            <Input
              id="username"
              placeholder="010-1234-5678"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <CustomConfirm title={"주문요청전송"} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export default CustomDialog;