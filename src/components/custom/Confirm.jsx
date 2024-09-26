import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

const CustomConfirm = ({ title, handleSubmit, isDisabled }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isDisabled}>{title}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>주문요청을 전송하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            수량과 주문자 전화번호를 제대로 입력했는지 확인해주세요.
            <br /> 무조건 당일 날짜로 주문요청이 접수됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} disabled={isDisabled}>
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomConfirm;
