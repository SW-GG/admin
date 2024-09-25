import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';


export function CustomTable({tableBody}) {
  return (
    <Table>
      <TableCaption>현재 와플 주문요청 내역입니다.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">주문번호</TableHead>
          <TableHead>기본 와플</TableHead>
          <TableHead>초코 와플</TableHead>
          <TableHead>전화번호</TableHead>
          <TableHead>요청사항</TableHead>
          <TableHead className="text-right">지불 금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableBody?.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.id}</TableCell>
            <TableCell>{row.basicWaffleCount}개</TableCell>
            <TableCell>{row.chocoWaffleCount}개</TableCell>
            <TableCell>{row.phoneNumber}</TableCell>
            <TableCell>{row.memo ? row.memo : "요청사항없음"}</TableCell>
            <TableCell className="text-right">{row.totalPrice}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
