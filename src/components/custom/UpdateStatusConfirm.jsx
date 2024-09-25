import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const UpdateStatusConfirm = ({
  open,
  setOpen,
  handleCloseDialog,
  handleSubmit,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>주문상태 변경</AlertDialogTitle>
          <AlertDialogDescription>
            주문상태를 변경하시겠습니까? <br />
            변경된 주문상태는 다시 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseDialog}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateStatusConfirm;
