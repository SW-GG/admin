import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export function PaginationDemo({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  console.log(totalItems,itemsPerPage, currentPage,'paging');
  
  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return; // 페이지 범위를 벗어나면 무시
    onPageChange(page); // 상위 컴포넌트로 페이지 변경을 알림
  };

  // 이전 페이지로 이동
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // 페이지 목록을 생성
  const renderPageLinks = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  // 데이터가 없거나 총 페이지가 1페이지인 경우 페이지네이션을 숨김
  if (totalItems === 0 || totalPages <= 1) {
    return null;
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handlePreviousPage} />
        </PaginationItem>
        {renderPageLinks()}

        <PaginationItem>
          <PaginationNext href="#" onClick={handleNextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
